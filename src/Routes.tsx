import { createBrowserRouter, type RouteObject, Navigate } from "react-router-dom";
import RootLayout from "./pages/root";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import FavoritesPage from "./pages/favoritesPage";
import UserDetailPage, { userLoader } from "./pages/UserDetailPage";
import UserPosts from "./pages/UserPosts";
import UserAlbums, { userAlbumsLoader } from "./pages/UserAlbums";
import UserTodos, { userTodosLoader } from "./pages/UserTodos";
import { userPostsLoader } from "./pages/UserPosts";
import UserPostDetail, { postLoader } from "./pages/PostDetailPage";
import AlbumDetailPage, { albumLoader } from "./pages/AlbumDetailPage";
import { usersLoader } from "./pages/UsersPage";





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
                    { index: true, element: <Navigate to="posts" replace /> },
                    { path: "posts", element: <UserPosts />,
                        loader: userPostsLoader,
                        children: [
                            { path: ":postId", element: <UserPostDetail />, loader: postLoader },
                        ] 
                    },
                    { path: "albums", element: <UserAlbums />,
                        loader: userAlbumsLoader,
                        children: [
                            { path: ":albumId", element: <AlbumDetailPage />, loader: albumLoader },
                        ]
                    },
                    { path: "todos", element: <UserTodos />, loader: userTodosLoader },
                ]
            },
        ],
    },
];

export const router = createBrowserRouter(routes);