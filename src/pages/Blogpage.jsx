import {
  Link,
  useSearchParams,
  useLoaderData,
  Await,
} from "react-router-dom";
import { BlogFilter } from "../components/BlogFilter";
import { Suspense } from "react";

const Blogpage = () => {
  const { posts } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get("post") || "";
  const latest = searchParams.has("latest");

  const startsFrom = latest ? 80 : 1;

  return (
    <div>
      <h1>Our news</h1>
      <BlogFilter
        setSearchParams={setSearchParams}
        postQuery={postQuery}
        latest={latest}
      />
      <Link to="/posts/new">Add new post</Link>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={posts}>
          {(resolvedPosts) => (
            <>
              {resolvedPosts
                .filter(
                  (post) =>
                    post.title.includes(postQuery) && post.id >= startsFrom
                )
                .map((post) => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                  </Link>
                ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

async function getPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return response.json();
}

const blogLoader = async () => {
  return ({
    posts: getPosts(),
  });
};

export { Blogpage, blogLoader };
