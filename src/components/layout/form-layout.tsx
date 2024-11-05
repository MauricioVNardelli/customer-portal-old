import { Modal } from "@mantine/core";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

type FormLayoutProps = {
  children: React.ReactNode;
  messageError?: string;
  funcClearError?: (prValue: string) => void;
  title?: string;
  isSonTabpage?: boolean;
};

export function FormLayout(props: FormLayoutProps) {
  const { formState } = useFormContext();

  if (formState.isLoading)
    return (
      <div>
        <p className="dark:text-white">Carregando...</p>
      </div>
    );

  return (
    <div
      id="form-layout"
      className="flex h-full justify-center shadow-sm dark:bg-gray-900 dark:shadow-gray-950"
    >
      <div
        className={clsx(
          "flex flex-col items-center w-full rounded-t-md",
          !props.isSonTabpage && "border",
          //dark
          "dark:border-gray-600"
        )}
      >
        {!props.isSonTabpage && (
          <div
            className={clsx(
              "flex w-full border-b h-10 items-center px-4 rounded-t-md",
              //colors
              "text-white bg-gray-800",
              //dark
              "dark:drop-shadow-md dark:border-b-gray-600"
            )}
          >
            {props.title}
          </div>
        )}

        <div
          id="form-layout-child"
          className="w-full p-4 transition-all duration-700 lg:w-4/5 xl:w-3/5"
        >
          {props.children}
        </div>
      </div>

      <Modal
        opened={props.messageError != undefined && props.messageError != ""}
        onClose={() => {
          if (props.funcClearError) props.funcClearError("");
        }}
        withCloseButton={false}
      >
        {props.messageError}
      </Modal>
    </div>
  );
}
