import { useLoaderData } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'

interface PhotoParams {
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

  return (
    <>
      <h2>Photos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} />
            <p>{photo.title}</p>
            <button>Favorite</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AlbumDetailPage;