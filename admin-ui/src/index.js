import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

const Element = document.getElementById("root");
const root = createRoot(Element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
