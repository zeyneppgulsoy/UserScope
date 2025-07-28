import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData, Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStore } from "../store/Store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, FileText, ArrowRight, User } from "lucide-react";

interface PostParams {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userPostsLoader = async ({ params }: LoaderFunctionArgs) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${params.userId}`);
    const posts = await response.json();
    return posts;
}

function UserPosts() {
    const posts = useLoaderData() as PostParams[];
    const { favoritePosts, addFavoritePost, removeFavoritePost } = useStore();
    const location = useLocation();
    
    // Check if we're in a post detail view
    const isPostDetailView = location.pathname.includes('/posts/') && location.pathname.split('/').length > 4;

    const handleFavoritePost = (post: PostParams) => {
        if (favoritePosts.some((f) => f.id === post.id)) {
            removeFavoritePost(post.id);
        } else {
            addFavoritePost(post);
        }
    };

    const isFavorited = (postId: number) => favoritePosts.some((f) => f.id === postId);

    return (
        <>
            {/* Show posts list only when not in detail view */}
            {!isPostDetailView && (
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
                        <p className="text-gray-600">{posts.length} posts published</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
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
                                            <div className="p-1 bg-gray-100 rounded-full">
                                                <User className="h-3 w-3 text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleFavoritePost(post)}
                                        className={`ml-2 h-8 w-8 p-0 ${isFavorited(post.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                                    >
                                        <Heart className={`h-4 w-4 ${isFavorited(post.id) ? 'fill-current' : ''}`} />
                                    </Button>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                                <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                    {post.body}
                                </CardDescription>
                                
                                <div className="flex items-center justify-between">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        asChild
                                        className="group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                                    >
                                        <Link to={`/users/${post.userId}/posts/${post.id}`} className="flex items-center gap-2">
                                            Read More
                                            <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                    
                                    <Button
                                        variant={isFavorited(post.id) ? "destructive" : "ghost"}
                                        size="sm"
                                        onClick={() => handleFavoritePost(post)}
                                        className="flex items-center gap-2"
                                    >
                                        <Heart className={`h-4 w-4 ${isFavorited(post.id) ? 'fill-current' : ''}`} />
                                        {isFavorited(post.id) ? "Favorited" : "Add to Favorites"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {posts.length === 0 && (
                                         <Card className="text-center py-12">
                         <CardContent>
                             <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                             <CardTitle className="text-xl text-gray-600 mb-2">No Posts Found</CardTitle>
                             <CardDescription>This user hasn't published any posts yet.</CardDescription>
                         </CardContent>
                     </Card>
                 )}
             </div>
             )}

             {/* Nested Route Outlet for Post Details */}
             <Outlet />
         </>
    )
}

export default UserPosts;