import React from "react";
import ReactDOM from "react-dom/client";
import "./shell/reset.css";
import { Shell } from "./shell/Shell";
import { resolveKit } from "./kits/registry";

document.documentElement.dataset.kit = resolveKit(localStorage.getItem("kit"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>,
);
