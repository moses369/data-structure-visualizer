import React from "react";
import type { BtnClickEvent } from "../types/util";
import type { AppContextTypes } from "../context/AppContextProvider";
import { AppContext } from "../context/AppContextProvider";

interface OptionInputProps {
  className?: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: React.HTMLInputTypeAttribute;
  labelText: string;
  disabled?:boolean;
}

const OptionInput = ({
  className,
  value,
  type,
  onChange,
  name,
  labelText,
  disabled
}: OptionInputProps) => {
  const { animationInProgress } = React.useContext(
    AppContext
  ) as AppContextTypes;
  if (name.includes(" "))
    throw new Error("No whitespace allowes use _ instead");
  return (
    <>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        name={name}
        disabled={animationInProgress || disabled}
        onChange={onChange}
        value={value}
        className={className}
      />
    </>
  );
};

export default OptionInput;
