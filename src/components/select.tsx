import clsx from "clsx";
import { forwardRef } from "react";

interface ISelectProps extends React.ComponentProps<"select"> {
  label: string;
  data: Array<string>;
  errorMessage?: string;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(function (
  props,
  ref
) {
  const { className, errorMessage, data, ...otherProps } = props;

  return (
    <div className={clsx("flex flex-col", className)}>
      <p className="dark:text-gray-200">{props.label}</p>
      <select
        autoComplete="off"
        ref={ref}
        className={clsx(
          "rounded-md px-4 h-9 outline-none border border-solid border-gray-300 bg-white",
          //disable
          props.disabled &&
            "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400",
          //event
          "focus:border-slate-400 dark:focus:border-gray-500",
          //dark
          "dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
        )}
        {...otherProps}
      >
        {data.map((value) => {
          return <option key={value}>{value}</option>;
        })}
      </select>
      {errorMessage && (
        <p className="pt-2 pb-4 text-gray-300">{props.errorMessage}</p>
      )}
    </div>
  );
});
