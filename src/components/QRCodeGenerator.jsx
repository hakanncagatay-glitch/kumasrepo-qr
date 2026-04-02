import { useState } from 'react'
import QRCode from 'qrcode.react'
import '../styles/QRCodeGenerator.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')

  const generateQR = () => {
    const v = text.trim()
    if (v) setQrValue(v)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
    alert('Metin kopyalandı!')
  }

  const downloadQR = () => {
    if (!qrValue) return
    const svg = document.getElementById('qr-svg')
    if (!svg) return

    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svg)
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'qrcode.svg'
    link.click()

    URL.revokeObjectURL(url)
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
            <QRCode
              id="qr-svg"
              value={qrValue}
              size={256}
              level="H"
              includeMargin={true}
              renderAs="svg"
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
