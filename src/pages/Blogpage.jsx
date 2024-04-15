import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BlogFilter } from "../components/BlogFilter";

const Blogpage = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const postQuery = searchParams.get('post') || '';
    const latest = searchParams.has('latest');

    const startsFrom = latest ? 80 : 1;

    

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
            <BlogFilter 
                setSearchParams={setSearchParams}
                postQuery={postQuery}
                latest={latest}
            
            />
            <Link to="/posts/new">Add new post</Link>
            {posts.filter(post => post.title.includes(postQuery) && post.id >= startsFrom
            ).map(post => (
                <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                </Link>
            )) }
        </div>
    );
} 

export { Blogpage}