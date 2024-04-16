import { Suspense } from "react";
import {
  Link,
  useNavigate,
  useLoaderData,
  Await,
  useAsyncValue,
} from "react-router-dom";

const Post = () => {
  const post = useAsyncValue();
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

const Comments = () => {
  const comments = useAsyncValue()

  return (
      <div>
          <h2>Comments</h2>
          {comments.map(comment => (
              <li key={comment.id}>
                  <h3>{comment.email}</h3>
                  <h4>{comment.name}</h4>
                  <p>{comment.body}</p>
              </li>
          ))}
      </div>
  )
}

const SinglePage = () => {
  const { post, id, comments } = useLoaderData();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <button onClick={goBack}>Go back</button>

      <Suspense fallback={<h2>Post is loading...</h2>}>
        <Await resolve={post}>
          <Post />
        </Await>
      </Suspense>

      <Suspense fallback={<h2>Comments is loading...</h2>}>
        <Await resolve={comments}>
          <Comments />
        </Await>
      </Suspense>

      <Link to={`/posts/${id}/edit`}>Edit this post</Link>
    </div>
  );
};

async function getPostById(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.json();
}

async function getComments(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  return response.json();
}

const postLoader = async ({ params }) => {
  const id = params.id;
  return {
    post: getPostById(id),
    id,
    comments: getComments(id),
  };
};

export { SinglePage, postLoader };
