import clsx from "clsx";

export type THeaderColumn = {
  fieldName: string;
  title: string;
};

export interface ITableHeaderProps {
  columns: THeaderColumn[];
  hasDelete?: boolean;
}

export function Header(props: ITableHeaderProps) {
  return (
    <thead className="border-y dark:border-gray-500 dark:bg-gray-900">
      <tr className="h-10">
        {props.columns.map((column) => {
          return (
            <th
              key={column.fieldName}
              className={clsx(
                "text-start pl-4 font-semibold dark:text-gray-300"
              )}
            >
              {column.title}
            </th>
          );
        })}
        {props.hasDelete && <th className="w-14" />}
      </tr>
    </thead>
  );
}
