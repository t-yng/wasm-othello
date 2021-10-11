import React from "react";
import { css } from "../../style/styles";
import { Button, CaretDownIcon, ButtonProps } from "evergreen-ui";
import { FC } from "react";

const buttonStyle = css({
  position: "relative",
  color: "#425a70 !important",
  justifyContent: "start !important",
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
  ({ text, className, ...others }, ref) => {
    return (
      <Button
        ref={ref}
        css={buttonStyle}
        className={`${className}`}
        {...others}
      >
        <span>{text}</span>
        <CaretDownIcon css={iconStyle} size={12} />
      </Button>
    );
  }
);
