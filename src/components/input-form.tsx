import { typeMask } from "@/lib/definitions";
import { GetMask } from "@/lib/utils";
import { TextInput, TextInputProps } from "@mantine/core";
import { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { useFormContext } from "react-hook-form";

interface IInputForm extends TextInputProps {
  fieldName: string;
  isRequired?: boolean;
  mask?: typeMask;
}

export function InputForm({ fieldName, mask, ...otherProps }: IInputForm) {
  const { register } = useFormContext();
  const { ref: refRegister, ...otherRefRegister } = register(fieldName);

  const digitsOnlyMask: MaskitoOptions = {
    mask: GetMask(mask),
  };

  const inputRef = useMaskito({ options: digitsOnlyMask });

  return (
    <TextInput
      ref={(el) => {
        refRegister(el);

        if (mask) inputRef(el);
      }}
      {...otherRefRegister}
      {...otherProps}
    />
  );
}
