import { useState } from 'react'
import '../styles/QRCodeGenerator.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')

  const generateQR = async () => {
    const v = text.trim()
    if (!v) {
      alert('Lütfen metin girin!')
      return
    }

    try {
      // QR kütüphanesini dinamik yükle
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
      
      script.onload = () => {
        // Kütüphane yüklendikten sonra
        const tempDiv = document.createElement('div')
        tempDiv.id = 'temp-qr'
        document.body.appendChild(tempDiv)

        new window.QRCode(tempDiv, {
          text: v,
          width: 256,
          height: 256,
        })

        // Canvas'ı data URL'ye çevir
        setTimeout(() => {
          const canvas = tempDiv.querySelector('canvas')
          if (canvas) {
            const dataUrl = canvas.toDataURL('image/png')
            setQrDataUrl(dataUrl)
          }
          document.body.removeChild(tempDiv)
        }, 500)
      }

      if (!window.QRCode) {
        document.head.appendChild(script)
      } else {
        script.onload()
      }
    } catch (e) {
      console.error('QR Error:', e)
      alert('QR Kod oluşturulamadı!')
    }
  }

  const downloadQR = () => {
    if (!qrDataUrl) return
    const link = document.createElement('a')
    link.href = qrDataUrl
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

      {qrDataUrl && (
        <div className="qr-display">
          <div className="qr-wrapper">
            <img src={qrDataUrl} alt="QR Code" style={{ maxWidth: '100%' }} />
          </div>

          <div className="qr-actions">
            <button onClick={downloadQR}>⬇️ İndir</button>
            <button onClick={copyToClipboard}>📋 Metni Kopyala</button>
            <button onClick={() => setQrDataUrl('')}>🗑️ Sil</button>
          </div>
        </div>
      )}
    </div>
  )
}
