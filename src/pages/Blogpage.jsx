import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogpage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await response.json();
            return data;
        }
        getPosts().then(data => setPosts(data));

       

    }, []);
    return (
        <div>
            <h1>Our news</h1>
            {posts.map(post => (
                <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                </Link>
            )) }
        </div>
    );
} 

export { Blogpage}