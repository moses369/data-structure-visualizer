import React from "react";

interface OptionFormProps {
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  Button: JSX.Element;
  Input: JSX.Element;
}
const OptionForm = ({
  className,
  onSubmit,
  Button,
  Input,
}: OptionFormProps) => {
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {Button}
      {Input}
    </form>
  );
};

export default OptionForm;
