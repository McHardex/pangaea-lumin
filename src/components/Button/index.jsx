import styles from "./Button.module.css";

const Button = ({
  handleClick,
  btnText,
  width,
  variant = "primary",
  ...rest
}) => {
  return (
    <button
      className={variant === "primary" ? styles.primary : styles.secondary}
      onClick={handleClick}
      type="button"
      style={{ width: width }}
      {...rest}
    >
      {btnText}
    </button>
  );
};

export default Button;
