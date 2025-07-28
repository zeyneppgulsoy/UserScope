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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Users Directory
        </h1>
        <p className="text-gray-600 text-lg">
          Discover and connect with {users.length} users in our community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-lg">{user.name}</CardTitle>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Username:</span> @{user.username}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Website:</span> {user.website}
                </p>
              </div>
              <Button asChild className="w-full">
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
  );
}

export default UsersPage;
