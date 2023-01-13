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
}

const OptionInput = ({
  className,
  value,
  type,
  onChange,
  name,
}: OptionInputProps) => {
  const { animationInProgress } = React.useContext(
    AppContext
  ) as AppContextTypes;
  if(name.includes(' ')) throw new Error('No whitespace allowes use _ instead')
  return (
    <>
      <label htmlFor={name}>{name.replace("_", " ")}</label>
      <input
        type={type}
        name={name}
        disabled={animationInProgress}
        onChange={onChange}
        value={value}
        className={className}
      />
    </>
  );
};

export default OptionInput;
