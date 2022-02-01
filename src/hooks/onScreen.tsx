import { useEffect, useRef, useState } from "react";

export const useAnimateOnScreen = ({
  screenEntryRatio,
  transitionDuration,
  makeAnimationUnique,
}: {
  screenEntryRatio: number;
  transitionDuration: number;
  makeAnimationUnique?: boolean;
}) => {
  const element = useRef<HTMLDivElement | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);
  const screenHeight = window.innerHeight;

  //TRANSITION DURATION
  useEffect(() => {
    if (element.current) {
      element.current.style.transition = `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`;
    }
  }, [transitionDuration]);

  //IS ELEMENT VISIBLE
  useEffect(() => {
    const observeElement = () => {
      if (element.current) {
        const elementTop = element.current.getBoundingClientRect().top;
        elementTop <= screenHeight * screenEntryRatio
          ? !isOnScreen && setIsOnScreen(true)
          : isOnScreen && !makeAnimationUnique && setIsOnScreen(false);
      }
    };
    document.addEventListener("scroll", observeElement);
    return () => document.removeEventListener("scroll", observeElement);
  }, [isOnScreen, screenEntryRatio, screenHeight]);

  //ANIMATIONS
  useEffect(() => {
    if (element.current) {
      isOnScreen
        ? (element.current.style.opacity = "1") &&
          (element.current.style.transform = "")
        : (element.current.style.opacity = "0") &&
          (element.current.style.transform = "translateY(80px)");
    }
  }, [isOnScreen]);

  return [element];
};
