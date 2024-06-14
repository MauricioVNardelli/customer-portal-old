import { GetUsers } from "@/api/users";
import { PageButtonPalette } from "@/components/page-buttons-palette";
import { PageLayout } from "@/components/page-layout";
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
      <PageButtonPalette buttons={[ { name: "Incluir", color: "gray", src: '/app/user/view/' } ]} />
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
  { field: 'role', headerName: 'Perfil' },
  { field: 'name', headerName: 'Nome' },  
  { field: 'email', headerName: 'E-mail' }
];