import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";


interface PostParams {
    userId: number;
    id: number;
    title: string;
}


export const userPostsLoader = async ({ params }: LoaderFunctionArgs) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${params.userId}`);
    const posts = await response.json();
    return posts;
}

function UserPosts() {
    const posts = useLoaderData() as PostParams [];
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li> 
                        <Link to={`/users/${post.userId}/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserPosts;