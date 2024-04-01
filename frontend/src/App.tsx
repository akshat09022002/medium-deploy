
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Home } from './pages/Home'
import { CreateBlog2 } from './pages/CreateBlog2'


function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Signup}></Route>
        <Route path='/signin' Component={Signin}></Route>
        <Route path='/home' Component={Home}></Route>
        <Route path='/createblog' Component={CreateBlog2}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App
