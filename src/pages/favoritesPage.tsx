import { Link } from "react-router-dom";
import { useStore } from "../store/Store";

function FavoritesPage() {
  const { favorites, favoritePosts, removeFavorites, removeFavoritePost } = useStore();

  return (
    <div className="container mt-4">
      <h2>Favorites</h2>
      
      {/* Favorite Photos Section */}
      {favorites.length > 0 && (
        <>
          <h3 className="mt-4">Photos ({favorites.length})</h3>
          <div className="row">
            {favorites.map((photo) => (
              <div key={photo.id} className="col-md-4 mb-4">
                <div className="card">
                  <Link to={`/users/${photo.userId}/albums/${photo.albumId}`}>
                    <img src={photo.thumbnailUrl} className="card-img-top" alt={photo.title} />
                  </Link>
                  <div className="card-body">
                    <p className="card-text">{photo.title}</p>
                    <p className="text-muted">
                      by User: <Link to={`/users/${photo.userId}`} className="text-decoration-none">
                        {photo.userId}
                      </Link>
                    </p>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFavorites(photo.id)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Favorite Posts Section */}
      {favoritePosts.length > 0 && (
        <>
          <h3 className="mt-4">Posts ({favoritePosts.length})</h3>
          <div className="row">
            {favoritePosts.map((post) => (
              <div key={post.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      <Link to={`/users/${post.userId}/posts/${post.id}`} className="text-decoration-none">
                        {post.title}
                      </Link>
                    </h6>
                    <p className="card-text">{post.body.substring(0, 100)}...</p>
                    <p className="text-muted">
                      by User: <Link to={`/users/${post.userId}`} className="text-decoration-none">
                        {post.userId}
                      </Link>
                    </p>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFavoritePost(post.id)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {favorites.length === 0 && favoritePosts.length === 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">No favorites yet. Start adding photos and posts to your favorites!</p>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
