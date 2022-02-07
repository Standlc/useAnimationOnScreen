import { useState, useRef, useCallback, useEffect } from "react";
const Animations = [
  {
    name: "fade-up",
    transform: "translateY(80px)",
    opacity: "0"
  },
  {
    name: "fade-left",
    transform: "translateX(80px)",
    opacity: "0"
  },
  {
    name: "fade-right",
    transform: "translateX(-80px)",
    opacity: "0"
  },
  {
    name: "zoom-out",
    transform: "scale(1.2)",
    opacity: "0"
  },
  {
    name: "zoom-in",
    transform: "scale(0.8)",
    opacity: "0"
  }
];
const useAnimationOnScreen = (config) => {
  const screenEntryRatio = config == null ? void 0 : config.screenEntryRatio;
  const animationType = config == null ? void 0 : config.animationType;
  const transitionDuration = config == null ? void 0 : config.transitionDuration;
  const makeAnimationUnique = config == null ? void 0 : config.makeAnimationUnique;
  const [isOnScreen, setIsOnScreen] = useState(false);
  const screenHeight = window == null ? void 0 : window.innerHeight;
  const element = useRef(null);
  const defaultAnimationType = "fade-up";
  const defaultTransitionDuration = 400;
  const defaultScreenEntryRatio = 0.9;
  const showElement = () => {
    if (!element.current)
      return;
    element.current.style.opacity = "1";
    element.current.style.transform = "";
  };
  const hideElement = useCallback((animationType2) => {
    const animation = Animations.find((animation2) => animation2.name === animationType2);
    if (animation === void 0 || !element.current)
      return;
    element.current.style.transform = animation.transform;
    element.current.style.opacity = animation.opacity;
  }, []);
  const tellIfElementIsOnScreen = useCallback(() => {
    if (!element.current)
      return;
    const elementTop = element.current.getBoundingClientRect().top;
    const isElementOnScreen = elementTop <= screenHeight * (screenEntryRatio ? screenEntryRatio : defaultScreenEntryRatio);
    !isOnScreen && setIsOnScreen(isElementOnScreen);
    isOnScreen && !makeAnimationUnique && setIsOnScreen(isElementOnScreen);
  }, [isOnScreen, makeAnimationUnique, screenEntryRatio, screenHeight]);
  const assignTransitionDuration = useCallback(() => {
    if (!element.current)
      return;
    element.current.style.transition = `opacity ${transitionDuration ? transitionDuration : defaultTransitionDuration}ms, transform ${transitionDuration ? transitionDuration : defaultTransitionDuration}ms`;
  }, [transitionDuration]);
  useEffect(() => {
    isOnScreen ? showElement() : hideElement(animationType ? animationType : defaultAnimationType);
  }, [isOnScreen, animationType, hideElement]);
  useEffect(() => {
    tellIfElementIsOnScreen();
    assignTransitionDuration();
  }, [transitionDuration, assignTransitionDuration, tellIfElementIsOnScreen]);
  useEffect(() => {
    document.addEventListener("scroll", tellIfElementIsOnScreen);
    return () => document.removeEventListener("scroll", tellIfElementIsOnScreen);
  }, [tellIfElementIsOnScreen]);
  return element;
};
export { useAnimationOnScreen };
