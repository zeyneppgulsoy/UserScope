import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStore } from "../store/Store";

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

    const handleFavoritePost = (post: PostParams) => {
        if (favoritePosts.some((f) => f.id === post.id)) {
            removeFavoritePost(post.id);
        } else {
            addFavoritePost(post);
        }
    };

    return (
        <div>
            <h2>Posts</h2>
            <div className="row">
                {posts.map((post) => (
                    <div key={post.id} className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">
                                    <Link to={`/users/${post.userId}/posts/${post.id}`} className="text-decoration-none">
                                        {post.title}
                                    </Link>
                                </h6>
                                <p className="card-text">{post.body.substring(0, 100)}...</p>
                                <button 
                                    className={`btn btn-sm ${favoritePosts.some((f) => f.id === post.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                                    onClick={() => handleFavoritePost(post)}
                                >
                                    {favoritePosts.some((f) => f.id === post.id) ? "❤️ Remove from favorites" : "🤍 Add to favorites"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserPosts;