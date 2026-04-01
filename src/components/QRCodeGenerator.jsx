import { useState, useEffect, useRef } from 'react'
import QRCode from 'qr-code-styling'
import '../styles/QRCodeGenerator.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    if (qrValue && containerRef.current) {
      containerRef.current.innerHTML = ''
      
      const qr = new QRCode({
        content: qrValue,
        width: 300,
        height: 300,
        margin: 10,
      })
      
      qr.append(containerRef.current)
    }
  }, [qrValue])

  const generateQR = () => {
    if (text.trim()) {
      setQrValue(text)
    }
  }

  const downloadQR = async () => {
    const qr = new QRCode({
      content: text,
      width: 300,
      height: 300,
      margin: 10,
    })
    qr.download({ name: 'qrcode', extension: 'png' })
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
        ></textarea>

        <div className="button-group">
          <button onClick={generateQR}>✨ QR Oluştur</button>
          <button onClick={() => setText('')}>🗑️ Temizle</button>
        </div>
      </div>

      {qrValue && (
        <div className="qr-display">
          <div className="qr-wrapper" ref={containerRef}></div>

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
