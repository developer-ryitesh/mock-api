import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./app/app.tsx";
import { Toaster as Snackbar } from "sonner";
import { BrowserRouter } from "react-router";
import ReduxProvider from "./libs/redux/providers/index.tsx";
import Logger from "./libs/logger";

(globalThis as any).Logger = Logger;
createRoot(document.getElementById("root")!).render(
   <ReduxProvider>
      <BrowserRouter>
         <App />
         <Snackbar position="top-right" />
      </BrowserRouter>
   </ReduxProvider>
);
