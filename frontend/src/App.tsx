import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Homes from './pages/Homes'

// Aquí definimos las rutas de la práctica para poder movernos entre páginas
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Homes />} />
    </Routes>
  )
}

export default App;