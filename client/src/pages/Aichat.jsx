// File: client/src/pages/AiChat.jsx
import React, { useState } from 'react';

function AiChat() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      setReply('Error contacting AI backend');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ask AI</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="form-group">
          <textarea
            className="form-control"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your question..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      {reply && (
        <div className="alert alert-info">
          <strong>AI says:</strong> {reply}
        </div>
      )}
    </div>
  );
}

export default AiChat;