import { useState, useRef } from 'react'
import jsQR from 'jsqr'

export default function QRCodeScanner() {
  const [scanResult, setScanResult] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // KAMERA BAŞLAT
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      videoRef.current.srcObject = stream
      setCameraActive(true)
      scanQRFromCamera()
    } catch (error) {
      alert('Kamera erişimi reddedildi!')
    }
  }

  // KAMERA DURDUR
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
    setCameraActive(false)
    setScanResult('')
  }

  // KAMERADA QR KOD TARA
  const scanQRFromCamera = () => {
    const canvas = canvasRef.current
    const video = videoRef.current

    if (!canvas || !video) return

    const ctx = canvas.getContext('2d')
    const scanInterval = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code) {
          setScanResult(code.data)
          stopCamera()
          clearInterval(scanInterval)
        }
      }
    }, 100)
  }

  // RESİM YÜKLE
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code) {
          setScanResult(code.data)
        } else {
          setScanResult('QR kod bulunamadı! ❌')
        }
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="qr-scanner">
      <h2>✨ QR Kod Oku</h2>

      {!cameraActive ? (
        <>
          <div className="scanner-buttons">
            <button className="camera-btn" onClick={startCamera}>
              📷 Kamera ile Tara
            </button>
          </div>

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
        </>
      ) : (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline></video>
          <button className="stop-btn" onClick={stopCamera}>
            ⏹️ Durdur
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {scanResult && (
        <div className="scan-result">
          <p><strong>Sonuç:</strong></p>
          <p className="result-text">{scanResult}</p>
          <button onClick={() => setScanResult('')}>Temizle</button>
        </div>
      )}
    </div>
  )
}
