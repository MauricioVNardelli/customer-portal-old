import { MaskitoMask } from "@maskito/core";
import { typeMask } from "./definitions";

export function getMask(prValueType: typeMask): MaskitoMask {
  let maskArr: MaskitoMask = [];

  switch(prValueType) {
    case "cep":
      maskArr = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      break;
    case "cpf":
      maskArr = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
      break;
    case "cnpj":
      maskArr = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
      break;
    case "cel":
      maskArr = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      break;
    case "tel":
      maskArr = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      break;
  }

  return maskArr;
}