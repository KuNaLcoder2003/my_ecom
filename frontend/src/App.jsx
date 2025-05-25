
import './App.css'
import Admin from './pages/Admin'
import { Route , Routes } from 'react-router-dom'
import Upload from './pages/Upload'

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Admin/>} />
      <Route path='/admin/upload' element={<Upload/>} />
    </Routes>
  )
}

export default App
