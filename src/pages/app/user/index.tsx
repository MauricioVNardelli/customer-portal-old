import { UserAPI } from "@/api/users";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";
import { PageLayout } from "@/components/layout/page-layout";
import { Table, dataHeaderTable } from "@/components/table";
import { IResponseErrorData, IUser } from "@/lib/definitions";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

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
          const errData = err.response.data as IResponseErrorData;

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
      {data ? (
        <Table dataHeader={headerFields} dataValues={data} />
      ) : (
        <p className="dark:text-gray-200">{error ? error : "Carregando..."}</p>
      )}
    </PageLayout>
  );
}

const headerFields: dataHeaderTable[] = [
  { field: "role", headerName: "Perfil" },
  { field: "name", headerName: "Nome" },
  { field: "status", headerName: "Situação" },
  { field: "email", headerName: "E-mail" },
];
