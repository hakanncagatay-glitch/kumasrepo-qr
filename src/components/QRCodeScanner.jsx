import { useState } from 'react'

export default function QRCodeScanner() {
  const [scanResult, setScanResult] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        // Gerçek QR kod okuması için jsQR kütüphanesi gerekli
        // Şimdilik demo amaçlı mesaj göster
        setScanResult('QR Kod okuma özelliği yakında eklenecek! 📱')
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="qr-scanner">
      <h2>✨ QR Kod Oku</h2>
      
      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          id="qr-input"
        />
        <label htmlFor="qr-input">
          📤 QR Kod Resmi Yükle
        </label>
      </div>

      {scanResult && (
        <div className="scan-result">
          <p><strong>Sonuç:</strong> {scanResult}</p>
        </div>
      )}
    </div>
  )
}
