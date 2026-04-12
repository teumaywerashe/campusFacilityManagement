import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreContextProvider } from "./context/store";

createRoot(document.getElementById("root")!).render(
  <StoreContextProvider>
    <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
  </StoreContextProvider>
  
);
