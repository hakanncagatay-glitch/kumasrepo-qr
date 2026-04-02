import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './components/LoginPage'
import './App.css'

function App() {
  const token = localStorage.getItem('token')

  return (
    <Router>
      <Routes>
        {/* Login sayfası */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ana sayfa - sadece login olmuşsa erişebilir */}
        <Route 
          path="/" 
          element={token ? <HomePage /> : <Navigate to="/login" />} 
        />

        {/* Bilinmeyen URL'ler */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
