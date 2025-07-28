import { Link } from "react-router-dom";
import { useStore } from "../store/Store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, Images, FileText, Camera } from "lucide-react";

function FavoritesPage() {
  const { favorites, favoritePosts, removeFavorites, removeFavoritePost } = useStore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600">
            {favorites.length + favoritePosts.length} items saved
          </p>
        </div>
      </div>
      
      {/* Favorite Photos Section */}
      {favorites.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Favorite Photos</h2>
              <p className="text-gray-600">{favorites.length} photos saved</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((photo) => (
              <Card key={photo.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02]">
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <Link to={`/users/${photo.userId}/albums/${photo.albumId}`}>
                    <img 
                      src={photo.thumbnailUrl || `https://picsum.photos/150/150?random=${photo.id}`}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://picsum.photos/150/150?random=${photo.id}`;
                      }}
                    />
                  </Link>
                  <div className="absolute top-2 right-2 z-10">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFavorites(photo.id)}
                      className="h-8 w-8 p-0 rounded-full bg-red-500/80 backdrop-blur-sm hover:bg-red-600/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <CardDescription className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-3">
                    {photo.title}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Photo #{photo.id}</span>
                    <Link 
                      to={`/users/${photo.userId}`}
                      className="text-xs text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      User {photo.userId}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Posts Section */}
      {favoritePosts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Favorite Posts</h2>
              <p className="text-gray-600">{favoritePosts.length} posts saved</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoritePosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors">
                        <Link 
                          to={`/users/${post.userId}/posts/${post.id}`}
                          className="line-clamp-2"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Post #{post.id}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <Link 
                          to={`/users/${post.userId}`}
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          User {post.userId}
                        </Link>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFavoritePost(post.id)}
                      className="ml-2 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {post.body}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 && favoritePosts.length === 0 && (
        <Card className="text-center py-16">
          <CardContent>
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <CardTitle className="text-2xl text-gray-600 mb-4">No Favorites Yet</CardTitle>
            <CardDescription className="text-lg mb-6">
              Start exploring and add photos and posts to your favorites collection!
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/users">Browse Users</Link>
              </Button>
              <Button asChild>
                <Link to="/">Go Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default FavoritesPage;
