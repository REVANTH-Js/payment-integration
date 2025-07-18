import { useState, useRef } from "react"
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import { Send, Paperclip, X } from "lucide-react"
import Markdown from "react-markdown"

const API_KEY = "AIzaSyAh59f8TVDVrvW0760l"  // Replace with your working key
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

function GeminiChat() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef()

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...selected])
  }

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result.split(",")[1])
      reader.onerror = reject
    })
  }

  const handleSubmit = async () => {
    if (!input.trim() && files.length === 0) return
    setLoading(true)
    setOutput("Thinking...")

    const parts = []
    if (input.trim()) parts.push({ text: input })

    for (const file of files) {
      const base64 = await fileToBase64(file)
      parts.push({
        inlineData: {
          data: base64,
          mimeType: file.type,
        }
      })
    }

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      })
      setOutput(await result.response.text())
    } catch (err) {
      console.error(err)
      setOutput("❌ Failed to generate response.")
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="h-screen flex flex-col bg-[#f3f4f6]">
      {/* Chat display area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-md max-w-3xl">
          <h2 className="font-bold text-lg">Gemini AI</h2>
          {output ? (
            <div className="mt-2 prose max-w-none">
              <Markdown>{output}</Markdown>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No response yet.</p>
          )}
        </div>
      </div>

      {/* File preview */}
      {files.length > 0 && (
        <div className="p-2 bg-gray-100 border-t">
          <h4 className="text-sm mb-2 font-semibold text-gray-700">Attached Files</h4>
          <ul className="flex gap-2 flex-wrap">
            {files.map((file, index) => (
              <li key={index} className="bg-white p-2 border rounded-md flex items-center gap-2">
                <Paperclip size={16} />
                <span className="text-sm">{file.name}</span>
                <button onClick={() => removeFile(index)} className="text-red-500"><X size={14} /></button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-white shadow-inner border-t flex gap-2 items-center">
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,audio/*,application/pdf,text/plain"
          multiple
        />
        <button onClick={() => fileInputRef.current.click()} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
          <Paperclip size={18} />
        </button>
        <input
          type="text"
          placeholder="Ask me something..."
          className="flex-1 p-2 border rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit()
          }}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "..." : <Send size={18} />}
        </button>
      </div>
    </div>
  )
}

export default GeminiChat
