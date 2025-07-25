import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";



interface UserProps {
  id: number;
  name: string;
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
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UsersPage;
