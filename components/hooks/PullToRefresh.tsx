"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface PullToRefreshProps {
  children: React.ReactNode;
}

export default function PullToRefresh({ children }: PullToRefreshProps) {
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
  };

  const router = useRouter();

  const handleTouchEnd = async (e: React.TouchEvent<HTMLDivElement>) => {
    const diff = e.changedTouches[0].clientY - startY.current;
    if (diff > 80 && window.scrollY === 0) {
      router.refresh();
    }
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {children}
    </div>
  );
}
