import { IScheduling } from "@/lib/definitions";

//const path = "/contract";

export class SchedulingAPI {
  constructor() {
    //
  }

  async GetAll(): Promise<IScheduling[]> {
    //const response = await api.get(path);

    const data = schedules;

    return data;
  }

  async Get(prId: string): Promise<IScheduling> {
    const response = schedules.filter((value) => {
      return value.id == prId;
    })[0];

    return response;
  }

  async Update(
    prData: IScheduling,
    prNewData: IScheduling
  ): Promise<IScheduling> {
    //const response = await api.get(path);

    const data = prNewData;

    return data;
  }

  async Create(prData: IScheduling): Promise<IScheduling> {
    //const response = await api.get(path);

    const data = prData;

    return data;
  }
}

const schedules: IScheduling[] = [
  {
    id: "1",
    type: "ENTRADA",
    date: "30/10/2024 08:30:00",
    control_number: "CTR-00123",
    cnpj: "12345678000199",
    carrier_cnpj: "22345678000188",
    carrier_name: "Transporte Alfa LTDA",
    carrier_motorist: "Carlos Silva",
    carriger_plate: "ABC-1234",
    container_type: "40HC",
    container_code: "CONT-8765",
    type_load: "CHEIO",
    demurrage: "2 dias",
    temperature: 4,
  },
  {
    id: "2",
    type: "SAIDA",
    date: "28/10/2024  10:15:00",
    control_number: "CTR-00456",
    cnpj: "23456789000155",
    carrier_cnpj: "33456789000177",
    carrier_name: "Logística Beta SA",
    carrier_motorist: "Ana Oliveira",
    carriger_plate: "DEF-5678",
    container_type: "20GP",
    container_code: "CONT-4321",
    type_load: "VAZIO",
    demurrage: "1 dia",
    temperature: 18,
  },
  {
    id: "3",
    type: "ENTRADA",
    date: "15/09/2024 13:45:00",
    control_number: "CTR-00789",
    cnpj: "34567890000133",
    carrier_cnpj: "44567890000122",
    carrier_name: "Transporte Gama ME",
    carrier_motorist: "Bruno Costa",
    carriger_plate: "GHI-9012",
    container_type: "40RF",
    container_code: "CONT-6789",
    type_load: "CHEIO",
    demurrage: "Nenhum",
    temperature: -5,
  },
  {
    id: "4",
    type: "SAIDA",
    date: "29/10/2024 15:00:00",
    control_number: "CTR-00234",
    cnpj: "45678901000122",
    carrier_cnpj: "55678901000144",
    carrier_name: "Expresso Delta LTDA",
    carrier_motorist: "Juliana Martins",
    carriger_plate: "JKL-3456",
    container_type: "20GP",
    container_code: "CONT-1111",
    type_load: "VAZIO",
    demurrage: "3 dias",
    temperature: 10,
  },
  {
    id: "5",
    type: "ENTRADA",
    date: "30/10/2024 17:30:00",
    control_number: "CTR-00321",
    cnpj: "56789012000111",
    carrier_cnpj: "66789012000155",
    carrier_name: "Transporte Epsilon SA",
    carrier_motorist: "Fernando Souza",
    carriger_plate: "MNO-7890",
    container_type: "40HC",
    container_code: "CONT-3333",
    type_load: "CHEIO",
    demurrage: "4 dias",
    temperature: 2,
  },
];
