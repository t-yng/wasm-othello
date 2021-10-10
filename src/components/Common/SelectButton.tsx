import React from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Button, CaretDownIcon, ButtonProps } from "evergreen-ui";
import { FC } from "react";

const StyledButton = styled(Button)({
  color: "#425a70",
  position: "relative",
  display: "inline-flex",
  justifyContent: "start",
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
      <StyledButton ref={ref} className={className} {...others}>
        <span>{text}</span>
        <CaretDownIcon className={iconStyle} size={12} />
      </StyledButton>
    );
  }
);
