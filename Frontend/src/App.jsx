import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Branch from './components/Branch'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Branch />
      <Footer />
    </BrowserRouter>
  )
}

export default App
