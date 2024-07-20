// @ts-nocheck
"use client";
import React, { useEffect } from "react";

const DevToolsDetector = () => {
  useEffect(() => {
    const devtools = { open: false, orientation: null };

    const threshold = 160;
    const emitEvent = (status) => {
      const event = new CustomEvent("devtoolschange", {
        detail: {
          open: status.open,
          orientation: status.orientation,
        },
      });
      window.dispatchEvent(event);
    };

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;
      const orientation = widthThreshold ? "vertical" : "horizontal";
      console.log(
        window.outerHeight,
        window.innerHeight,
        window.outerHeight - window.innerHeight,
        "xxxxx"
      );

      if (widthThreshold || heightThreshold) {
        if (!devtools.open || devtools.orientation !== orientation) {
          devtools.open = true;
          devtools.orientation = orientation;
          emitEvent(devtools);
        }
      } else {
        if (devtools.open) {
          devtools.open = false;
          devtools.orientation = null;
          emitEvent(devtools);
        }
      }
    };

    const intervalId = setInterval(checkDevTools, 500);

    window.addEventListener("devtoolschange", (e) => {
      if (e.detail.open) {
        console.log("DevTools is open");
        // Add your code here to handle the event when the console is open
      } else {
        console.log("DevTools is closed");
        // Add your code here to handle the event when the console is closed
      }
    });

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("devtoolschange", checkDevTools);
    };
  }, []);

  return null;
};

export default DevToolsDetector;
