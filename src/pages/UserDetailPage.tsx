import { useLoaderData, Outlet, useParams, useNavigate, useLocation, type LoaderFunctionArgs } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, AtSign } from "lucide-react";

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

    const handleTabSelect = (tab: string) => {
        if (tab && userId) {
            navigate(`/users/${userId}/${tab}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* User Info Card */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{user.name}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1">
                                    <AtSign className="h-4 w-4" />
                                    {user.username}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </span>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            
            {/* Tabs */}
            <Tabs value={getActiveTab()} onValueChange={handleTabSelect} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="albums">Albums</TabsTrigger>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                </TabsList>
                <TabsContent value={getActiveTab()} className="mt-6">
                    <Outlet />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default UserDetailPage;