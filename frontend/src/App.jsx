
import './App.css'
import Admin from './pages/Admin'
import { Route, Routes } from 'react-router-dom'
import Upload from './pages/Upload'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'

function App() {


  const [user, setUser] = useState({
    isUser: false,
    isAdmin: false,
    isLoggedIn: false
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token || !role) {
      setUser({
        isAdmin: false,
        isLoggedIn: false
      })
      localStorage.clear()
      
    } 
    else if(localStorage.getItem('role') == 'Admin') {
      setUser({
        isAdmin : true , isLoggedIn :  true 
      })
      console.log(user.isAdmin)
    } else {
      setUser({
        isAdmin : false , isLoggedIn : true 
      })
    }
  }, [])




  return (
    <Routes>
      <Route path='/' element={<Landing isLoggedIn={user.isLoggedIn} setIsLoggedIn={setUser} /> } />
      <Route path='/signin' element={user.isLoggedIn ? <Landing isLoggedIn={user.isLoggedIn} setIsLoggedIn={setUser} /> : <Signin setUser={setUser} />} />
      <Route path='/signup' element={user.isLoggedIn ? <Home/> : <Signup/>} />
      <Route path='/admin' element={user.isAdmin ? <Admin /> : <Signin setUser={setUser} /> } />
      <Route path='/admin/upload' element={user.isAdmin ? <Upload /> : <Signin setUser={setUser} />} />
      <Route path='/product/:productId' element={<ProductPage isLoggedIn={user.isLoggedIn} />} />
      <Route path='/cart' element={<Cart isLoggedIn={user.isLoggedIn} />} />
    </Routes>
  )
}

export default App
