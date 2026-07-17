import type { DetailedHTMLProps, HTMLAttributes, Ref } from "react";

/*
 * <line-screen> custom element (public/line-screen.js). React 19 renders custom
 * elements natively and passes unknown props through as string attributes,
 * which is exactly the component's contract (see effects/line-screen). This
 * augments React's JSX namespace so the element type-checks with its attributes
 * and a ref to the underlying HTMLElement (which exposes .capture()).
 */
type LineScreenAttributes = {
  src?: string;
  frequency?: string;
  contrast?: string;
  exposure?: string;
  bleed?: string;
  focus?: string;
  warp?: string;
  angle?: string;
  ink?: string;
  paper?: string;
  accent?: string;
  interactive?: string;
  ref?: Ref<HTMLElement>;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "line-screen": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & LineScreenAttributes,
        HTMLElement
      >;
    }
  }
}
