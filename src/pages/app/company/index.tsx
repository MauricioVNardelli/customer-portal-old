import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";

import { CompanyAPI } from "@/api/company";
import { PageLayout } from "@/components/layout/page-layout";
import { Table, dataHeaderTable } from "@/components/table";
import { IResponseArrayErrorData, ICompany } from "@/lib/definitions";
import { AppContext } from "@/contexts/app-context";
import { Navigate } from "react-router-dom";

export function Company() {
  const [data, setData] = useState<ICompany[]>();
  const [error, setError] = useState("");
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (error) setError("");

    if (user?.role == "ADMIN") {
      const userAPI = new CompanyAPI();
      userAPI
        .GetAll()
        .then((value) => {
          setData(value);
        })
        .catch((err: AxiosError) => {
          let errorMessage = err.code + " - " + err.message;

          if (err.response?.data) {
            const errData = err.response.data as IResponseArrayErrorData;

            errorMessage += " - Error: " + errData.message[0].message;
          }

          setError(errorMessage);
        });
    }
  }, []);

  if (user?.role == "ADMIN")
    return (
      <PageLayout title="EMPRESA">
        {data ? (
          <Table dataHeader={headerFields} dataValues={data} />
        ) : (
          <p className="dark:text-gray-200">
            {error ? error : "Carregando..."}
          </p>
        )}
      </PageLayout>
    );

  return <Navigate to={`/app/company/view/${user?.companyId}`} />;
}

const headerFields: dataHeaderTable[] = [
  { field: "name", headerName: "Nome" },
  { field: "cnpj", headerName: "CNPJ" },
  { field: "code", headerName: "Código" },
];
