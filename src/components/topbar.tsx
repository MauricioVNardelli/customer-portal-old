import { IconMoon, IconSun } from "@tabler/icons-react";
import { useState } from "react";

export function Topbar() {
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
      <h1 className="ml-5 text-base text-white">
        COOPERATIVA DE TRANSPORTE DE CARGA LTDA
      </h1>
      <button onClick={handleButtonDarkMode} className="mr-5 text-white">
        {isDarkMode ? (
          <IconSun onClick={handleButtonDarkMode} />
        ) : (
          <IconMoon onClick={handleButtonDarkMode} />
        )}
      </button>
    </header>
  );
}
