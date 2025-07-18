import React from "react";
import { Link } from "react-router-dom";
import GeminiChat from "../components/Gemini";

export default function FullChatPage() {
  return (
    <div className="full-chat-page">
      <nav className="chat-nav bg-dark text-white d-flex justify-content-between align-items-center p-3">
        <h5 className="m-0">🤖 CodeForGood AI Assistant</h5>
        <Link to="/" className="btn btn-light btn-sm">🔙 Back</Link>
      </nav>

      <div className="chat-container p-3" style={{ height: "calc(100vh - 60px)", overflowY: "auto" }}>
        <GeminiChat />
      </div>
    </div>
  );
}
