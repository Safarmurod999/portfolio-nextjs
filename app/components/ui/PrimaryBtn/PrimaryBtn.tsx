"use client";

const PrimaryBtn = ({ text, link, ariaLabel }: PrimaryBtnProps) => {
  return (
    <div className="primary-btn">
      <a href={link} aria-label={ariaLabel}>
        {text}
      </a>
    </div>
  );
};

export default PrimaryBtn;
