"use client";

import * as React from "react";

/*
 * A quiet brand stamp in the devtools console: a hidden delight for the
 * technical audience this system serves (treasury engineers, integrators).
 * Renders nothing; logs once on mount. No UI surface, so it never touches the
 * restrained product chrome.
 */
export function ConsoleStamp() {
  React.useEffect(() => {
    console.log(
      "%cLINERATE%c\nDesign system · documentary, audit-grade, dark-first.\nThe whole spec is one file: /DESIGN.md",
      "font:600 20px ui-monospace, monospace; letter-spacing:0.08em;",
      "font:13px ui-monospace, monospace; color:#838383;"
    );
  }, []);

  return null;
}
