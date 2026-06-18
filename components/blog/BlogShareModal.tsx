"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, Linkedin, Send } from "lucide-react";

type BlogShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  shareButtonRef: React.RefObject<HTMLButtonElement | null>;
  locale: string;
};

export default function BlogShareModal({
  isOpen,
  onClose,
  url,
  title,
  shareButtonRef,
  locale,
}: BlogShareModalProps) {
  const isFa = locale === "fa";
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [modalTop, setModalTop] = useState(0);
  const [modalRight, setModalRight] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateModalPosition = () => {
    const btn = shareButtonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const gap = 10;
    setModalTop(rect.top + rect.height / 2);
    setModalRight(window.innerWidth - (rect.left - gap));
  };

  useEffect(() => {
    if (!isOpen) return;
    updateModalPosition();

    const handle = () => updateModalPosition();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);

    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [isOpen, shareButtonRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside, true);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside, true);
    }
  }, [isOpen, onClose, shareButtonRef]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopyUrl = async () => {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: "telegram" | "linkedin") => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const shareUrl =
      platform === "telegram"
        ? `https://telegram.me/share/?url=${encodedUrl}&text=${encodedTitle}`
        : `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;

    window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const displayUrl = url.replace(/^https?:\/\//, "");

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <div
      ref={modalRef}
      dir="ltr"
      className="fixed z-[9999] flex min-h-[52px] w-[280px] max-w-[92vw] items-center gap-2 rounded-xl border border-tech-card-border bg-tech-card px-2 py-1 shadow-lg sm:w-[320px]"
      style={{ top: modalTop, right: modalRight, transform: "translateY(-50%)" }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
        <input
          type="text"
          value={displayUrl}
          readOnly
          dir="ltr"
          className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-none border-0 bg-transparent px-2 py-0.5 text-[12px] text-page-text focus:outline-none"
          title={displayUrl}
        />
        <button
          type="button"
          onClick={() => void handleCopyUrl()}
          className="shrink-0 rounded-md p-1 transition-colors hover:bg-tech-card-border/30"
          aria-label={isFa ? "کپی لینک" : "Copy link"}
        >
          <Copy className="h-4 w-4 text-page-subtle" />
        </button>
        {copied ? (
          <span className="shrink-0 text-[11px] text-accent-cosmic">
            {isFa ? "کپی شد" : "Copied"}
          </span>
        ) : null}
      </div>

      <div className="ms-2 flex shrink-0 items-center gap-0.5 border-s border-tech-card-border ps-2">
        <button
          type="button"
          onClick={() => handleShare("telegram")}
          className="shrink-0 rounded-md p-1 transition-colors hover:bg-tech-card-border/30"
          aria-label={isFa ? "اشتراک در تلگرام" : "Share on Telegram"}
        >
          <Send className="h-[18px] w-[18px] text-[#0179B8]" />
        </button>
        <button
          type="button"
          onClick={() => handleShare("linkedin")}
          className="shrink-0 rounded-md p-1 transition-colors hover:bg-tech-card-border/30"
          aria-label={isFa ? "اشتراک در لینکداین" : "Share on LinkedIn"}
        >
          <Linkedin className="h-[18px] w-[18px] text-[#0077b5]" />
        </button>
      </div>
    </div>,
    document.body
  );
}
