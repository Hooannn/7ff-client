import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.less";
import { RouterProvider } from "react-router-dom";
import { store } from "./@core/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import getRouter from "./@core/router/index";
import "./libs/i18n";

const isDev = import.meta.env.VITE_NODE_ENV === "dev";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={getRouter(isDev)} />
    <ToastContainer />
  </Provider>
);
