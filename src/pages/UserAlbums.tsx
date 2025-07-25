import { useLoaderData, Link } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'

interface Album {
  id: number;
  userId: number;
  title: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userAlbumsLoader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  );
  const albums = await response.json();
  return albums;
};

function UserAlbums() {
  const albums = useLoaderData() as Album[];

  return (
    <>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/users/${album.userId}/albums/${album.id}`}>
              {album.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserAlbums;