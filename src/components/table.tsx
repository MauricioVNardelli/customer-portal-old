import { Table as TableMantine } from '@mantine/core';

export type dataHeaderTable = {
  field: string,
  headerName: string,
  align?: 'right' | 'left' | 'center',
  width?: number,
}

interface ITableProps {
  dataHeader: dataHeaderTable[]
  dataValues: any[]
}

export function Table(props: ITableProps) {  
  const header = props.dataHeader.map((element) => (
    <TableMantine.Th key={element.field}>{element.headerName}</TableMantine.Th>
  ))

  const rows = props.dataValues.map((elValue) => (
    <TableMantine.Tr key={elValue['id']} className='hover:bg-sky-100'> 
      { 
        props.dataHeader.map((elHeader, index) => (      
          <TableMantine.Td key={index}>{elValue[elHeader.field]}</TableMantine.Td>     
        ))
      }
    </TableMantine.Tr>
  ))

  return(
    <div id='table-component' className='w-full'>
      <TableMantine striped>
        <TableMantine.Thead>
          <TableMantine.Tr>
            {header}
          </TableMantine.Tr>
        </TableMantine.Thead>
        <TableMantine.Tbody>
          {rows}
        </TableMantine.Tbody>
      </TableMantine>
    </div>
  )
}