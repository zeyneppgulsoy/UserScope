import { useLoaderData, Link, Outlet, useLocation } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Images, ArrowRight, Camera } from "lucide-react";

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
  const location = useLocation();
  
  // Check if we're in an album detail view
  const isAlbumDetailView = location.pathname.includes('/albums/') && location.pathname.split('/').length > 4;

  return (
    <>
      {/* Show albums list only when not in detail view */}
      {!isAlbumDetailView && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-lg">
              <Images className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Albums</h2>
              <p className="text-gray-600 dark:text-gray-200">{albums.length} photo albums</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Card key={album.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-300 dark:to-pink-300 rounded-full">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2 dark:text-white">
                    <Link to={`/users/${album.userId}/albums/${album.id}`}>
                      {album.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-200 mb-4">
                    📷 Photo collection
                  </CardDescription>
                  
                                     <Button 
                     variant="outline" 
                     size="sm" 
                     asChild
                     className="w-full group-hover:bg-blue-800 group-hover:text-white transition-all duration-300 dark:bg-blue-600 dark:text-white dark:border-blue-600 dark:hover:bg-blue-800"
                   >
                     <Link to={`/users/${album.userId}/albums/${album.id}`} className="flex items-center justify-center gap-2">
                       View Photos
                       <ArrowRight className="h-3 w-3" />
                     </Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {albums.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Images className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-600 mb-2">No Albums Found</CardTitle>
                <CardDescription>This user hasn't created any photo albums yet.</CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Nested Route Outlet for Album Details */}
      <Outlet />
    </>
  );
}

export default UserAlbums;