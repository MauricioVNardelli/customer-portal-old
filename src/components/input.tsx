import clsx from "clsx";
import { typeMask } from "@/lib/constants";
import { forwardRef } from "react";

interface IInputProps extends React.ComponentProps<"input"> {
  label?: string;
  mask?: typeMask;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(function (
  props,
  ref
) {
  const { className, errorMessage, ...otherProps } = props;

  if (props.label)
    return (
      <div className={clsx("flex flex-col", className)}>
        <p className="dark:text-gray-200">{props.label}</p>
        <input
          autoComplete="off"
          ref={ref}
          className={clsx(
            "rounded-md px-4 h-9 outline-none border border-solid border-gray-300 bg-white",
            //disable
            props.disabled && "text-gray-400 dark:text-gray-600",
            //event
            "focus:border-gray-800 dark:focus:border-gray-500",
            //dark
            "dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
          )}
          {...otherProps}
        />
        {errorMessage && (
          <p className="pt-2 pb-2 text-gray-300">{props.errorMessage}</p>
        )}
      </div>
    );

  return (
    <div className="flex flex-col">
      <input
        //autoComplete="off"
        ref={ref}
        className={clsx(
          "rounded-md px-4 border border-solid outline-none",
          "border-gray-800 text-gray-400 bg-slate-950",
          "focus:ring-1 focus:ring-purple-700 hover:ring-1 hover:ring-slate-800",
          className
        )}
        {...otherProps}
      />
      {errorMessage && (
        <p className="pt-2 pb-4 text-gray-300">{props.errorMessage}</p>
      )}
    </div>
  );
});
