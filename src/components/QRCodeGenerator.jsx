import { useState } from 'react'
import QRCode from 'qr-code-styling'
import '../styles/QRCodeGenerator.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')

  const generateQR = () => {
    if (text.trim()) {
      setQrValue(text)
    }
  }

  const downloadQR = () => {
    const qrCode = new QRCode({
      content: text,
      width: 256,
      height: 256,
      type: 'canvas',
      data: {
        url: text,
      },
      image: 'svg',
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H',
      },
      imageOptions: {
        hideBackgroundDots: false,
        imageSize: 0.4,
        margin: 0,
      },
    })
    qrCode.download('qrcode.png')
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
          <div className="qr-wrapper">
            <canvas id="qr-canvas" />
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
