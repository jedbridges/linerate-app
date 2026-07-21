/**
 * <cross-hatch>
 * A WebGL fragment shader that renders any photograph as geometric cross-hatching
 * built from horizontal and vertical lines. Tone is sampled once per grid cell and
 * built up in passes, so the marks sit on a lattice and read as constructed rather
 * than photographic.
 * Interactive: cursor tightens the lattice and bleeds an amber accent.
 *
 * Deliberately standalone (it duplicates the plumbing in line-screen.js) so the
 * pitch stays "ship one file, no dependencies".
 *
 * Usage:
 *   <cross-hatch src="/handshake.jpg"></cross-hatch>
 *   <script src="/assets/cross-hatch.js" defer></script>
 *
 * Attributes (all optional except src):
 *   src         image URL
 *   grid        cells across the short edge   (default 32)
 *   levels      hatch passes, 1-6             (default 4)
 *   weight      stroke weight, share of cell  (default 0.22)
 *   angle       lattice rotation in radians, 0 = horizontal + vertical (default 0)
 *   contrast    tonal contrast               (default 1.05)
 *   exposure    tonal lift                   (default 0.16)
 *   bleed       amber bleed under cursor     (default 0.85)
 *   focus       cursor lattice focus         (default 0.5)
 *   ink         hex, dark color        (default #0A0A0A)
 *   paper       hex, light color       (default #EFEBDD)
 *   accent      hex, hover accent      (default #DF8E2A)
 *   interactive "false" disables mouse tracking
 *
 * Method:
 *   el.capture()  // -> Promise<Blob>  render current frame as PNG blob
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/*
 * MAX_LEVELS is baked into the shader because GLSL ES 1.00 needs a constant
 * loop bound. Passes past uLevels are masked to zero rather than broken out of,
 * which keeps the loop in the form the spec's Appendix A allows.
 */
const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform vec2  uResolution;
uniform vec2  uImageSize;
uniform vec2  uMouse;
uniform float uGrid;
uniform float uLevels;
uniform float uWeight;
uniform float uAngle;
uniform float uContrast;
uniform float uLift;
uniform float uBleed;
uniform float uFocus;
uniform float uHover;
uniform vec3  uInk;
uniform vec3  uPaper;
uniform vec3  uAccent;

const float PI = 3.14159265;
const int MAX_LEVELS = 6;

