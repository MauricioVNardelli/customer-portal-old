import { ContractAPI } from "@/api/contract";
import { PageLayout } from "@/components/layout/page-layout";
import { Table, dataHeaderTable } from "@/components/table";
import { IContract } from "@/lib/definitions";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function Contract() {
  const [data, setData] = useState<IContract[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) setError("");

    const contractAPI = new ContractAPI();
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
    <PageLayout title="RECIBO DE REPASSE">
      {data ? (
        <Table dataHeader={headerFields} dataValues={data} />
      ) : (
        <p className="dark:text-gray-200">{error ? error : "Carregando..."}</p>
      )}
    </PageLayout>
  );
}

const headerFields: dataHeaderTable[] = [
  { field: "dateIssue", headerName: "Emissão" },
  { field: "motoristName", headerName: "Motorista" },
  { field: "documentNumber", headerName: "Número" },
  { field: "documentSeries", headerName: "Série" },
  { field: "", headerName: "PDF", icon: "printer" },
];
