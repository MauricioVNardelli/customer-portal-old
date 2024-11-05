import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";

interface ITrigger
  extends Tabs.TabsTriggerProps,
    React.RefAttributes<HTMLButtonElement> {}

export function TabTrigger({ _className, ...otherProps }: ITrigger) {
  return (
    <Tabs.Trigger
      className={clsx(
        "h-10 rounded-t-md px-4",
        "text-gray-500",
        "data-[state=active]:text-white data-[state=active]:bg-gray-800"
      )}
      {...otherProps}
    >
      {otherProps.children}
    </Tabs.Trigger>
  );
}
