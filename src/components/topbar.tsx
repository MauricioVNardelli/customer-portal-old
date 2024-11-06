import { AppContext } from "@/contexts/app-context";
import { MoonIcon, SunIcon } from "lucide-react";
import { useContext, useState } from "react";

export function Topbar() {
  const { companyName } = useContext(AppContext);

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  function handleButtonDarkMode() {
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    if (!isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  return (
    <header
      id="top-bar"
      className="flex justify-between h-12 w-full items-center drop-shadow-md bg-gray-800"
    >
      <h1 className="ml-5 text-base text-white">{companyName}</h1>
      <button onClick={handleButtonDarkMode} className="mr-5 text-white">
        {isDarkMode ? (
          <SunIcon onClick={handleButtonDarkMode} />
        ) : (
          <MoonIcon onClick={handleButtonDarkMode} />
        )}
      </button>
    </header>
  );
}
