import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

// ✅ Set backend base URL
axios.defaults.baseURL = "https://green-basket-ud3o.vercel.app/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);