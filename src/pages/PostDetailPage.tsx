
import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData, Link } from "react-router-dom";
import { useStore } from "../store/Store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, User, MessageCircle, ArrowLeft, Mail } from "lucide-react";

interface PostParams {
    id: number;
    title: string;
    userId: number;
    body: string;
}

interface CommentParams {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

interface UserParams {
    id: number;
    name: string;
    username: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const postLoader = async ({ params }: LoaderFunctionArgs) => {
    const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}`
    );
    const post = await postResponse.json();

    const commentResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
    );
    const comments = await commentResponse.json();

    const userResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`
    );
    const user = await userResponse.json();

    return { post, comments, user };
};

function PostDetailPage() {
    const { post, comments, user } = useLoaderData() as {
        post: PostParams;
        comments: CommentParams[];
        user: UserParams;
    };

    const { favoritePosts, addFavoritePost, removeFavoritePost } = useStore();

    const handleFavoritePost = () => {
        if (favoritePosts.some((f) => f.id === post.id)) {
            removeFavoritePost(post.id);
        } else {
            addFavoritePost(post);
        }
    };

    const isFavorited = favoritePosts.some((f) => f.id === post.id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                                 <Button variant="ghost" asChild className="mb-6 dark:text-blue-300 dark:hover:bg-blue-900">
                     <Link to={`/users/${user.id}/posts`} className="flex items-center gap-2">
                         <ArrowLeft className="h-4 w-4" />
                         Back to Posts
                     </Link>
                 </Button>

            {/* Post Content */}
            <Card className="mb-8 border-0 shadow-lg bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm dark:border dark:border-blue-600/60">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <CardTitle className="text-3xl font-bold leading-tight mb-4 dark:text-gray-50">
                                {post.title}
                            </CardTitle>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        <Link 
                                            to={`/users/${user.id}`} 
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                        >
                                            {user.name}
                                        </Link>
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">@{user.username}</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant={isFavorited ? "destructive" : "outline"}
                            onClick={handleFavoritePost}
                            className="flex items-center gap-2 dark:border-gray-500 dark:text-gray-100 dark:hover:bg-blue-600"
                        >
                            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                            {isFavorited ? "Favorited" : "Add to Favorites"}
                        </Button>
                    </div>
                </CardHeader>
                                                                   <CardContent>
                      <div className="prose prose-lg max-w-none">
                          <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-lg font-medium">
                              {post.body}
                          </p>
                      </div>
                  </CardContent>
            </Card>

            {/* Comments Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-lg">
                        <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Comments</h3>
                        <p className="text-gray-600 dark:text-gray-100 font-medium">{comments.length} responses</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <Card key={comment.id} className="border-l-4 border-l-blue-500 dark:border-l-blue-400 hover:shadow-md transition-shadow bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm dark:border dark:border-blue-600/60">
                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-full">
                                        <Mail className="h-4 w-4 text-gray-600 dark:text-gray-200" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                            {comment.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1 mt-1 dark:text-gray-100 font-medium">
                                            <Mail className="h-3 w-3" />
                                            {comment.email}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-gray-700 dark:text-gray-100 leading-relaxed font-medium">
                                    {comment.body}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {comments.length === 0 && (
                    <Card className="text-center py-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm dark:border dark:border-blue-600/60">
                        <CardContent>
                            <MessageCircle className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                            <CardTitle className="text-xl text-gray-600 dark:text-gray-100 mb-2">No Comments Yet</CardTitle>
                            <CardDescription className="dark:text-gray-200">Be the first to share your thoughts on this post!</CardDescription>
                        </CardContent>
                    </Card>
                )}
            </div>
            </div>
        </div>
    );
}

export default PostDetailPage;
