import React, { useEffect } from "react";

export const ScrollbarController: React.FC = () => {
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const docEl = document.documentElement;

    const handleScroll = () => {
      docEl.classList.add("is-scrolling");
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        docEl.classList.remove("is-scrolling");
      }, 1000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Reveal scrollbar if mouse is within 24px of the right edge of the viewport
      const isNearRightEdge = window.innerWidth - e.clientX <= 24;

      if (isNearRightEdge) {
        if (!docEl.classList.contains("is-scrollbar-hovered")) {
          docEl.classList.add("is-scrollbar-hovered");
        }
      } else {
        if (docEl.classList.contains("is-scrollbar-hovered")) {
          docEl.classList.remove("is-scrollbar-hovered");
        }
      }
    };

    const handleMouseLeave = () => {
      docEl.classList.remove("is-scrollbar-hovered");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      docEl.classList.remove("is-scrolling", "is-scrollbar-hovered");
    };
  }, []);

  return null;
};

export default ScrollbarController;
