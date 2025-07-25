import { useLoaderData } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useStore } from '../store/Store';


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
  const {userId} = useParams();
  const { favorites, addFavorite, removeFavorites } = useStore();

  const handleFavorite = (photo: PhotoParams) => { 
    if (favorites.some((f) => f.id === photo.id)) {
      removeFavorites(photo.id);
    } else {
      addFavorite((...photo, userId: Number(userId)));
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
            <button onClick={() => handleFavorite(photo)}>Favorite</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AlbumDetailPage;