import { createBrowserRouter, type RouteObject } from "react-router-dom";
import RootLayout from "./pages/root";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import FavoritesPage from "./pages/favoritesPage";
import { usersLoader } from "./loaders/usersLoader";
import UserDetailPage, { userLoader } from "./pages/userDetailPage";
import UserPosts from "./pages/UserPosts";
import UserAlbums from "./pages/UserAlbums";
import UserTodos from "./pages/UserTodos";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { 
                path: "users", element: <UsersPage />, 
                loader: usersLoader 
            },
            { path: "favorites", element: <FavoritesPage /> },
            { path: "users/:userId", element: <UserDetailPage />,
                loader: userLoader,
                children: [
                    { path: "posts", element: <UserPosts /> },
                    { path: "albums", element: <UserAlbums /> },
                    { path: "todos", element: <UserTodos /> },
                ]
            },
        ],
    },
];

export const router = createBrowserRouter(routes);