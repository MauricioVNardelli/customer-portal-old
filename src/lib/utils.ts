import { MaskitoMask } from "@maskito/core";
import { typeMask } from "./definitions";

export function GetMask(prValueType: typeMask): MaskitoMask {
  let maskArr: MaskitoMask = [];

  switch (prValueType) {
    case "cep":
      maskArr = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
      break;
    case "cpf":
      maskArr = [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ];
      break;
    case "cnpj":
      maskArr = [
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ];
      break;
    case "cel":
      maskArr = [
        "(",
        /\d/,
        /\d/,
        ")",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
      break;
    case "tel":
      maskArr = [
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
      break;
  }

  return maskArr;
}

export function FormatDate(prData: Date): string {
  return prData.toLocaleDateString("pt-BR");
}
