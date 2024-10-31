import { SchedulingAPI } from "@/api/scheduling";
import { PageLayout } from "@/components/layout/page-layout";
import { Table } from "@/components/table";
import { THeaderColumn } from "@/components/table/table-head";
import { IScheduling } from "@/lib/definitions";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function SchedulingPage() {
  const [data, setData] = useState<IScheduling[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) setError("");

    const contractAPI = new SchedulingAPI();
    contractAPI
      .GetAll()
      .then((value) => {
        setData(value);
      })
      .catch((err: AxiosError) => {
        const errorMessage: string = err.code + " - " + err.message;

        setError(errorMessage);
      });
  }, []);

  return (
    <PageLayout title="AGENDAMENTO DE PATIO">
      <Table columns={headerFields} data={data} />
    </PageLayout>
  );
}

const headerFields: THeaderColumn[] = [
  { fieldName: "type", title: "Tipo" },
  { fieldName: "date", title: "Data" },
  { fieldName: "carrier_name", title: "Transportadora" },
  { fieldName: "carriger_plate", title: "Veículo" },
  { fieldName: "container_code", title: "Container" },
  { fieldName: "container_type", title: "Tipo" },
  { fieldName: "type_load", title: "Carga" },
  { fieldName: "demurrage", title: "Demurrage" },
];
