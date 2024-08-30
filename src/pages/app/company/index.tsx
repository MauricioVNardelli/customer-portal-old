import { CompanyAPI } from "@/api/company";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";
import { PageLayout } from "@/components/layout/page-layout";
import { Table, dataHeaderTable } from "@/components/table";
import { IResponseErrorData, ICompany } from "@/lib/definitions";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function Company() {
  const [data, setData] = useState<ICompany[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) setError("");

    const userAPI = new CompanyAPI();
    userAPI
      .GetAll()
      .then((value) => {
        setData(value);
      })
      .catch((err: AxiosError) => {
        let errorMessage: string = err.code + " - " + err.message;

        if (err.response?.data) {
          const errData = err.response.data as IResponseErrorData;

          errorMessage += " - Error: " + errData.error;
        }

        setError(errorMessage);
      });
  }, []);

  return (
    <PageLayout title="EMPRESA">
      <PageButtonPalette
        buttons={[
          { name: "Incluir", color: "gray", src: "/app/company/view/" },
        ]}
      />
      {data ? (
        <Table dataHeader={headerFields} dataValues={data} />
      ) : (
        <p className="dark:text-gray-200">{error ? error : "Carregando..."}</p>
      )}
    </PageLayout>
  );
}

const headerFields: dataHeaderTable[] = [
  { field: "code", headerName: "Código" },
  { field: "name", headerName: "Nome" },
  { field: "cnpj", headerName: "CNPJ" },
];
