import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Aboutpage } from "./pages/Aboutpage";
import { Blogpage, blogLoader } from "./pages/Blogpage";
import { Notfoundpage } from "./pages/Notfoundpage";
import { Layout } from "./components/Layout";
import { SinglePage, postLoader } from "./pages/SinglePage";
import { Createpost, createPostAction } from "./pages/Createpost";
import { Editpost } from "./pages/Editpost";
import { RequireAuth } from "./hoc/RequireAuth";
import { LoginPage } from "./pages/Loginpage";
import { AuthProvider } from "./hoc/AuthProvider";
import Errorpage from "./pages/Errorpage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="/about" element={<Aboutpage />}>
        <Route path="contact" element={<p>Our contacts</p>} />
        <Route path="team" element={<p>Our team</p>} />
      </Route>
      <Route path="/posts" element={<Blogpage />} loader={blogLoader} errorElement={<Errorpage />}/>
      <Route path="posts/:id" element={<SinglePage />} loader={postLoader}/>
      <Route path="posts/:id/edit" element={<Editpost />} />
      <Route
        path="posts/new"
        element={
          <RequireAuth>
            <Createpost />
          </RequireAuth>
        } action={createPostAction}
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Notfoundpage />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
