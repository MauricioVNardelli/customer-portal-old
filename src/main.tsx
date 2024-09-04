import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { AppProvider } from "./contexts/app-context.tsx";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </MantineProvider>
  </React.StrictMode>
);
