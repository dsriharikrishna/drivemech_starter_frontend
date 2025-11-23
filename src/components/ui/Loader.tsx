"use client";

import React, { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    const styleId = "pulse-square-keyframes";

    // Prevent duplicate injection
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @keyframes pulseSquare {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.7);
            opacity: 0.6;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.square} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
  },
  square: {
    width: "40px",
    height: "40px",
    backgroundColor: "#EE511C",
    animation: "pulseSquare 0.8s infinite ease-in-out",
  },
};
