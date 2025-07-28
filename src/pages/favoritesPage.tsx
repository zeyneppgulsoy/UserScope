import { Link } from "react-router-dom";
import { useStore } from "../store/Store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, Images, FileText, Camera } from "lucide-react";

function FavoritesPage() {
  const { favorites, favoritePosts, removeFavorites, removeFavoritePost } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-400 dark:to-pink-400 rounded-full">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent">My Favorites</h1>
            <p className="text-gray-700 dark:text-blue-200 font-medium">
              {favorites.length + favoritePosts.length} items saved
            </p>
          </div>
        </div>
      
      {/* Favorite Photos Section */}
      {favorites.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-lg">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-100">Favorite Photos</h2>
              <p className="text-gray-600 dark:text-blue-200">{favorites.length} photos saved</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((photo) => (
                             <Card key={photo.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
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
                                      <CardDescription className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-2">
                      {photo.title}
                    </CardDescription>
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
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-100">Favorite Posts</h2>
              <p className="text-gray-600 dark:text-blue-200">{favoritePosts.length} posts saved</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {favoritePosts.map((post) => (
               <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                                             <CardTitle className="text-lg leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors dark:text-white">
                         <Link 
                           to={`/users/${post.userId}/posts/${post.id}`}
                           className="line-clamp-2"
                         >
                           {post.title}
                         </Link>
                                              </CardTitle>
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
                   <CardDescription className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed line-clamp-3">
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
         <Card className="text-center py-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
           <CardContent>
             <Heart className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
             <CardTitle className="text-2xl text-gray-600 dark:text-gray-200 mb-4">No Favorites Yet</CardTitle>
             <CardDescription className="text-lg mb-6 dark:text-gray-300">
               Start exploring and add photos and posts to your favorites collection!
             </CardDescription>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button asChild variant="outline" className="dark:bg-blue-600 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700">
                 <Link to="/users">Browse Users</Link>
               </Button>
               <Button asChild className="dark:bg-blue-600 dark:hover:bg-blue-700">
                 <Link to="/">Go Home</Link>
               </Button>
             </div>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}

export default FavoritesPage;
