import React from "react";
import { useAnimateOnScreen } from "../hooks/onScreen";
import "./element.css";

const Element = () => {
  const element = useAnimateOnScreen({
    animationType: "fade-right",
    screenEntryRatio: 0.5,
  });
  return (
    <div ref={element} className="element">
      Hello
    </div>
  );
};

export default Element;
