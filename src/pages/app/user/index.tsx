import { GetUsers } from "@/api/users";
import { PageLayout } from "@/components/page";
import { Table, dataHeaderTable } from "@/components/table";
import { IUser } from "@/lib/definitions";
import { useEffect, useState } from "react";

export function User() {
  const [data, setData] = useState<IUser[]>();

  useEffect(() => {
    const users = GetUsers();
    
    users.then((value) => {
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
  { field: 'acess_profile', headerName: 'Perfil' },
  { field: 'name', headerName: 'Nome' },  
  { field: 'email', headerName: 'E-mail' }
];