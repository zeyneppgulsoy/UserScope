
import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

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

    return { post, comments };
};

function PostDetailPage() {
    const { post, comments } = useLoaderData() as {
        post: PostParams;
        comments: CommentParams[];
    };

    return (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.body}</li>
                ))}
            </ul>
        </>
    );
}

export default PostDetailPage;
