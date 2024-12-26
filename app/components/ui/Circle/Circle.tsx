"use client";

import React, { useEffect } from "react";
import { RiDownloadLine } from "react-icons/ri";

const Circle = ({ text, link, id }: CircleProps) => {
  useEffect(() => {
    const el = document.getElementById(id);
    const texture = el?.querySelector(".circle__inner");
    const deg = 360 / text.length;
    let origin = 0;
    text.split("").forEach((ea) => {
      ea = `<p style='height:${80}px;transform:rotate(${Math.round(
        origin
      )}deg);transform-origin:0 100%'>${ea}</p>`;
      if (texture) {
        texture.innerHTML += ea;
        origin += deg;
      }
    });
  });
  return (
    <a
      aria-label="download"
      className="circle"
      href={link}
      download="SafarmurodUrinov"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="circle__wrapper">
        <div className="circle__text" id={id}>
          <div className="circle__inner"></div>
        </div>
      </div>
      <div className="circle__logo">
        <RiDownloadLine />
      </div>
    </a>
  );
};

export default Circle;
