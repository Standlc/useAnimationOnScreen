import React from "react";
import { useAnimationOnScreen } from "../hook/animationOnScreen";
import "./element.css";

const Element = ({
  animationType,
  screenEntryRatio,
  transitionDuration,
  makeAnimationUnique,
}: {
  animationType?: string;
  screenEntryRatio?: number;
  transitionDuration?: number;
  makeAnimationUnique?: boolean;
}) => {
  const element = useAnimationOnScreen({
    animationType,
    screenEntryRatio,
    transitionDuration,
    makeAnimationUnique,
  });
  return (
    <div ref={element} className="element">
      Hello
    </div>
  );
};

export default Element;
