import React from "react";
import { useAnimateOnScreen } from "../hook/animationOnScreen";
import "./element.css";

const Element = () => {
  const element = useAnimateOnScreen({
    animationType: "fade-right",
    screenEntryRatio: 0.8,
  });
  return (
    <div ref={element} className="element">
      Hello
    </div>
  );
};

export default Element;
