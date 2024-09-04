import { Modal } from "@mantine/core";

type FormLayoutProps = {
  children: React.ReactNode;
  messageError?: string;
  funcClearError?: (prValue: string) => void;
};

export function FormLayout(props: FormLayoutProps) {
  return (
    <div id="form-layout" className="w-full h-full flex justify-center">
      <div id="form-layout-child" className="w-full lg:w-4/5 xl:w-3/5">
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
