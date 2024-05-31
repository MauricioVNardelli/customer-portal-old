import { PageLayout } from "@/components/page";
//import { CardValue1, CardValue2, CardValue3, CardValue4 } from "./card-value";
//import { CardGraph1, CardGraph2 } from "./card-graph";

export function Dashboard() {
  return (
    <PageLayout>
      <div className="grid grid-rows-6 gap-4 max-w-72 md:max-w-full md:grid-cols-2 md:grid-rows-none 2xl:grid-cols-4">
        <h1>DASHBOARD</h1>
      </div>      
    </PageLayout>
  )
}