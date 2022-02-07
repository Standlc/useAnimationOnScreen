import React from "react";
import { useAnimationOnScreen } from "../hook/animationOnScreen";
import "./element.css";

const Element = () => {
  const element = useAnimationOnScreen({
    animationType: "fade-up",
  });
  return (
    <div ref={element} className="element">
      Hello
    </div>
  );
};

export default Element;
