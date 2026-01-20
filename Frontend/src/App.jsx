import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Branch from './components/Branch'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Career from './pages/Career'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/career' element={<Career />} />

      </Routes>
      <Branch />
      <Footer />
    </BrowserRouter>
  )
}

export default App
