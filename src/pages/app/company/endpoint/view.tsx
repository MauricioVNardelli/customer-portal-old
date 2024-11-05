import { FormLayout } from "@/components/layout/form-layout";
import { FormProvider, useForm } from "react-hook-form";
import { ICompanyEndpoint } from "@/lib/definitions";
import { CompanyEndpointAPI } from "@/api/company-endpoint";
import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { Select } from "@/components/select";
import { const_method, const_origin } from "@/lib/constants";
import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { THeaderColumn } from "@/components/table/table-head";

interface ICompanyEndpointViewProps {
  companyId: string;
}

const headerColumns: THeaderColumn[] = [
  { fieldName: "origin", title: "Origem" },
  { fieldName: "method", title: "Método" },
  { fieldName: "endpoint", title: "URL" },
];

export function CompanyEndpointView(props: ICompanyEndpointViewProps) {
  const api = new CompanyEndpointAPI();
  const form = useForm<ICompanyEndpoint>();

  //hooks
  const [error, setError] = useState<string>();
  const [data, setData] = useState<ICompanyEndpoint[]>();

  async function onSubmit(data: ICompanyEndpoint) {
    const response = await api.Create(props.companyId, data);

    if (!response.sucess) return setError(response.message);

    await refresh();
  }

  async function onRemoveEndpoint(prId: string) {
    const response = await api.Delete(prId);

    if (!response.sucess) return setError(response.message);

    await refresh();
  }

  async function refresh() {
    const result = await api.Get(props.companyId);

    setData(result);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <FormProvider {...form}>
      <FormLayout isSonTabpage messageError={error} funcClearError={setError}>
        <form
          id="form-viewuser"
          className="flex flex-col items-center mb-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-2 sm:grid-cols-2 w-full mt-4">
            <Select
              label="Origem"
              data={const_origin}
              {...form.register("origin")}
            />
            <Select
              label="Método"
              data={const_method}
              {...form.register("method")}
            />
            <Input
              label="URL"
              className="sm:col-span-2"
              {...form.register("endpoint")}
            />
          </div>

          <div className="flex justify-end w-full mt-4">
            <Button isLoaling={form.formState.isSubmitting} isDefaultStyle>
              Adicionar
            </Button>
          </div>
        </form>

        {data && (
          <Table
            columns={headerColumns}
            data={data}
            hasDelete
            onRemoveClick={onRemoveEndpoint}
          />
        )}
      </FormLayout>
    </FormProvider>
  );
}
