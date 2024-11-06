import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";

import { CompanyAPI } from "@/api/company";
import { PageLayout } from "@/components/layout/page-layout";
import { IResponseArrayErrorData, ICompany } from "@/lib/definitions";
import { AppContext } from "@/contexts/app-context";
import { Navigate } from "react-router-dom";
import { Table } from "@/components/table";
import { THeaderColumn } from "@/components/table/table-head";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";

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
        <PageButtonPalette
          buttons={[
            { name: "Incluir", color: "gray", src: "/app/company/view" },
          ]}
        />
        <Table columns={headerFields} data={data} />
      </PageLayout>
    );

  return <Navigate to={`/app/company/view/${user?.companyId}`} />;
}

const headerFields: THeaderColumn[] = [
  { fieldName: "name", title: "Nome" },
  { fieldName: "cnpj", title: "CNPJ" },
  { fieldName: "code", title: "Código" },
];
