import React from "react";
import { useAnimateOnScreen } from "../hooks/onScreen";
import "./element.css";

const Element = () => {
  const [element] = useAnimateOnScreen({});
  return <div ref={element} className="element"></div>;
};

export default Element;
