"use client";

import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { SpinnerProps } from "@/app/types/types";

const Spinner = ({ className, position, md }: SpinnerProps) => {
  const classNames = cx(
    "spinner-wrap",
    position ? position : "",
    md ? "md" : "",
    className
  );
  return (
    <div className={classNames}>
      <div className="spinner" />
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf(["center", "start", "end", "full", "absolute"]),
};
Spinner.defaultProps = {
  className: "",
  position: "center",
};

export default Spinner;
