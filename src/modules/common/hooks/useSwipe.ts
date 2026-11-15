import { useRef, type TouchEvent } from "react";

interface SwipeInput {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight, minSwipeDistance = 50 }: SwipeInput) => {
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    const x = e.targetTouches[0]?.clientX ?? null;
    touchStartRef.current = x;
    touchEndRef.current = x;
  };

  const onTouchMove = (e: TouchEvent) => {
    const x = e.targetTouches[0]?.clientX;
    if (x !== undefined) {
      touchEndRef.current = x;
    }
  };

  const resetTouch = () => {
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  const onTouchEnd = (e?: TouchEvent) => {
    const start = touchStartRef.current;
    const changedX = e?.changedTouches?.[0]?.clientX;
    const end = changedX !== undefined ? changedX : touchEndRef.current;
    resetTouch();

    if (start === null || end === null) return;

    const distance = start - end;
    if (Math.abs(distance) > minSwipeDistance) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      if (distance > minSwipeDistance && onSwipeLeft) {
        onSwipeLeft();
      } else if (distance < -minSwipeDistance && onSwipeRight) {
        onSwipeRight();
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel: resetTouch,
  };
};
