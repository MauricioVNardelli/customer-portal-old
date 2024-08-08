import {
  CardAreaChart,
  CardBarChart,
  CardDonutChart,
  CardValue,
} from "@/components/card";
import { PageLayout } from "@/components/layout/page-layout";

export function Dashboard() {
  return (
    <PageLayout>
      <div className="grid grid-rows-4 gap-4 md:max-w-full md:grid-cols-2 md:grid-rows-none xl:grid-cols-4">
        <CardValue title="Exemplo 1" value={200.32} />
        <CardValue title="Exemplo 2" value={1200.5} />
        <CardValue title="Exemplo 3" value={45758.21} />
        <CardValue title="Exemplo 4" value={148.4} />

        <CardAreaChart
          title="Exemplo 5"
          data={data}
          className="md:col-span-2"
        />
        <CardBarChart title="Exemplo 6" data={data} className="" />
        <CardDonutChart title="Exemplo 7" data={dataDonut} className="" />
      </div>
    </PageLayout>
  );
}

const data = [
  {
    date: "Jan",
    faturamento: 25600.58,
  },
  {
    date: "Fev",
    faturamento: 84230.6,
  },
  {
    date: "Mar",
    faturamento: 55471.5,
  },
  {
    date: "Abr",
    faturamento: 84230.2,
  },
  {
    date: "Mai",
    faturamento: 68543.88,
  },
];

const dataDonut = [
  {
    name: "Cliente 1",
    value: 25600.58,
    color: "indigo.6",
  },
  {
    name: "Cliente 2",
    value: 84230.6,
    color: "yellow.6",
  },
  {
    name: "Cliente 3",
    value: 55471.5,
    color: "teal.6",
  },
  {
    name: "Cliente 4",
    value: 84230.2,
    color: "gray.6",
  },
  {
    name: "Cliente 5",
    value: 68543.88,
    color: "pink",
  },
];
