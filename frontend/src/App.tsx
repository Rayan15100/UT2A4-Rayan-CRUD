import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Homes from './pages/Homes'
import Reports from './pages/Reports'

// Aquí definimos las rutas de la práctica para poder movernos entre páginas
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Homes />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  )
}

export default App;