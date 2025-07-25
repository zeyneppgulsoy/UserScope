import { useLoaderData, Outlet, useParams, useNavigate, useLocation, type LoaderFunctionArgs } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';

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
    const navigate = useNavigate();
    const location = useLocation();
    
    // Determine active tab based on current path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path.includes('/posts')) return 'posts';
        if (path.includes('/albums')) return 'albums';
        if (path.includes('/todos')) return 'todos';
        return 'posts'; // default to posts tab
    };

    const handleTabSelect = (tab: string | null) => {
        if (tab && userId) {
            navigate(`/users/${userId}/${tab}`);
        }
    };

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <h2>{user.name}</h2>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
            </div>
            
            <Tabs
                activeKey={getActiveTab()}
                onSelect={handleTabSelect}
                id="user-detail-tabs"
                className="mb-3"
            >
                <Tab eventKey="posts" title="Posts">
                    <Outlet />
                </Tab>
                <Tab eventKey="albums" title="Albums">
                    <Outlet />
                </Tab>
                <Tab eventKey="todos" title="Todos">
                    <Outlet />
                </Tab>
            </Tabs>
        </div>
    );
}

export default UserDetailPage;