import clsx from "clsx";
import { Button } from "../button";

type FormButtonPaletteProps = {
  isSubmitting: boolean;
  className?: string;
};

export function FormButtonPalette(props: FormButtonPaletteProps) {
  return (
    <div className={clsx("flex flex-col mt-4", props.className)}>
      <div className="border-t w-full pb-4 dark:border-t-gray-600" />

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoaling={props.isSubmitting}
          disabled={props.isSubmitting}
          isDefaultStyle
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
