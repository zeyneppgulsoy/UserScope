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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
            <div className="container mx-auto px-4 py-6 sm:py-8">
                {/* User Info Card */}
                <Card className="mb-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
                                         <CardHeader>
                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                             <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full flex-shrink-0">
                                 <User className="h-6 w-6 text-white" />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <CardTitle className="text-xl sm:text-2xl dark:text-blue-100 break-words">{user.name}</CardTitle>
                                 <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 dark:text-blue-200">
                                     <span className="flex items-center gap-1 min-w-0">
                                         <AtSign className="h-4 w-4 flex-shrink-0" />
                                         <span className="truncate">@{user.username}</span>
                                     </span>
                                     <span className="flex items-center gap-1 min-w-0">
                                         <Mail className="h-4 w-4 flex-shrink-0" />
                                         <span className="truncate text-sm">{user.email}</span>
                                     </span>
                                 </CardDescription>
                             </div>
                         </div>
                     </CardHeader>
                </Card>
            
            {/* Tabs */}
            <Tabs value={getActiveTab()} onValueChange={handleTabSelect} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
                    <TabsTrigger value="posts" className="dark:text-blue-200 dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Posts</TabsTrigger>
                    <TabsTrigger value="albums" className="dark:text-blue-200 dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Albums</TabsTrigger>
                    <TabsTrigger value="todos" className="dark:text-blue-200 dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Todos</TabsTrigger>
                </TabsList>
                <TabsContent value={getActiveTab()} className="mt-6">
                    <Outlet />
                </TabsContent>
            </Tabs>
            </div>
        </div>
    );
}

export default UserDetailPage;