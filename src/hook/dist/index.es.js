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
  const screenEntryRatio = (config == null ? void 0 : config.screenEntryRatio) ? config == null ? void 0 : config.screenEntryRatio : 0.9;
  const animationType = (config == null ? void 0 : config.animationType) ? config == null ? void 0 : config.animationType : "fade-up";
  const transitionDuration = (config == null ? void 0 : config.transitionDuration) ? config == null ? void 0 : config.transitionDuration : 800;
  const transitionTimingFunction = (config == null ? void 0 : config.transitionTimingFunction) ? config == null ? void 0 : config.transitionTimingFunction : "cubic-bezier(0.165,0.7,0.44,1)";
  const makeAnimationUnique = config == null ? void 0 : config.makeAnimationUnique;
  const transitionDelay = (config == null ? void 0 : config.transitionDelay) ? config == null ? void 0 : config.transitionDelay : 0;
  const [isOnScreen, setIsOnScreen] = useState(false);
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : void 0;
  const element = useRef(null);
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
    if (!element.current || screenHeight === void 0)
      return;
    const elementTop = element.current.getBoundingClientRect().top;
    const isElementOnScreen = elementTop <= screenHeight * screenEntryRatio;
    !isOnScreen && setIsOnScreen(isElementOnScreen);
    isOnScreen && !makeAnimationUnique && setIsOnScreen(isElementOnScreen);
  }, [isOnScreen, makeAnimationUnique, screenEntryRatio, screenHeight]);
  const assignTransitionDurationConfig = useCallback(() => {
    if (!element.current)
      return;
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
    tellIfElementIsOnScreen
  ]);
  useEffect(() => {
    document.addEventListener("scroll", tellIfElementIsOnScreen);
    return () => document.removeEventListener("scroll", tellIfElementIsOnScreen);
  }, [tellIfElementIsOnScreen]);
  return element;
};
export { useAnimationOnScreen };
