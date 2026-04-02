import { useState } from 'react'
import '../styles/QRCodeGenerator.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')

  const generateQR = () => {
    const v = text.trim()
    if (!v) {
      alert('Lütfen metin girin!')
      return
    }
    setQrValue(v)
  }

  const downloadQR = () => {
    if (!qrValue) return
    const qrUrl = `https://chart.googleapis.com/chart?chs=300x300&chld=L|0&cht=qr&chl=${encodeURIComponent(qrValue)}`
    const link = document.createElement('a')
    link.href = qrUrl
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
          <button onClick={() => setText('')}>🗑️ Temizle</button>
        </div>
      </div>

      {qrValue && (
        <div className="qr-display">
          <div className="qr-wrapper">
            <img
              src={`https://chart.googleapis.com/chart?chs=300x300&chld=L|0&cht=qr&chl=${encodeURIComponent(qrValue)}`}
              alt="QR Code"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          <div className="qr-actions">
            <button onClick={downloadQR}>⬇️ İndir</button>
            <button onClick={copyToClipboard}>📋 Metni Kopyala</button>
            <button onClick={() => setQrValue('')}>🗑️ Sil</button>
          </div>
        </div>
      )}
    </div>
  )
}
