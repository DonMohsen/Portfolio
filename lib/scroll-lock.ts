type ScrollLockRelease = () => void;

const SCROLL_LOCK_CLASS = "scroll-locked";

function getScrollbarWidth(): number {
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

/**
 * Freeze page scroll while a full-screen overlay (e.g. mobile menu) is open.
 * Reserves scrollbar width so layout does not shift when the gutter closes.
 */
export function lockPageScroll(): ScrollLockRelease {
  const scrollY = window.scrollY;
  const { documentElement: html, body } = document;
  const scrollbarWidth = getScrollbarWidth();

  const prev = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyPaddingRight: body.style.paddingRight,
    htmlPaddingRight: html.style.paddingRight,
    bodyTouchAction: body.style.touchAction,
    htmlOverscroll: html.style.overscrollBehavior,
    bodyOverscroll: body.style.overscrollBehavior,
    scrollbarWidthVar: html.style.getPropertyValue("--scroll-lock-scrollbar-width"),
    hadScrollLockClass: html.classList.contains(SCROLL_LOCK_CLASS),
  };

  if (scrollbarWidth > 0) {
    const pad = `${scrollbarWidth}px`;
    html.style.setProperty("--scroll-lock-scrollbar-width", pad);
    html.style.paddingRight = pad;
    body.style.paddingRight = pad;
  }

  html.classList.add(SCROLL_LOCK_CLASS);
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
    body.style.paddingRight = prev.bodyPaddingRight;
    html.style.paddingRight = prev.htmlPaddingRight;
    body.style.touchAction = prev.bodyTouchAction;
    html.style.overscrollBehavior = prev.htmlOverscroll;
    body.style.overscrollBehavior = prev.bodyOverscroll;
    if (prev.scrollbarWidthVar) {
      html.style.setProperty(
        "--scroll-lock-scrollbar-width",
        prev.scrollbarWidthVar
      );
    } else {
      html.style.removeProperty("--scroll-lock-scrollbar-width");
    }
    if (!prev.hadScrollLockClass) {
      html.classList.remove(SCROLL_LOCK_CLASS);
    }
    window.scrollTo(0, scrollY);
  };
}
