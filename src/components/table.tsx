import { api } from '@/services/api';
import { Table as TableMantine } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export type dataHeaderTable = {
  field: string,
  headerName: string,
  align?: 'right' | 'left' | 'center',
  width?: number,
  icon?: 'printer'
}

interface ITableProps {
  dataHeader: dataHeaderTable[]
  dataValues: any[]
}

interface IResPrintClick {
  fileBase64: string
}

export function Table(props: ITableProps) {
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  function onDoubleClick(id: string) {    
    navigate(`${pathName}/view/${id}`);
  }

  async function onPrintClick() {
    const res = await api.get('/contract/pdf');
    const data = res.data as IResPrintClick;

    const pdfWindow = window.open();

    if (pdfWindow) {      
      pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(data.fileBase64) + "'></iframe>")
      pdfWindow.document.getElementsByTagName('body')[0].style.margin = '0px';
    }      
  }
  
  const header = props.dataHeader.map((element) => (
    <TableMantine.Th key={element.field}>{element.headerName}</TableMantine.Th>
  ))

  const rows = props.dataValues.map((elValue) => (
    <TableMantine.Tr 
      key={elValue['id']} 
      className='hover:bg-sky-100'
      onDoubleClick={() => onDoubleClick(elValue['id'])}
    > 
      { 
        props.dataHeader.map((elHeader, index) => (
          <TableMantine.Td key={index}>
            { 
              elHeader.icon
              ? <IconPrinter 
                  className='text-gray-700 cursor-pointer' 
                  onClick={onPrintClick}
                />
              : elValue[elHeader.field]
            }
          </TableMantine.Td>     
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