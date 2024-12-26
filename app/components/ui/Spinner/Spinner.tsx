import cx from "classnames";

const Spinner = ({ className = "", position = "center", md }: SpinnerProps) => {
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

export default Spinner;
