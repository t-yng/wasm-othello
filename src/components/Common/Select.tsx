import { useState, FC } from "react";
import { SelectMenu, SelectMenuItem, SelectMenuProps } from "evergreen-ui";
import { css } from "../../style/styles";
import { SelectButton } from "./SelectButton";

export interface SelectProps extends Omit<SelectMenuProps, "children"> {
  text?: string;
}

interface ButtonStyleProps {
  width?: string | number;
}

const makeButtonStyle = (props: ButtonStyleProps) =>
  css({
    width: props.width,
  });

export const Select: FC<SelectProps> = ({
  hasFilter = false,
  hasTitle = false,
  options = [],
  selected,
  onSelect,
  text = "選択",
  ...others
}) => {
  const buttonStyle = makeButtonStyle({
    width: others.width === null ? undefined : others.width,
  });

  const [selectedItem, setSelected] = useState<SelectMenuItem | undefined>(
    options.find((item) => item.value === selected)
  );

  const handleSelect = (item: SelectMenuItem) => {
    setSelected(item);
    if (onSelect != null) {
      onSelect(item);
    }
  };

  return (
    <SelectMenu
      hasFilter={false}
      hasTitle={false}
      options={options}
      selected={selectedItem?.value?.toString()}
      onSelect={handleSelect}
      {...others}
    >
      <SelectButton css={buttonStyle} text={selectedItem?.label ?? text} />
    </SelectMenu>
  );
};
