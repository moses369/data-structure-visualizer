import React from "react";
import { AppContext } from "../context/AppContextProvider";
import type { AppContextTypes } from "../context/AppContextProvider";
interface OptionFormProps {
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  Button: JSX.Element;
  Input: JSX.Element;
  disabled?: boolean;
}
const OptionForm = ({
  className,
  onSubmit,
  disabled,
  Button,
  Input,
}: OptionFormProps) => {
  const { animationInProgress } = React.useContext(
    AppContext
  ) as AppContextTypes;
  return (
    <form
      aria-disabled={animationInProgress || disabled}
      className={className}
      onSubmit={(e) => {
        if (animationInProgress) return;
        e.preventDefault();
        onSubmit(e);
      }}
    >
      {Button}
      {Input}
    </form>
  );
};

export default OptionForm;
