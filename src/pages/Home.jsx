import { useState } from 'react'
import QRCodeReader from '../components/QRCodeReader'
import QRCodeGenerator from '../components/QRCodeGenerator'
import '../styles/Home.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState('reader')

  return (
    <div className="home-container">
      <div className="header">
        <h1>📱 KumasRepo QR</h1>
        <p>QR Kod Oku ve Oluştur</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'reader' ? 'active' : ''}`}
          onClick={() => setActiveTab('reader')}
        >
          📖 QR Oku
        </button>
        <button 
          className={`tab-btn ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          ✨ QR Oluştur
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'reader' && <QRCodeReader />}
        {activeTab === 'generator' && <QRCodeGenerator />}
      </div>
    </div>
  )
}
