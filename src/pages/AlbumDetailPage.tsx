import { useLoaderData, useParams } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useStore } from '../store/Store';

export interface PhotoParams {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const albumLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const photos = await response.json();
  return photos;
};

function AlbumDetailPage() {
  const photos = useLoaderData() as PhotoParams[];
  const { userId } = useParams();
  const { favorites, addFavorite, removeFavorites } = useStore();

  const handleFavorite = (photo: PhotoParams) => { 
    if (favorites.some((f) => f.id === photo.id)) {
      removeFavorites(photo.id);
    } else {
      addFavorite({ ...photo, userId: Number(userId) });
    }
  }

  return (
    <>
      <h2>Photos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} />
            <p>{photo.title}</p>
            <button onClick={() => handleFavorite(photo)}>
              {favorites.some((f) => f.id === photo.id) ? "Remove from favorites" : "Add to favorites"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AlbumDetailPage;