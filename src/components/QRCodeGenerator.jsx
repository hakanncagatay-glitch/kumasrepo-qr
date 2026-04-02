import { useState } from 'react'
import QRCode from 'qrcode.react'

export default function QRCodeGenerator() {
  const [inputValue, setInputValue] = useState('')
  const [qrValue, setQrValue] = useState('')

  const handleGenerate = () => {
    if (inputValue.trim()) {
      setQrValue(inputValue)
    } else {
      alert('Lütfen bir metin veya URL girin!')
    }
  }

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = 'qrcode.png'
    link.click()
  }

  return (
    <div className="qr-generator">
      <h2>📱 QR Kod Oluştur</h2>
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Metin veya URL girin..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button onClick={handleGenerate}>Oluştur</button>
      </div>

      {qrValue && (
        <div className="qr-result">
          <QRCode value={qrValue} size={256} level="H" includeMargin={true} />
          <button onClick={handleDownload} className="download-btn">
            ⬇️ İndir
          </button>
        </div>
      )}
    </div>
  )
}
