import React from "react";
import type { BtnClickEvent } from "../types/util";
import type { AppContextTypes } from "../context/AppContextProvider";
import { AppContext } from "../context/AppContextProvider";

interface OptionButtonProps {
  className?: string;
  onClick?: (event?: BtnClickEvent) => void;
  text: string;
disabled?:boolean
}

const OptionButton = ({ className, onClick, text, disabled }: OptionButtonProps) => {
  const { animationInProgress } = React.useContext(
    AppContext
  ) as AppContextTypes;
  return (
    <button
      disabled={animationInProgress || disabled }
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  );
};

export default OptionButton;
