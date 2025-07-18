import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FloatingChatButton() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed bottom-5 cht"
      style={{
     
        boxShadow: "0 4px 14px rgba(14, 208, 208, 0.2)",
      }}
    >
      <button
        className="bg-white text-black p-3 rounded-full border hover:shadow-xl transition"
        onClick={() => navigate("/chatbot")}
      >
        <Bot />
      </button>
    </div>
  );
}

export default FloatingChatButton;
