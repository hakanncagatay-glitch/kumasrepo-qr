import { useState, useEffect } from 'react'
import '../styles/QRCodeGenerator.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [qrScript, setQrScript] = useState(false)

  // qr.js kütüphanesini yükle (sadece 1 kere)
  useEffect(() => {
    if (window.QRCode) {
      setQrScript(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
    script.onload = () => setQrScript(true)
    document.head.appendChild(script)
  }, [])

  // QR oluştur
  useEffect(() => {
    if (!qrValue || !qrScript) return

    const container = document.getElementById('qr-container')
    container.innerHTML = '' // Öncekini temizle

    new window.QRCode(container, {
      text: qrValue,
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: window.QRCode.CorrectLevel.H,
    })
  }, [qrValue, qrScript])

  const generateQR = () => {
    if (text.trim()) setQrValue(text.trim())
  }

  const downloadQR = () => {
    if (!qrValue) return

    const canvas = document.querySelector('#qr-container canvas')
    if (!canvas) return

    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
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
            <div id="qr-container"></div>
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
