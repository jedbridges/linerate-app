/**
 * <line-screen>
 * A WebGL fragment shader that renders any photograph as a coarse line halftone.
 * Interactive: the cursor tightens line density (photo resolves), bends the rules
 * toward itself like a magnet, and bleeds an amber accent. The photograph itself
 * is never distorted; only the line pattern responds.
 *
 * Usage:
 *   <line-screen src="/handshake.jpg"></line-screen>
 *   <script src="/assets/line-screen.js" defer></script>
 *
 * Attributes (all optional except src):
 *   src         image URL
 *   frequency   line frequency        (default 170)
 *   contrast    tonal contrast        (default 1.7)
 *   exposure    tonal lift            (default 0)
 *   bleed       amber bleed under cursor    (default 0.85)
 *   focus       cursor line-density focus   (default 0.5)
 *   magnet      cursor magnetism, lines bend toward it (default 0.45)
 *   angle       line angle in radians       (default 0)
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

const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform vec2  uResolution;
uniform vec2  uImageSize;
uniform vec2  uMouse;
uniform float uFrequency;
uniform float uAngle;
uniform float uContrast;
uniform float uLift;
uniform float uBleed;
uniform float uFocus;
uniform float uMagnet;
uniform float uHover;
uniform vec3  uInk;
uniform vec3  uPaper;
uniform vec3  uAccent;

/* Radius of the cursor's magnetic field, in screen-height units. */
const float MAG_SIGMA = 0.30;

void main() {
  // object-fit: cover mapping
  float cA = uResolution.x / uResolution.y;
  float iA = uImageSize.x / uImageSize.y;
  vec2 sUV = vUv;
  if (iA > cA) {
    sUV.x = (vUv.x - 0.5) * (cA / iA) + 0.5;
  } else if (iA > 0.0) {
    sUV.y = (vUv.y - 0.5) * (iA / cA) + 0.5;
  }

  // cursor proximity, aspect-corrected
  float d = distance(vUv * vec2(cA, 1.0), uMouse * vec2(cA, 1.0));
  float prox = smoothstep(0.45, 0.0, d) * uHover;

  // The photograph is sampled undistorted. Everything the cursor does happens
  // to the lines, not to the image.
  vec3 img = texture2D(uImage, sUV).rgb;
  float lum = dot(img, vec3(0.299, 0.587, 0.114));
  lum = clamp((lum - 0.5) * uContrast + 0.5 + uLift, 0.0, 1.0);

  // line screen in screen space so line width is constant
  vec2 p = vUv * vec2(cA, 1.0);

  // Magnetism: pull the *pattern* coordinate toward the cursor so the rules
  // bend and gather around it, the way filings line up along a field. The
  // offset is deliberately left un-normalised, so the pull falls back to zero
  // at the cursor itself and peaks in a ring around it. That avoids both the
  // lens bulge of a displacement map and the cusp a normalised pull leaves
  // directly under the pointer.
  vec2 toM = uMouse * vec2(cA, 1.0) - p;
  float md = length(toM);
  float field = exp(-md * md / (2.0 * MAG_SIGMA * MAG_SIGMA));
  p += toM * field * uMagnet * uHover;

  float c = cos(uAngle), s = sin(uAngle);
  vec2 rp = mat2(c, -s, s, c) * p;
  float freq = mix(uFrequency, uFrequency * 3.5, prox * uFocus);
  float stripes = sin(rp.y * freq) * 0.5 + 0.5;

  // antialias with fwidth to prevent moire at higher frequencies
  float w = fwidth(stripes) * 0.8 + 0.001;
  float ink = 1.0 - smoothstep(-w, w, stripes - (1.0 - lum));

  vec3 inkColor = mix(uInk, uAccent, prox * uBleed);
  gl_FragColor = vec4(mix(uPaper, inkColor, ink), 1.0);
}`;

const DEFAULTS = {
  frequency: 170,
  contrast: 1.7,
  exposure: 0,
  bleed: 0.85,
  focus: 0.5,
  magnet: 0.45,
  angle: 0,
  ink: '#0A0A0A',
  paper: '#EFEBDD',
  accent: '#DF8E2A',
};
const NUM_KEYS = ['frequency','contrast','exposure','bleed','focus','magnet','angle'];
const HEX_KEYS = ['ink','paper','accent'];

const hexToRgb = (h) => {
  const s = String(h).replace('#','');
  const n = parseInt(s.length === 3 ? s.split('').map(c=>c+c).join('') : s, 16);
  return [(n >> 16 & 255)/255, (n >> 8 & 255)/255, (n & 255)/255];
};

class LineScreen extends HTMLElement {
  static get observedAttributes() {
    return ['src','frequency','contrast','exposure','bleed','focus','magnet','angle','ink','paper','accent','interactive'];
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
      else if (!this._gl && newV) { this._fbImg.src = newV; }
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
        console.error('line-screen shader:', gl.getShaderInfoLog(sh));
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
      console.error('line-screen link:', gl.getProgramInfoLog(prog));
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
    for (const n of ['uImage','uResolution','uImageSize','uMouse','uFrequency','uAngle','uContrast','uLift','uBleed','uFocus','uMagnet','uHover','uInk','uPaper','uAccent']) {
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
    im.onerror = () => console.warn('line-screen: failed to load', src);
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
    gl.uniform1f(U.uFrequency, s.frequency);
    gl.uniform1f(U.uAngle, s.angle);
    gl.uniform1f(U.uContrast, s.contrast);
    gl.uniform1f(U.uLift, s.exposure);
    gl.uniform1f(U.uBleed, s.bleed);
    gl.uniform1f(U.uFocus, s.focus);
    gl.uniform1f(U.uMagnet, s.magnet);
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

if (!customElements.get('line-screen')) {
  customElements.define('line-screen', LineScreen);
}
