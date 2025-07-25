import { useLoaderData, Link, Outlet, useParams, type LoaderFunctionArgs } from "react-router-dom";

interface UserProps {
    id: number;
    name: string;
    email: string;
    username: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userLoader = async ({ params }: LoaderFunctionArgs) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`);
    const user = await response.json();
    return user;
};

function UserDetailPage() {
    const user = useLoaderData() as UserProps;
    const { userId } = useParams();
    return (
        <>
            <h2>{user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <nav>
                <ul>
                    <li>  
                        <Link to={`/users/${userId}/posts`}>Posts</Link>
                    </li>
                    <li>
                        <Link to={`/users/${userId}/albums`}>Albums</Link>
                    </li>
                    <li>
                        <Link to={`/users/${userId}/todos`}>Todos</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default UserDetailPage;