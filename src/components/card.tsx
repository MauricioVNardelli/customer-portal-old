import clsx from "clsx";
import { AreaChart, BarChart, DonutChart } from "@mantine/charts";
import { ChartNoAxesCombinedIcon } from "lucide-react";

interface ICardValue {
  title?: string;
  value: number;
}

interface ICardAreaChart {
  title?: string;
  data: any[];
  className?: string;
}

interface ICardChartLayout {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function CardValue(props: ICardValue) {
  const formattedValue = props.value.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  return (
    <div
      id="card"
      className="flex flex-col border duration-300 dark:border-slate-600 rounded-lg h-40 p-4 shadow-sm md:w-full dark:bg-slate-900"
    >
      <div id="card-title" className="flex flex-row justify-between">
        <h1 className="left text-sm dark:text-white">{props.title}</h1>
        <ChartNoAxesCombinedIcon
          className="text-slate-400 size-7"
          strokeWidth="1"
        />
      </div>

      <div
        id="card-content"
        className="flex flex-row h-full items-center justify-between dark:text-white"
      >
        <p className="text-slate-400 text-xl mt-6 ">R$</p>
        <p className="font-semibold text-5xl">{formattedValue}</p>
      </div>
    </div>
  );
}

function CardChartLayout(props: ICardChartLayout) {
  return (
    <div
      id="card"
      className={clsx(
        "flex flex-col border duration-300 dark:border-slate-600 rounded-lg min-w-64 h-64 p-4 shadow-sm md:w-full dark:bg-slate-900",
        props.className
      )}
    >
      <div
        id="card-title"
        className="flex flex-row justify-between min-h-10 dark:text-white"
      >
        <h1 className="left text-sm">{props.title}</h1>
        <ChartNoAxesCombinedIcon
          className="text-slate-400 size-7"
          strokeWidth="1"
        />
      </div>

      <div id="card-content" className="h-full items-center justify-center">
        {props.children}
      </div>
    </div>
  );
}

export function CardAreaChart(props: ICardAreaChart) {
  return (
    <CardChartLayout title={props.title} className={props.className}>
      <AreaChart
        className="w-full h-full"
        data={props.data}
        dataKey="date"
        series={[{ name: "faturamento", label: "Valor", color: "pink" }]}
        curveType="linear"
        gridAxis="x"
      />
    </CardChartLayout>
  );
}

export function CardBarChart(props: ICardAreaChart) {
  return (
    <CardChartLayout title={props.title} className={props.className}>
      <BarChart
        className="w-full h-full"
        data={props.data}
        dataKey="date"
        series={[{ name: "faturamento", label: "Valor", color: "pink" }]}
        tickLine="y"
      />
    </CardChartLayout>
  );
}

export function CardDonutChart(props: ICardAreaChart) {
  return (
    <CardChartLayout title={props.title} className={props.className}>
      <DonutChart className="w-full h-full" data={props.data} />
    </CardChartLayout>
  );
}
