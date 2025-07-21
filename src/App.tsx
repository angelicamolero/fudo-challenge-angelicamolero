import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import PostDetail from './pages/PostsDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<PostDetail />} />
    </Routes>
  )
}

export default App
