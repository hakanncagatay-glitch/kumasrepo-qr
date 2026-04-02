import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCodeGenerator from '../components/QRCodeGenerator'
import QRCodeScanner from '../components/QRCodeScanner'
import '../styles/HomePage.css'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('generate')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/login')
  }

  const email = localStorage.getItem('email')

  return (
    <div className="home-container">
      <div className="navbar">
        <h1>🎉 KumasRepo QR</h1>
        <div className="user-info">
          <span>👤 {email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          📱 QR Oluştur
        </button>
        <button 
          className={`tab ${activeTab === 'scan' ? 'active' : ''}`}
          onClick={() => setActiveTab('scan')}
        >
          ✨ QR Oku
        </button>
      </div>

      <div className="content">
        {activeTab === 'generate' && <QRCodeGenerator />}
        {activeTab === 'scan' && <QRCodeScanner />}
      </div>
    </div>
  )
}
