import type { DetailedHTMLProps, HTMLAttributes, Ref } from "react";

/*
 * Effect custom elements (public/line-screen.js, public/cross-hatch.js). React
 * 19 renders custom elements natively and passes unknown props through as
 * string attributes, which is exactly their contract (see effects/*). This
 * augments React's JSX namespace so the elements type-check with their
 * attributes and a ref to the underlying HTMLElement (which exposes .capture()).
 *
 * EffectLab creates these by tag name rather than as JSX, but the declarations
 * still cover the direct JSX uses elsewhere (e.g. the concept CTA background).
 */
type EffectAttributes = {
  src?: string;
  contrast?: string;
  exposure?: string;
  bleed?: string;
  focus?: string;
  angle?: string;
  ink?: string;
  paper?: string;
  accent?: string;
  interactive?: string;
  ref?: Ref<HTMLElement>;
};

type LineScreenAttributes = EffectAttributes & {
  frequency?: string;
  magnet?: string;
};

type CrossHatchAttributes = EffectAttributes & {
  grid?: string;
  levels?: string;
  weight?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "line-screen": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & LineScreenAttributes,
        HTMLElement
      >;
      "cross-hatch": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & CrossHatchAttributes,
        HTMLElement
      >;
    }
  }
}
