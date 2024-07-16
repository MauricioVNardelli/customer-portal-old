import { ContractAPI } from "@/api/contract";
import { PageLayout } from "@/components/layout/page-layout";
import { Table, dataHeaderTable } from "@/components/table";
import { IContract } from "@/lib/definitions";
import { useEffect, useState } from "react";

export function Contract() {
  const [data, setData] = useState<IContract[]>();
  const contractAPI = new ContractAPI();

  useEffect(() => {
    const contracts = contractAPI.GetAll();
    
    contracts.then((value) => {
      setData(value)
    })
  }, []);

  return (
    <PageLayout>      
      { 
        data 
        ?
        <Table 
          dataHeader={headerFields} 
          dataValues={data}
        />
        :
        <p>Carregando...</p>
      }
    </PageLayout>
  )
}

const headerFields: dataHeaderTable[] = [
  { field: "dateIssue", headerName: "Emissão" },
  { field: "motoristName", headerName: "Motorista" },  
  { field: "documentNumber", headerName: "Número" },
  { field: "documentSeries", headerName: "Série" },
  { field: "", headerName: "PDF", icon: "printer" }
];