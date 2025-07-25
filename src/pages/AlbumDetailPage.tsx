import { useLoaderData, useParams, Link } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useStore } from '../store/Store';

export interface PhotoParams {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface AlbumParams {
  id: number;
  userId: number;
  title: string;
}

interface UserParams {
  id: number;
  name: string;
  username: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const albumLoader = async ({ params }: LoaderFunctionArgs) => {
  const photosResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const photos = await photosResponse.json();

  const albumResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}`
  );
  const album = await albumResponse.json();

  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${album.userId}`
  );
  const user = await userResponse.json();

  return { photos, album, user };
};

function AlbumDetailPage() {
  const { photos, album, user } = useLoaderData() as {
    photos: PhotoParams[];
    album: AlbumParams;
    user: UserParams;
  };
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
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{album.title}</h2>
          <p className="text-muted">
            by <Link to={`/users/${user.id}`} className="text-decoration-none">
              {user.name} (@{user.username})
            </Link>
          </p>
        </div>
      </div>

      <h3>Photos</h3>
      <div className="row">
        {photos.map((photo) => (
          <div key={photo.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={photo.thumbnailUrl} className="card-img-top" alt={photo.title} />
              <div className="card-body">
                <p className="card-text">{photo.title}</p>
                <button 
                  className={`btn btn-sm ${favorites.some((f) => f.id === photo.id) ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => handleFavorite(photo)}
                >
                  {favorites.some((f) => f.id === photo.id) ? "✅ Remove from favorites" : "🤍 Add to favorites"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumDetailPage;