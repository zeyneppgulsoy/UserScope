import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, ArrowRight } from "lucide-react";

interface UserProps {
  id: number;
  name: string;
  email: string;
  username: string;
  website: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const usersLoader  = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
};

function UsersPage() {
  const users = useLoaderData() as UserProps[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
            Users Directory
          </h1>
          <p className="text-gray-700 dark:text-blue-200 text-lg font-medium">
            Discover and connect with {users.length} users in our community
          </p>
        </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg dark:text-blue-100">{user.name}</CardTitle>
                </div>
                <CardDescription className="flex items-center gap-2 dark:text-blue-200">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-700 dark:text-blue-200">
                    <span className="font-semibold dark:text-blue-100">Username:</span> @{user.username}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-blue-200">
                    <span className="font-semibold dark:text-blue-100">Website:</span> {user.website}
                  </p>
                </div>
                <Button asChild className="w-full dark:bg-blue-600 dark:hover:bg-blue-700">
                  <Link to={`/users/${user.id}`} className="flex items-center justify-center gap-2">
                    View Profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
