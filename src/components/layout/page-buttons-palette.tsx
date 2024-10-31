import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
        let color = "";

        switch (value.color) {
          case "gray":
            color = "bg-gray-800 hover:bg-gray-700";
            break;
          case "green":
            color = "";
            break;
        }

        return (
          <Button
            key={index}
            loaderProps={{ type: "dots" }}
            className={"w-28 " + color}
            onClick={() => buttonOnClick(value.src)}
          >
            {value.name}
          </Button>
        );
      })}
    </div>
  );
}
