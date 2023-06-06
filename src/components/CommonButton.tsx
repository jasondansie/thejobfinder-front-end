import React from "react";
import classes from "./CommonButton.module.css";

interface ButtonProps {
  variant: "primary" | "secondary" | "alert" | "standard" | "small";
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

class CommonButton extends React.Component<ButtonProps> {
  render() {
    const {
      children,
      variant,
      className,
      type = "button",
      ...rest
    } = this.props;

    const variantClassName = classes[`Button-${variant}`];
    const classNames = [classes.Button, variantClassName];

    if (className) {
      classNames.push(className);
    }

    return (
      <button className={classNames.join(" ")} type={type} {...rest}>
        {children}
      </button>
    );
  }
}

export default CommonButton;
