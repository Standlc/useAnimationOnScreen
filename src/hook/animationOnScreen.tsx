import { useCallback, useEffect, useRef, useState } from "react";
import { Animations } from "./Animations";

export const useAnimationOnScreen = (config?: {
  screenEntryRatio?: number;
  animationType?: string;
  transitionDuration?: number;
  makeAnimationUnique?: boolean;
  animationDelay?: number;
}) => {
  const screenEntryRatio = config?.screenEntryRatio;
  const animationType = config?.animationType;
  const transitionDuration = config?.transitionDuration;
  const makeAnimationUnique = config?.makeAnimationUnique;
  const animationDelay = config?.animationDelay;
  const [isOnScreen, setIsOnScreen] = useState(false);
  const screenHeight =
    typeof window.innerHeight !== "undefined" ? window.innerHeight : undefined;
  const element = useRef<HTMLEmbedElement>(null);
  const defaultAnimationType = "fade-up";
  const defaultTransitionDuration = 900;
  const defaultScreenEntryRatio = 0.9;

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
    const isElementOnScreen =
      elementTop <=
      screenHeight *
        (screenEntryRatio !== undefined
          ? screenEntryRatio
          : defaultScreenEntryRatio);

    !isOnScreen && setIsOnScreen(isElementOnScreen);
    isOnScreen && !makeAnimationUnique && setIsOnScreen(isElementOnScreen);
  }, [isOnScreen, makeAnimationUnique, screenEntryRatio, screenHeight]);

  const assignTransitionDurationConfig = useCallback(() => {
    if (!element.current) return;
    element.current.style.transition = `opacity ${
      transitionDuration ? transitionDuration : defaultTransitionDuration
    }ms, transform ${
      transitionDuration ? transitionDuration : defaultTransitionDuration
    }ms`;
    element.current.style.transitionTimingFunction =
      "cubic-bezier(0.165,0.84,0.44,1)";
    element.current.style.transitionDelay = `${animationDelay}ms`;
  }, [transitionDuration]);

  useEffect(() => {
    isOnScreen
      ? showElement()
      : hideElement(animationType ? animationType : defaultAnimationType);
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
