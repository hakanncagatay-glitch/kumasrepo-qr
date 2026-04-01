import { useState, useRef } from 'react'
import jsQR from 'jsqr'
import '../styles/QRCodeReader.css'

export default function QRCodeReader() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      videoRef.current.srcObject = stream
      setError(null)
    } catch (err) {
      setError('Kamera erişimi reddedildi: ' + err.message)
    }
  }

  const captureFrame = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height)

    if (code) {
      setResult(code.data)
      setError(null)
    } else {
      setError('QR kod bulunamadı')
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <div className="reader-container">
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay playsInline></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>

      <div className="controls">
        <button onClick={startCamera}>📷 Kamerayi Aç</button>
        <button onClick={captureFrame}>📸 Fotoğraf Çek</button>
        <button onClick={stopCamera}>🛑 Kamerayı Kapat</button>
      </div>

      {result && (
        <div className="result success">
          <h3>✅ QR Kod Okundu!</h3>
          <p>{result}</p>
          <button onClick={() => {
            navigator.clipboard.writeText(result)
            alert('Kopyalandı!')
          }}>📋 Kopyala</button>
        </div>
      )}

      {error && <div className="result error">⚠️ {error}</div>}
    </div>
  )
}
