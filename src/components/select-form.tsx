import { NativeSelect, NativeSelectProps } from "@mantine/core";
import { useFormContext } from "react-hook-form";

interface ISelectProps extends NativeSelectProps {
  fieldName: string;
  isRequired?: boolean;
}

export function SelectForm({ fieldName, ...otherProps }: ISelectProps) {
  const { register } = useFormContext();

  return <NativeSelect {...register(fieldName)} {...otherProps} />;
}
