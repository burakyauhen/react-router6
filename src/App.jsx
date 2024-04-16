import './App.css'
import  { Routes, Route } from "react-router-dom"
import { Homepage } from './pages/Homepage'
import { Aboutpage } from './pages/Aboutpage' 
import { Blogpage } from './pages/Blogpage'
import { Notfoundpage } from './pages/Notfoundpage'
import { Layout } from './components/Layout'
import { SinglePage } from './pages/SinglePage'
import { Createpost } from './pages/Createpost'
import { Editpost } from './pages/Editpost'
import { RequireAuth } from './hoc/RequireAuth'
import { LoginPage } from './pages/Loginpage'
import { AuthProvider } from './hoc/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} >
            <Route path='contact' element={<p>Our contacts</p>} />
            <Route path='team' element={<p>Our team</p>} />
          </Route>
          <Route path="/posts" element={<Blogpage />} />
          <Route path="posts/:id" element={<SinglePage />} />
          <Route path="posts/:id/edit" element={<Editpost />} />
          <Route path="posts/new" element={
            <RequireAuth>
              <Createpost />
            </RequireAuth>
          } />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
