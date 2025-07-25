import { useLoaderData } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'

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

  return (
    <>
      <h2>Todos</h2>
      <div className="row">
        {todos.map((todo) => (
          <div key={todo.id} className="col-md-6 mb-3">
            <div className={`card ${todo.completed ? 'border-success' : 'border-warning'}`}>
              <div className="card-body">
                <h6 className="card-title">
                  {todo.completed ? (
                    <span className="text-success">
                      ✅ {todo.title}
                    </span>
                  ) : (
                    <span className="text-warning">
                      ⏳ {todo.title}
                    </span>
                  )}
                </h6>
                <small className="text-muted">
                  Status: {todo.completed ? 'Completed' : 'Pending'}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-muted">No todos found for this user.</p>
      )}
    </>
  );
}

export default UserTodos