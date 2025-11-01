import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./app/app.tsx";
import { Toaster as Snackbar } from "sonner";
import { BrowserRouter } from "react-router";
import ReduxProvider from "./libs/redux/providers/index.tsx";


createRoot(document.getElementById("root")!).render(
   <ReduxProvider>
      <BrowserRouter>
         <App />
         <Snackbar position="top-right" />
      </BrowserRouter>
   </ReduxProvider>
);
