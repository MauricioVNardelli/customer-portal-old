import cslx from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  isLoaling?: boolean;
}

export function Button({ className, isLoaling, ...otherProps }: ButtonProps) {
  if (isLoaling) {
    const vClassName =
      "h-3 w-3 bg-white rounded-full animate-bounce opacity-80";

    return (
      <button
        disabled={isLoaling}
        className={cslx(className, "disabled:opacity-60 disabled:cursor-wait")}
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
    <button className={className} {...otherProps}>
      {otherProps.children}
    </button>
  );
}
