// File: client/src/components/FloatingChatButton.jsx
import { useState } from "react"
import { Bot } from "lucide-react"
import GeminiChat from "./Gemini" // Adjust this import path if needed
// import <index className="css"></index>

function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <div className="chatbot">
      {/* Floating button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
        title="Chat with AI"
      >
        <Bot size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-[350px] max-h-[80vh] bg-white border border-gray-300 rounded-lg shadow-xl z-50 overflow-auto">
          <div className="flex justify-between items-center p-2 border-b bg-blue-600 text-white rounded-t-lg">
            <h4 className="text-sm font-semibold">Gemini AI Chat</h4>
            <button onClick={toggleChat} className="text-white text-sm">✖</button>
          </div>
          <div className="p-3">
            <GeminiChat />
          </div>
        </div>
      )}
    </div>
  )
}

export default FloatingChatButton
