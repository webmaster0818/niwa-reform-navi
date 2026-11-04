"use client";

import { useEffect } from "react";

/**
 * スクロールで各ブロックを順に表示する（TOP 用）。
 * - JS 実行後に html.gr-js を付け、その時点で画面外にある [data-reveal] だけを隠す（初期表示・クローラーに影響しない）
 * - prefers-reduced-motion では何もしない。印刷時は CSS で常に表示
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("gr-js");
    const vh = window.innerHeight;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top > vh * 0.9 && r.height > 0;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("gr-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    targets.forEach((el, i) => {
      el.classList.add("gr-reveal");
      // 同じ行に並ぶ要素は少しずつ遅らせる
      const d = el.dataset.reveal;
      if (d) el.style.transitionDelay = `${Math.min(Number(d) || 0, 6) * 70}ms`;
      io.observe(el);
      void i;
    });
    const fallback = window.setTimeout(() => {
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("gr-in");
      });
    }, 2500);
    const onBeforePrint = () => targets.forEach((el) => el.classList.add("gr-in"));
    window.addEventListener("beforeprint", onBeforePrint);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("beforeprint", onBeforePrint);
    };
  }, []);
  return null;
}
