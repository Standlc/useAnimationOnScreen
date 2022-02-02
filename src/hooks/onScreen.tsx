import { useEffect, useRef, useState } from "react";

export const useAnimateOnScreen = ({
  screenEntryRatio,
  animationType,
  transitionDuration,
  makeAnimationUnique,
}: {
  screenEntryRatio?: number;
  animationType?: string;
  transitionDuration?: number;
  makeAnimationUnique?: boolean;
}) => {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const screenHeight = window.innerHeight;
  const element = useRef<
    | HTMLDivElement
    | HTMLImageElement
    | HTMLParagraphElement
    | HTMLHeadingElement
    | null
  >(null);

  const showElement = () => {
    if (element.current) {
      element.current.style.opacity = "1";
      element.current.style.transform = "";
    }
  };
  const hideElement = (animationType: string) => {
    if (element.current) {
      element.current.style.opacity = "0";
      if (animationType === "fade-up") {
        element.current.style.transform = "translateY(80px)";
      } else if (animationType === "fade-left") {
        element.current.style.transform = "translateX(80px)";
      } else if (animationType === "fade-right") {
        element.current.style.transform = "translateY(80px)";
      } else if (animationType === "zoom-out") {
        element.current.style.transform = "scale(1.2)";
      }
    }
  };
  const observeElement = () => {
    if (element.current) {
      const elementTop = element.current.getBoundingClientRect().top;
      elementTop <= screenHeight * (screenEntryRatio ? screenEntryRatio : 0.9)
        ? !isOnScreen && setIsOnScreen(true)
        : isOnScreen && !makeAnimationUnique && setIsOnScreen(false);
    }
  };
  const assignAnimation = (animationType: string) => {
    if (element.current) {
      isOnScreen ? showElement() : hideElement(animationType);
    }
  };
  const assignTransitionDuration = () => {
    if (element.current) {
      element.current.style.transition = `opacity ${
        transitionDuration ? transitionDuration : 400
      }ms, transform ${transitionDuration ? transitionDuration : 400}ms`;
    }
  };

  useEffect(() => {
    assignTransitionDuration();
    observeElement();
  }, [transitionDuration]);

  useEffect(() => {
    document.addEventListener("scroll", observeElement);
    return () => document.removeEventListener("scroll", observeElement);
  }, [isOnScreen, screenEntryRatio, screenHeight]);

  useEffect(() => {
    assignAnimation(animationType ? animationType : "fade-up");
  }, [isOnScreen]);
  return [element];
};
