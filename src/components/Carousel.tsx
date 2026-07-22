import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [children]);

  function scrollBy(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  }

  return (
    <div className="relative min-w-0">
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar">
        {children}
      </div>
      {canScrollLeft && (
        <button onClick={() => scrollBy(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1">
          <ChevronLeft size={18} />
        </button>
      )}
      {canScrollRight && (
        <button onClick={() => scrollBy(1)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1">
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}