import { useState, useEffect, useRef } from 'react'
import '../styles/QRCodeGenerator.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [showQR, setShowQR] = useState(false)
  const canvasRef = useRef(null)

  // QR kütüphanesini yükle
  useEffect(() => {
    if (!window.QRCode) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
      document.head.appendChild(script)
    }
  }, [])

  const generateQR = () => {
    const v = text.trim()
    if (!v) {
      alert('Lütfen metin girin!')
      return
    }

    // QR oluştur
    const container = document.getElementById('qr-code-canvas')
    if (container) container.innerHTML = ''

    if (window.QRCode) {
      new window.QRCode(document.getElementById('qr-code-canvas'), {
        text: v,
        width: 256,
        height: 256,
      })
      setShowQR(true)
    }
  }

  const downloadQR = () => {
    const canvas = document.querySelector('#qr-code-canvas canvas')
    if (!canvas) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'qrcode.png'
    link.click()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    alert('Metin kopyalandı!')
  }

  return (
    <div className="generator-container">
      <div className="input-section">
        <label>📝 QR Kod İçeriği:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="URL, metin veya veri girin..."
          rows="4"
        />

        <div className="button-group">
          <button onClick={generateQR}>✨ QR Oluştur</button>
          <button onClick={() => {
            setText('')
            setShowQR(false)
          }}>🗑️ Temizle</button>
        </div>
      </div>

      {showQR && (
        <div className="qr-display">
          <div className="qr-wrapper">
            <div id="qr-code-canvas"></div>
          </div>

          <div className="qr-actions">
            <button onClick={downloadQR}>⬇️ İndir</button>
            <button onClick={copyToClipboard}>📋 Metni Kopyala</button>
            <button onClick={() => setShowQR(false)}>🗑️ Sil</button>
          </div>
        </div>
      )}
    </div>
  )
}
