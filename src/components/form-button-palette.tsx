import { Button } from "@mantine/core";

type FormButtonPaletteProps = {
  isSubmitting: boolean,
  className?: string
}

export function FormButtonPalette(props: FormButtonPaletteProps) {  
  return(
    <div className={"flex flex-col mt-4 " + props.className}>
      <div className="border-t w-full pb-4" />
  
      <div className="">
        <Button
          type="submit" 
          loading={props.isSubmitting} 
          loaderProps={{ type: 'dots' }} 
          className="w-full bg-gray-800 hover:bg-gray-700"
          disabled={props.isSubmitting}
        >
          Salvar
        </Button>      
      </div>
    </div>
  )
}