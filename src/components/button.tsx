import cslx, { clsx } from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  isLoaling?: boolean;
  isDefaultStyle?: boolean;
}

export function Button({
  className,
  isLoaling,
  isDefaultStyle,
  ...otherProps
}: ButtonProps) {
  const vDefaultStyle = clsx(
    "w-28 h-9 rounded-md font-semibold text-sm",
    //colors
    "text-white bg-gray-800",
    //events
    "hover:bg-gray-700 active:bg-gray-500 active:shadow-inner"
  );

  if (isLoaling) {
    const vClassName =
      "h-3 w-3 bg-white rounded-full animate-bounce opacity-80";

    return (
      <button
        disabled={isLoaling}
        className={cslx(
          className,
          "disabled:opacity-60 disabled:cursor-wait",
          isDefaultStyle && vDefaultStyle
        )}
        {...otherProps}
      >
        <div className="flex gap-2 w-full h-full items-center justify-center">
          <div className={cslx(vClassName, "[animation-delay:-0.3s]")}></div>
          <div className={cslx(vClassName, "[animation-delay:-0.15s]")}></div>
          <div className={cslx(vClassName)}></div>
        </div>
      </button>
    );
  }

  return (
    <button
      className={cslx(isDefaultStyle && vDefaultStyle, className)}
      {...otherProps}
    >
      {otherProps.children}
    </button>
  );
}
