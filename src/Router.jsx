import AnimalList from "./components/AnimalList/AnimalList";
import { BrowserRouter as Router, Switch, Routes, Route, Link, createBrowserRouter, Outlet } from "react-router-dom";
import  { FavouritesList }  from "./components/FavouritesList/FavouritesList";
import Sidebar from "./components/Header/Header";

const Layout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AnimalList />,
      },
      {
        path: "/favourites",
        element: <FavouritesList />,
      },
    ]
  },
]);
