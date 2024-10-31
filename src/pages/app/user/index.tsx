import { UserAPI } from "@/api/users";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";
import { PageLayout } from "@/components/layout/page-layout";
import { Table } from "@/components/table/index";
import { THeaderColumn } from "@/components/table/table-head";
import { IResponseArrayErrorData, IUser } from "@/lib/definitions";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const headerFields: THeaderColumn[] = [
  { fieldName: "role", title: "Perfil" },
  { fieldName: "name", title: "Nome" },
  { fieldName: "status", title: "Situação" },
  { fieldName: "email", title: "E-mail" },
];

export function User() {
  const [data, setData] = useState<IUser[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) setError("");

    const userAPI = new UserAPI();
    userAPI
      .GetAll()
      .then((value) => {
        setData(value);
      })
      .catch((err: AxiosError) => {
        let errorMessage: string = err.code + " - " + err.message;

        if (err.response?.data) {
          const errData = err.response.data as IResponseArrayErrorData;

          errorMessage += " - Error: " + errData.message[0].message;
        }

        setError(errorMessage);
      });
  }, []);

  return (
    <PageLayout title="USUÁRIO">
      <PageButtonPalette
        buttons={[{ name: "Incluir", color: "gray", src: "/app/user/view/" }]}
      />
      <Table columns={headerFields} data={data} />
    </PageLayout>
  );
}
