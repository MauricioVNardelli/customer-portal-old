import { Body, ITableBodyProps } from "./table-body";
import { Header, ITableHeaderProps } from "./table-head";

export interface ITableProps extends ITableHeaderProps, ITableBodyProps {}

export function Table({
  hasView = true,
  hasDelete = false,
  ...otherProps
}: ITableProps) {
  if (!otherProps.data) return <p className="dark:text-white">Carregando...</p>;

  return (
    <table className="w-full">
      <Header columns={otherProps.columns} hasDelete={hasDelete} />
      <Body hasDelete={hasDelete} hasView={hasView} {...otherProps} />
    </table>
  );
}