void main() {
  float cA = uResolution.x / uResolution.y;
  float iA = uImageSize.x / uImageSize.y;

  // Screen space in square units, so cells stay square and strokes keep a
  // constant width regardless of the element's aspect ratio.
  vec2 p = vUv * vec2(cA, 1.0);

  float d = distance(p, uMouse * vec2(cA, 1.0));
  float prox = smoothstep(0.45, 0.0, d) * uHover;

  // Cursor tightens the lattice, which is what resolves the photo.
  float cells = mix(uGrid, uGrid * 2.5, prox * uFocus);
  float cell = 1.0 / cells;

  // Quantise to the cell centre. Every mark in a cell then reflects a single
  // tone, which is what makes the output read as constructed: marks land on the
  // lattice instead of tracking the photograph's gradients.
  vec2 cellUv = (floor(p / cell) + 0.5) * cell / vec2(cA, 1.0);

  // object-fit: cover mapping
  vec2 sUV = cellUv;
  if (iA > cA) {
    sUV.x = (cellUv.x - 0.5) * (cA / iA) + 0.5;
  } else if (iA > 0.0) {
    sUV.y = (cellUv.y - 0.5) * (iA / cA) + 0.5;
  }

  vec3 img = texture2D(uImage, sUV).rgb;
  float lum = dot(img, vec3(0.299, 0.587, 0.114));
  lum = clamp((lum - 0.5) * uContrast + 0.5 + uLift, 0.0, 1.0);
  float dark = 1.0 - lum;

  // Build tone in passes. Every pass runs in one of exactly TWO perpendicular
  // directions (horizontal or vertical at uAngle 0), alternating between them.
  // Density comes from interleaving offset lines between the existing ones, not
  // from rotating to new angles, so the result stays a square lattice and never
  // grows diagonals. Strokes are measured against global p (not the cell) so
  // they run continuously across the image and align cell to cell.
  float ink = 0.0;
  for (int i = 0; i < MAX_LEVELS; i++) {
    float fi = float(i);
    float active = step(fi + 0.5, uLevels);
    float t = clamp(dark * uLevels - fi, 0.0, 1.0) * active;

    // Even passes run one way, odd passes the perpendicular way.
    float dir = mod(fi, 2.0);
    // Each generation of two passes lays its lines between the previous ones:
    // generation 0 on the cell grid, 1 at the half offset, 2 at the quarter.
    float gen = floor(fi * 0.5);
    float phase = step(0.5, gen) * 0.5 / max(gen, 1.0);

    float a = uAngle + dir * PI * 0.5;
    vec2 n = vec2(-sin(a), cos(a));
    float q = dot(p, n) / cell + phase;
    float tri = abs(fract(q) - 0.5) * 2.0;   // 0 on a stroke's centre line

    // Weight ramps with the tier so tone climbs smoothly inside a pass instead
    // of popping the whole stroke set on at once.
    float w = uWeight * t;
    float aa = fwidth(tri) + 0.0001;
    float on = 1.0 - smoothstep(w - aa, w + aa, tri);
    ink = max(ink, on * step(0.0001, t));
  }

  vec3 inkColor = mix(uInk, uAccent, prox * uBleed);
  gl_FragColor = vec4(mix(uPaper, inkColor, ink), 1.0);
}`;

const DEFAULTS = {
  grid: 32,
  levels: 4,
  weight: 0.22,
  angle: 0,
  contrast: 1.05,
  exposure: 0.16,
  bleed: 0.85,
  focus: 0.5,
  ink: '#0A0A0A',
  paper: '#EFEBDD',
  accent: '#DF8E2A',
};
const NUM_KEYS = ['grid','levels','weight','angle','contrast','exposure','bleed','focus'];

const hexToRgb = (h) => {
  const s = String(h).replace('#','');
  const n = parseInt(s.length === 3 ? s.split('').map(c=>c+c).join('') : s, 16);
  return [(n >> 16 & 255)/255, (n >> 8 & 255)/255, (n & 255)/255];
};

class CrossHatch extends HTMLElement {
  static get observedAttributes() {
    return ['src','grid','levels','weight','angle','contrast','exposure','bleed','focus','ink','paper','accent','interactive'];
  }

  constructor() {
    super();
    const r = this.attachShadow({ mode: 'open' });
    r.innerHTML = `
      <style>
        /* pan-y so a vertical drag still scrolls the page while a horizontal
           drag drives the cursor effect on touch; pinch-zoom stays available. */
        :host { display: block; position: relative; contain: layout paint; touch-action: pan-y pinch-zoom; }
        canvas { display: block; width: 100%; height: 100%; }
        .fb { position:absolute; inset:0; display:none; align-items:center; justify-content:center; text-align:center; padding:20px; color:#666; font: 12px ui-monospace, monospace; background:#EFEBDD; }
        .fb.on { display:flex; }
        img.fb { object-fit: cover; }
      </style>
      <canvas></canvas>
      <img class="fb" alt="" part="fallback-image">
      <div class="fb" part="fallback-text">WebGL unavailable</div>
    `;
    this._canvas = r.querySelector('canvas');
    this._fbImg = r.querySelector('img.fb');
    this._fbText = r.querySelector('div.fb');

    this._state = { ...DEFAULTS };
    this._mouse = { x:0.5, y:0.5, tx:0.5, ty:0.5, hover:0, thover:0 };
    this._imgSize = [1, 1];
    this._raf = 0;
    this._visible = true;
    this._interactive = true;
    this._connected = false;
    this._reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._onMove = this._onMove.bind(this);
    this._onLeave = this._onLeave.bind(this);
    this._onResize = this._onResize.bind(this);
    this._tick = this._tick.bind(this);
  }

  connectedCallback() {
    // pull attributes that may have been set before observedAttributes fired
    for (const k of Object.keys(DEFAULTS)) {
      if (this.hasAttribute(k)) this._state[k] = this._parse(k, this.getAttribute(k));
    }
    this._interactive = this.getAttribute('interactive') !== 'false';

    this._initGL();
    this._connected = true;
    if (!this._gl) {
      if (this.hasAttribute('src')) {
        this._fbImg.src = this.getAttribute('src');
        this._fbImg.classList.add('on');
      } else {
        this._fbText.classList.add('on');
      }
      return;
    }
    if (this.hasAttribute('src')) this._loadImage(this.getAttribute('src'));

    this.addEventListener('pointermove', this._onMove);
    this.addEventListener('pointerleave', this._onLeave);
    window.addEventListener('resize', this._onResize);

    this._io = new IntersectionObserver((entries) => {
      this._visible = entries[0].isIntersecting;
      if (this._visible) this._kick();
    }, { threshold: 0 });
    this._io.observe(this);

    this._kick();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._raf = 0;
    this.removeEventListener('pointermove', this._onMove);
    this.removeEventListener('pointerleave', this._onLeave);
    window.removeEventListener('resize', this._onResize);
    if (this._io) this._io.disconnect();
    if (this._gl) {
      const lc = this._gl.getExtension('WEBGL_lose_context');
      if (lc) lc.loseContext();
      this._gl = null;
    }
  }

  attributeChangedCallback(name, oldV, newV) {
    if (oldV === newV) return;
    if (name === 'src') {
      if (this._gl && newV) this._loadImage(newV);
      // Guarded on _connected: during upgrade this callback runs BEFORE
      // connectedCallback calls _initGL, so _gl is still undefined and this
      // branch would point the hidden fallback <img> at src, downloading the
      // whole image a second time in parallel with the WebGL load.
      // connectedCallback sets the fallback itself when GL is truly missing.
      else if (this._connected && !this._gl && newV) { this._fbImg.src = newV; }
      return;
    }
    if (name === 'interactive') {
      this._interactive = newV !== 'false';
      if (!this._interactive) { this._mouse.thover = 0; this._kick(); }
      return;
    }
    if (name in DEFAULTS) {
      this._state[name] = this._parse(name, newV);
      this._kick();
    }
  }

  _parse(k, v) {
    if (v == null) return DEFAULTS[k];
    if (NUM_KEYS.includes(k)) return parseFloat(v);
    return v;
  }

  _onMove(e) {
    if (!this._interactive) return;
    const r = this.getBoundingClientRect();
    this._mouse.tx = (e.clientX - r.left) / r.width;
    this._mouse.ty = 1.0 - (e.clientY - r.top) / r.height;
    this._mouse.thover = 1;
    this._kick();
  }
  _onLeave() { this._mouse.thover = 0; this._kick(); }
  _onResize() { this._kick(); }

  _initGL() {
    const gl = this._canvas.getContext('webgl', {
      preserveDrawingBuffer: true,
      antialias: false,
      alpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;
    gl.getExtension('OES_standard_derivatives');
    this._gl = gl;

    const compile = (t, s) => {
      const sh = gl.createShader(t);
      gl.shaderSource(sh, s);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('cross-hatch shader:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { this._gl = null; return; }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('cross-hatch link:', gl.getProgramInfoLog(prog));
      this._gl = null; return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    this._U = {};
    for (const n of ['uImage','uResolution','uImageSize','uMouse','uGrid','uLevels','uWeight','uAngle','uContrast','uLift','uBleed','uFocus','uHover','uInk','uPaper','uAccent']) {
      this._U[n] = gl.getUniformLocation(prog, n);
    }

    this._tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([128,128,128]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  _loadImage(src) {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    im.onload = () => {
      if (!this._gl) return;
      const gl = this._gl;
      gl.bindTexture(gl.TEXTURE_2D, this._tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
      this._imgSize = [im.naturalWidth || 1, im.naturalHeight || 1];
      this._kick();
    };
    im.onerror = () => console.warn('cross-hatch: failed to load', src);
    im.src = src;
  }

  _resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(this._canvas.clientWidth * dpr);
    const h = Math.round(this._canvas.clientHeight * dpr);
    if (this._canvas.width !== w || this._canvas.height !== h) {
      this._canvas.width = w;
      this._canvas.height = h;
      this._gl.viewport(0, 0, w, h);
    }
  }

  _render() {
    if (!this._gl) return;
    this._resize();
    const gl = this._gl, U = this._U, s = this._state;
    gl.uniform2f(U.uResolution, this._canvas.width, this._canvas.height);
    gl.uniform2f(U.uImageSize, this._imgSize[0], this._imgSize[1]);
    gl.uniform2f(U.uMouse, this._mouse.x, this._mouse.y);
    gl.uniform1f(U.uHover, this._mouse.hover);
    gl.uniform1f(U.uGrid, s.grid);
    gl.uniform1f(U.uLevels, Math.max(1, Math.min(6, Math.round(s.levels))));
    gl.uniform1f(U.uWeight, s.weight);
    gl.uniform1f(U.uAngle, s.angle);
    gl.uniform1f(U.uContrast, s.contrast);
    gl.uniform1f(U.uLift, s.exposure);
    gl.uniform1f(U.uBleed, s.bleed);
    gl.uniform1f(U.uFocus, s.focus);
    gl.uniform3fv(U.uInk, hexToRgb(s.ink));
    gl.uniform3fv(U.uPaper, hexToRgb(s.paper));
    gl.uniform3fv(U.uAccent, hexToRgb(s.accent));
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._tex);
    gl.uniform1i(U.uImage, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  _kick() {
    if (this._raf || !this._gl) return;
    this._raf = requestAnimationFrame(this._tick);
  }

  _tick() {
    this._raf = 0;
    if (!this._visible) return;
    const m = this._mouse;
    if (this._reduced) {
      m.x = m.tx; m.y = m.ty; m.hover = m.thover;
    } else {
      const k = 0.12;
      m.x += (m.tx - m.x) * k;
      m.y += (m.ty - m.y) * k;
      m.hover += (m.thover - m.hover) * k;
    }
    this._render();
    const done = Math.abs(m.tx-m.x) < 0.001 && Math.abs(m.ty-m.y) < 0.001 && Math.abs(m.thover-m.hover) < 0.001;
    if (!done) this._kick();
  }

  capture() {
    if (!this._gl) return Promise.resolve(null);
    this._render();
    return new Promise(res => this._canvas.toBlob(res));
  }
}

if (!customElements.get('cross-hatch')) {
  customElements.define('cross-hatch', CrossHatch);
}
