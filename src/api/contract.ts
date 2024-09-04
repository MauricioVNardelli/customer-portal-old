import { IContract } from "@/lib/definitions";

//const path = "/contract";

export class ContractAPI {
  constructor() {
    //
  }

  async GetAll(): Promise<IContract[]> {
    //const response = await api.get(path);

    const data = [] as IContract[];

    for (let i = 0; i < 5; i++) {
      data.push({
        id: i.toString(),
        dateIssue: new Date().toString(),
        documentNumber: "2758" + i,
        documentSeries: i.toString(),
        motoristName: "MOTORISTA DA SILA " + i,
        documentPdfBase64: "",
      });
    }

    return data;
  }
}
