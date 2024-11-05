import { MaskitoMask } from "@maskito/core";
import { typeMask } from "./constants";
import { AxiosError } from "axios";
import { IAPIResponse, IResponseErrorData } from "./definitions";

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

export function TreatError(prError: unknown): IAPIResponse {
  let errorMessage = "Erro não definido";

  if (prError instanceof AxiosError)
    errorMessage = prError.response?.data.message;
  else if (prError instanceof Error) errorMessage = prError.message;
  else {
    const error = prError as IResponseErrorData;
    errorMessage = error.message;
  }

  return {
    sucess: false,
    message: errorMessage,
  };
}
