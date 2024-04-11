import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

const SinglePage = () => {
    const [post, setPost] = useState('');
    const {id} = useParams();

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const data = await response.json();
            return data;
        }
        getPost().then(data => setPost(data))
    }, [id]);
    return (
        <div>
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <Link to={`/posts/${id}/edit`}>Edit this post</Link>
                </>
            )}
        </div>
    );
}

export { SinglePage }