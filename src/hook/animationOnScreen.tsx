import { useCallback, useEffect, useRef, useState } from "react";
import { Animations } from "./Animations";

export const useAnimationOnScreen = (config?: {
  screenEntryRatio?: number;
  animationType?: string;
  transitionDuration?: number;
  transitionDelay?: number;
  transitionTimingFunction?: string;
  makeAnimationUnique?: boolean;
}) => {
  const screenEntryRatio = config?.screenEntryRatio
    ? config?.screenEntryRatio
    : 0.9;
  const animationType = config?.animationType
    ? config?.animationType
    : "fade-up";
  const transitionDuration = config?.transitionDuration
    ? config?.transitionDuration
    : 800;
  const transitionTimingFunction = config?.transitionTimingFunction
    ? config?.transitionTimingFunction
    : "cubic-bezier(0.165,0.7,0.44,1)";
  const makeAnimationUnique = config?.makeAnimationUnique;
  const transitionDelay = config?.transitionDelay ? config?.transitionDelay : 0;
  const [isOnScreen, setIsOnScreen] = useState(false);
  const screenHeight =
    typeof window !== "undefined" ? window.innerHeight : undefined;
  const element = useRef<HTMLEmbedElement>(null);

  const showElement = () => {
    if (!element.current) return;
    element.current.style.opacity = "1";
    element.current.style.transform = "";
  };

  const hideElement = useCallback((animationType: string) => {
    const animation = Animations.find(
      (animation) => animation.name === animationType
    );
    if (animation === undefined || !element.current) return;
    element.current.style.transform = animation.transform;
    element.current.style.opacity = animation.opacity;
  }, []);

  const tellIfElementIsOnScreen = useCallback(() => {
    if (!element.current || screenHeight === undefined) return;
    const elementTop = element.current.getBoundingClientRect().top;
    const isElementOnScreen = elementTop <= screenHeight * screenEntryRatio;
    !isOnScreen && setIsOnScreen(isElementOnScreen);
    isOnScreen && !makeAnimationUnique && setIsOnScreen(isElementOnScreen);
  }, [isOnScreen, makeAnimationUnique, screenEntryRatio, screenHeight]);

  const assignTransitionDurationConfig = useCallback(() => {
    if (!element.current) return;
    element.current.style.transition = `opacity ${transitionDuration}ms ${transitionTimingFunction} ${transitionDelay}ms, transform ${transitionDuration}ms ${transitionTimingFunction} ${transitionDelay}ms`;
  }, [transitionDuration, transitionDelay]);

  useEffect(() => {
    isOnScreen ? showElement() : hideElement(animationType);
  }, [isOnScreen, animationType, hideElement]);

  useEffect(() => {
    tellIfElementIsOnScreen();
    assignTransitionDurationConfig();
  }, [
    transitionDuration,
    assignTransitionDurationConfig,
    tellIfElementIsOnScreen,
  ]);

  useEffect(() => {
    document.addEventListener("scroll", tellIfElementIsOnScreen);
    return () =>
      document.removeEventListener("scroll", tellIfElementIsOnScreen);
  }, [tellIfElementIsOnScreen]);

  return element;
};
