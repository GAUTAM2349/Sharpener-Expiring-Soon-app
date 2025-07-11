import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./src/components/Header/Navbar";
import Home from "./src/components/Home/Home";
import AddProduct from "./src/components/Product/AddProduct";
import EditProduct from "./src/components/Product/EditProduct";
import CategoryProducts from "./src/components/Home/CategoryProducts";
import { registerPush } from "./utils/registerPush";
import Login from "./src/components/Authentication/Login";


const AppLayout = () => {
  useEffect(() => {
    registerPush();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/add-product', element: <AddProduct /> },
      { path: '/edit-product', element: <EditProduct /> },
      { path: '/categories/:categoryName', element: <CategoryProducts /> }
    ]
  },
  {
    path: 'login',
    element: <Login/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
