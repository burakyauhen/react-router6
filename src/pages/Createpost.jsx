import NewPost from "../components/NewPost";
import { useAuth } from "../hook/useAuth"
import { useNavigate, redirect, useNavigation } from "react-router-dom"

const Createpost = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const navigation = useNavigation();
    return (
        <div>
            <h1>Create a post</h1>
            <NewPost submitting={navigation.state === 'submitting'}/>
            <button onClick={() => signout(() => navigate('/', {replace: true}))}>Logout</button>
        </div>
    )
}

const createPost = async({title, body, userId}) =>  {
    const request = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, body, userId}),
    });

    const newPost = await request.json();
    return newPost;
}

const createPostAction = async ({request}) => {
    const formData = await request.formData();
    const newPost = {
        title: formData.get('title'),
        body: formData.get('body'),
        userId: formData.get('userId'),
    }
    const post = await createPost(newPost);

    return redirect('/posts/' + post.id);
}

export {Createpost, createPostAction}