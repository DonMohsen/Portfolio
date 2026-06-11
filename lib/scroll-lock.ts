type ScrollLockRelease = () => void;

/**
 * Freeze page scroll while a full-screen overlay (e.g. mobile menu) is open.
 * Restores the previous scroll position on release.
 */
export function lockPageScroll(): ScrollLockRelease {
  const scrollY = window.scrollY;
  const { documentElement: html, body } = document;

  const prev = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyTouchAction: body.style.touchAction,
    htmlOverscroll: html.style.overscrollBehavior,
    bodyOverscroll: body.style.overscrollBehavior,
  };

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.touchAction = "none";
  html.style.overscrollBehavior = "none";
  body.style.overscrollBehavior = "none";

  return () => {
    html.style.overflow = prev.htmlOverflow;
    body.style.overflow = prev.bodyOverflow;
    body.style.position = prev.bodyPosition;
    body.style.top = prev.bodyTop;
    body.style.left = prev.bodyLeft;
    body.style.right = prev.bodyRight;
    body.style.width = prev.bodyWidth;
    body.style.touchAction = prev.bodyTouchAction;
    html.style.overscrollBehavior = prev.htmlOverscroll;
    body.style.overscrollBehavior = prev.bodyOverscroll;
    window.scrollTo(0, scrollY);
  };
}
