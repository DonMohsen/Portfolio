let pendingHref: string | null = null;

export function queuePendingTransition(href: string) {
  pendingHref = href;
}

export function consumePendingTransition() {
  const href = pendingHref;
  pendingHref = null;
  return href;
}
