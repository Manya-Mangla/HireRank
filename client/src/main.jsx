import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // or App.css, wherever your styles live

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
