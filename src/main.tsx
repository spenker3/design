import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./design/index.css";
import "./site/site.css";
import "./site/templates/templates.css";
import { App } from "./site/App";
import { ToastProvider } from "./components/Toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);
