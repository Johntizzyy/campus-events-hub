import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import "./index.css";  // Ensure global styles exist

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
