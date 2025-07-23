import { createBrowserRouter, type RouteObject } from "react-router-dom";
import RootLayout from "./pages/root";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import FavoritesPage from "./pages/favoritesPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "users", element: <UsersPage /> },
            { path: "favorites", element: <FavoritesPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes);