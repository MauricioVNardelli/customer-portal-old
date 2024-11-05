import { useNavigate } from "react-router-dom";
import { Button } from "../button";

interface IButtonPallet {
  name: string;
  color: "green" | "gray";
  src: string;
}

type PageButtonPaletteProps = {
  buttons: IButtonPallet[];
};

export function PageButtonPalette(props: PageButtonPaletteProps) {
  const navigate = useNavigate();

  function buttonOnClick(prSrc: string) {
    navigate(prSrc);
  }

  return (
    <div className="pb-4">
      {props.buttons.map((value, index) => {
        return (
          <Button
            key={index}
            isDefaultStyle
            onClick={() => buttonOnClick(value.src)}
          >
            {value.name}
          </Button>
        );
      })}
    </div>
  );
}
