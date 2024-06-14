import { GetEnum } from "@/api/enums";
import { NativeSelect, NativeSelectProps } from "@mantine/core";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ISelectProps extends NativeSelectProps{
  typeName: "type_role",
  fieldName: string
}

export function MyFormSelect({ fieldName, typeName, ...otherProps }: ISelectProps) {
  const { register } = useFormContext();
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    GetEnum(typeName)
    .then((response) => {
      let values = [] as string[];

      response.forEach((el) => values.push(el.value));
      setData(values);
    })
  }, [])
  
  return (
    <NativeSelect
      data={data}
      {...register(fieldName)}
      {...otherProps}
    />
  )

  return (<></>)
}