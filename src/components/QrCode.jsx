import { useState } from "react"

const QrCode = () => {
    const[img,setImg]=useState("")
    const[loading,setLoading]=useState(false)
    const [qrData,setQrData]=useState("")
    const [qrSize,setQrSize]=useState("")
   async function generateQr()
    {
        setLoading(true)
        try {
           const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
           setImg(url)
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }
    async function downloadQr()
    {
        fetch(img).then((response)=>response.blob().then((blob)=>{
            const link=document.createElement("a")
            link.href=URL.createObjectURL(blob)
            link.download="urQrCodeImg.png"
            document.body.appendChild(link);
            link.click()
            document.body.removeChild(link)
        }))
    }
  return (
    
      <div className="app-container">
        <h1>Qr Code Generator</h1>
        {loading && <p>Please Wait...</p>}
        {img && < img src={img} alt="" className="qr-code-image"/>}
        <div>
        <label htmlFor="dataInput" className="input-label">
            Data for QR code
        </label>
        <input type="text" value={qrData} name="" id="dataInput" placeholder="Enter data for qr code" onChange={(e)=>setQrData(e.target.value)} />
        <label htmlFor="sizeInput" className="input-label">
            Image size 
        </label>
        <input type="text" name="" id="sizeInput" placeholder="Enter image size" value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/>
        <button onClick={generateQr} className="generate-button" disabled={loading}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQr}>Download QR Code</button>
        </div>
      </div>
    
  )
}

export default QrCode
