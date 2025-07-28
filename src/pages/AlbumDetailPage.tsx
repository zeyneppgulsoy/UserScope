import { useLoaderData, useParams, Link } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useStore } from '../store/Store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Camera, User, Image } from "lucide-react";

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

  const isFavorited = (photoId: number) => favorites.some((f) => f.id === photoId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6 dark:text-blue-300 dark:hover:bg-blue-900">
        <Link to={`/users/${user.id}/albums`} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Albums
        </Link>
      </Button>

      {/* Album Header */}
      <Card className="mb-8 border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-2xl sm:text-3xl font-bold leading-tight mb-2 break-words">
                {album.title}
              </CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm sm:text-base">by</span>
                </div>
                <Link 
                  to={`/users/${user.id}`} 
                  className="text-purple-600 hover:text-purple-800 transition-colors font-medium text-sm sm:text-base truncate"
                >
                  {user.name}
                </Link>
                <span className="text-sm sm:text-base text-gray-500">(@{user.username})</span>
              </div>
            </div>
            <div className="text-center sm:text-right bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 w-full sm:w-auto">
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{photos.length}</p>
              <p className="text-sm text-gray-500">photos</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Photos Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <Image className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Photos</h3>
            <p className="text-gray-600">Beautiful memories captured</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02]">
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <img 
                  src={photo.thumbnailUrl || `https://picsum.photos/150/150?random=${photo.id}`} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/150/150?random=${photo.id}`;
                  }}
                />
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFavorite(photo)}
                    className={`h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 ${
                      isFavorited(photo.id) ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited(photo.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <CardDescription className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                  {photo.title}
                </CardDescription>
                
                                 <div className="flex items-center justify-end mt-3">
                   <Button
                     variant={isFavorited(photo.id) ? "destructive" : "outline"}
                     size="sm"
                     onClick={() => handleFavorite(photo)}
                     className="h-7 px-3 text-xs"
                   >
                     {isFavorited(photo.id) ? "❤️" : "🤍"}
                   </Button>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {photos.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-600 mb-2">No Photos Found</CardTitle>
              <CardDescription>This album doesn't contain any photos yet.</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;