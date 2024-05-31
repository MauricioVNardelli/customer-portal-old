import { TopbarInfo } from "./outlet/topbar-info";
import { TopbarUser } from "./outlet/topbar-user";

export function Topbar() {
  return (
    <div id="component-topbar" className="flex w-full items-center px-4 bg-gray-800">
      <div className="w-4/5">
        <TopbarInfo />
      </div>
      <div className="flex w-1/5 justify-end">
        <TopbarUser />
      </div>      
    </div>
  )
}