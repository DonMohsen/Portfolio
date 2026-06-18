"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export type BlogTopic = {
  id: string;
  name: string;
  children?: BlogTopic[];
};

type BlogContentTableProps = {
  topics: BlogTopic[];
  locale: string;
};

function TopicItem({
  topic,
  level = 0,
  onTopicClick,
  visible,
}: {
  topic: BlogTopic;
  level?: number;
  onTopicClick: (id: string) => void;
  visible: boolean;
}) {
  const paddingRight = level * 16;

  return (
    <li
      className="list-none transition-all duration-500 ease-in-out"
      style={
        visible
          ? {}
          : {
              opacity: 0,
              maxHeight: 0,
              overflow: "hidden",
              padding: 0,
              margin: 0,
            }
      }
    >
      <div
        className="flex items-center"
        style={{ paddingInlineEnd: `${paddingRight}px` }}
      >
        <a
          href={`#${topic.id}`}
          onClick={(e) => {
            e.preventDefault();
            onTopicClick(topic.id);
          }}
          className={`inline-flex cursor-pointer items-center gap-2 py-2 text-page-muted transition-colors hover:text-accent-cosmic ${
            level > 0 ? "text-[14px]" : "text-[16px]"
          }`}
        >
          {level === 0 ? (
            <span className="shrink-0 text-accent-cosmic">•</span>
          ) : null}
          <span>{topic.name}</span>
        </a>
      </div>
      {topic.children?.length ? (
        <ul className="list-none">
          {topic.children.map((child, index) => (
            <TopicItem
              key={child.id || index}
              topic={child}
              level={level + 1}
              onTopicClick={onTopicClick}
              visible={visible}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function BlogContentTable({
  topics,
  locale,
}: BlogContentTableProps) {
  const isFa = locale === "fa";
  const initialVisible = 3;
  const [showAllTopics, setShowAllTopics] = useState(false);
  const hasMoreTopics = topics.length > initialVisible;

  const scrollToElement = useCallback((id: string, smooth = true) => {
    const findAndScroll = (retries = 5) => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, elementPosition - offset),
          behavior: smooth ? "smooth" : "auto",
        });
      } else if (retries > 0) {
        setTimeout(() => findAndScroll(retries - 1), 150);
      }
    };
    findAndScroll();
  }, []);

  const scrollToTopic = useCallback(
    (id: string) => {
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${id}`
      );
      scrollToElement(id, true);
    },
    [scrollToElement]
  );

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    setTimeout(() => scrollToElement(hash, false), 500);
  }, [scrollToElement]);

  if (!topics.length) return null;

  return (
    <div
      className="relative w-fit overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card p-5 shadow-[var(--tech-card-shadow)]"
      dir={isFa ? "rtl" : "ltr"}
    >
      <p className="mb-4 px-4 py-1 text-right text-[18px] font-medium text-page-text max-md:text-[16px]">
        {isFa ? "آنچه در این مقاله میخوانید" : "In this article"}
      </p>

      <div className={`relative ${hasMoreTopics && !showAllTopics ? "pb-0" : ""}`}>
        <nav>
          <ul className="flex flex-col gap-1">
            {topics.map((topic, index) => (
              <TopicItem
                key={topic.id || index}
                topic={topic}
                onTopicClick={scrollToTopic}
                visible={showAllTopics || index < initialVisible}
              />
            ))}
          </ul>
        </nav>

        {hasMoreTopics && !showAllTopics ? (
          <div className="pointer-events-none absolute bottom-0 right-0 h-[30px] w-full rounded-b-xl bg-gradient-to-t from-tech-card to-transparent" />
        ) : null}
      </div>

      {hasMoreTopics ? (
        <button
          type="button"
          onClick={() => setShowAllTopics(!showAllTopics)}
          className={`mb-2 flex w-full cursor-pointer items-center justify-center gap-2 text-[14px] text-accent-cosmic ${
            showAllTopics ? "mt-2" : "mt-0"
          }`}
        >
          <span>
            {showAllTopics
              ? isFa
                ? "مشاهده کمتر"
                : "Show less"
              : isFa
                ? "مشاهده بیشتر"
                : "Show more"}
          </span>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              showAllTopics ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      ) : null}
    </div>
  );
}
