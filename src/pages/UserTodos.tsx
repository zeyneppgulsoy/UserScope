import { useLoaderData } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ListTodo } from "lucide-react";

interface TodoParams {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userTodosLoader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`
  );
  const todos = await response.json();
  return todos;
};

function UserTodos() {
  const todos = useLoaderData() as TodoParams[];
  
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-lg">
          <ListTodo className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-100">Todos</h2>
          <p className="text-gray-600 dark:text-blue-200">
            {completedTodos.length} of {todos.length} tasks completed
          </p>
        </div>
      </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {todos.map((todo) => (
           <Card 
             key={todo.id} 
             className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50 ${
               todo.completed 
                 ? 'border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-900/20' 
                 : 'border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/20'
             }`}
           >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full flex-shrink-0 ${
                  todo.completed 
                    ? 'bg-green-500' 
                    : 'bg-amber-500'
                }`}>
                  {todo.completed ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <Clock className="h-4 w-4 text-white" />
                  )}
                </div>
                
                                 <div className="flex-1">
                   <CardTitle className={`text-lg leading-tight ${
                     todo.completed 
                       ? 'text-green-800 dark:text-green-400 line-through' 
                       : 'text-gray-900 dark:text-white'
                   }`}>
                     {todo.title}
                   </CardTitle>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      variant={todo.completed ? "default" : "secondary"}
                      className={`text-xs ${
                        todo.completed 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      {todo.completed ? '✅ Completed' : '⏳ Pending'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {todos.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <ListTodo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <CardTitle className="text-xl text-gray-600 mb-2">No Todos Found</CardTitle>
            <CardDescription>This user doesn't have any tasks yet.</CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UserTodos