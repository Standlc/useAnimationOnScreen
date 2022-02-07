import { useCallback, useEffect, useRef, useState } from "react";
import { Animations } from "./Animations";

export const useAnimationOnScreen = (config?: {
  screenEntryRatio?: number;
  animationType?: string;
  transitionDuration?: number;
  makeAnimationUnique?: boolean;
}) => {
  const screenEntryRatio = config?.screenEntryRatio;
  const animationType = config?.animationType;
  const transitionDuration = config?.transitionDuration;
  const makeAnimationUnique = config?.makeAnimationUnique;
  const [isOnScreen, setIsOnScreen] = useState(false);
  const screenHeight = window?.innerHeight;
  const element = useRef<HTMLEmbedElement>(null);
  const defaultAnimationType = "fade-up";
  const defaultTransitionDuration = 400;
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
    if (!element.current) return;
    const elementTop = element.current.getBoundingClientRect().top;
    const isElementOnScreen =
      elementTop <=
      screenHeight *
        (screenEntryRatio ? screenEntryRatio : defaultScreenEntryRatio);

    !isOnScreen && setIsOnScreen(isElementOnScreen);
    isOnScreen && !makeAnimationUnique && setIsOnScreen(isElementOnScreen);
  }, [isOnScreen, makeAnimationUnique, screenEntryRatio, screenHeight]);

  const assignTransitionDuration = useCallback(() => {
    if (!element.current) return;
    element.current.style.transition = `opacity ${
      transitionDuration ? transitionDuration : defaultTransitionDuration
    }ms, transform ${
      transitionDuration ? transitionDuration : defaultTransitionDuration
    }ms`;
  }, [transitionDuration]);

  useEffect(() => {
    isOnScreen
      ? showElement()
      : hideElement(animationType ? animationType : defaultAnimationType);
  }, [isOnScreen, animationType, hideElement]);

  useEffect(() => {
    tellIfElementIsOnScreen();
    assignTransitionDuration();
  }, [transitionDuration, assignTransitionDuration, tellIfElementIsOnScreen]);

  useEffect(() => {
    document.addEventListener("scroll", tellIfElementIsOnScreen);
    return () =>
      document.removeEventListener("scroll", tellIfElementIsOnScreen);
  }, [tellIfElementIsOnScreen]);
  return element;
};
