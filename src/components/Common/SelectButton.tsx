import React from "react";
import { css } from "@emotion/css";
import { Button, CaretDownIcon, ButtonProps } from "evergreen-ui";
import { FC } from "react";

const buttonStyle = css({
  position: "relative",
  paddingRight: 28,
  boxShadow:
    "0px 0px 0px rgba(16, 112, 202, 0.15), inset 0px -1px 1px rgba(67, 90, 111, 0.09)",
});

const iconStyle = css({
  position: "absolute",
  right: 8,
  fill: "#66788A",
});

export interface SelectButtonProps extends ButtonProps {
  text: string;
}

export const SelectButton: FC<SelectButtonProps> = React.forwardRef(
  ({ text, ...others }, ref) => {
    return (
      <Button ref={ref} className={buttonStyle} {...others}>
        <span>{text}</span>
        <CaretDownIcon className={iconStyle} size={12} />
      </Button>
    );
  }
);
