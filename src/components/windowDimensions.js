import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: pageHeight } = window;
    return {
        width,
        pageHeight
    };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}