
import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData, Link } from "react-router-dom";
import { useStore } from "../store/Store";

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

    return (
        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p className="card-text">{post.body}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            by <Link to={`/users/${user.id}`} className="text-decoration-none">
                                {user.name} (@{user.username})
                            </Link>
                        </small>
                        <button 
                            className={`btn btn-sm ${favoritePosts.some((f) => f.id === post.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={handleFavoritePost}
                        >
                            {favoritePosts.some((f) => f.id === post.id) ? "❤️ Remove from favorites" : "🤍 Add to favorites"}
                        </button>
                    </div>
                </div>
            </div>

            <h3>Comments</h3>
            <div className="row">
                {comments.map((comment) => (
                    <div key={comment.id} className="col-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">{comment.name}</h6>
                                <p className="card-text">{comment.body}</p>
                                <small className="text-muted">by {comment.email}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostDetailPage;
