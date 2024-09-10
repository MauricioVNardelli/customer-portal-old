import { Modal } from "@mantine/core";
import { useFormContext } from "react-hook-form";

type FormLayoutProps = {
  children: React.ReactNode;
  messageError?: string;
  funcClearError?: (prValue: string) => void;
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
    <div id="form-layout" className="w-full h-full flex justify-center">
      <div
        id="form-layout-child"
        className="w-full transition-all duration-700 lg:w-4/5 xl:w-3/5"
      >
        {props.children}
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
