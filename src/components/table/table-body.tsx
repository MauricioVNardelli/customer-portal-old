import clsx from "clsx";
import { MouseEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconLoader, IconTrash } from "@tabler/icons-react";
import { THeaderColumn } from "./table-head";

export interface ITableBodyProps {
  columns: THeaderColumn[];
  data?: unknown[];
  hasView?: boolean;
  hasDelete?: boolean;
  onRemoveClick?: (prId: string) => Promise<void>;
}

export function Body(props: ITableBodyProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, setIsPending] = useState(false);
  const [pendingId, setPendingId] = useState("");

  function handleLineClick(event: MouseEvent<HTMLTableRowElement>) {
    event.preventDefault();

    navigate(`${location.pathname}/view/${event.currentTarget.id}`);
  }

  async function handleRemoveClick(prValue: any) {
    setPendingId(prValue["id"]);
    setIsPending(true);

    if (props.onRemoveClick) {
      await props.onRemoveClick(prValue["id"]);
      setIsPending(false);
    }
  }

  return (
    <tbody>
      {props.data &&
        props.data.map((value, index) => {
          return (
            <tr
              key={value["id"]}
              id={value["id"]}
              onDoubleClick={props.hasView ? handleLineClick : undefined}
              className={clsx(
                "h-8 border-b border-b-gray-200 hover:bg-gray-200",
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-slate-700"
                  : "dark:bg-slate-800",
                //dark
                "dark:border-b-gray-600 dark:hover:bg-slate-500/60",
                //
                "transition-colors "
              )}
            >
              {props.columns.map((column, index) => {
                return (
                  <td
                    key={index}
                    className="pl-4 text-gray-600 dark:text-gray-300"
                  >
                    {value[column.fieldName]}
                  </td>
                );
              })}
              {props.hasDelete && (
                <td className="flex justify-center p-2">
                  {isPending && value["id"] == pendingId ? (
                    <IconLoader className="animate-spin mr-1 text-gray-400" />
                  ) : (
                    <button onClick={() => handleRemoveClick(value)}>
                      <IconTrash className="text-end text-gray-400 hover:text-red-700" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          );
        })}
    </tbody>
  );
}
