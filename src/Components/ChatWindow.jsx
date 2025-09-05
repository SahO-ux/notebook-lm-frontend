import { useState } from "react";
import toast from "react-hot-toast";

import api from "../utils/api";
import ChatMessage from "./ChatMessage";
import ConfirmUploadModal from "../utils/ConfirmUploadModal";

export default function ChatWindow({ onConfirmUploadNewPdf }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", { question: input });
      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      toast.error("Chat failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmUpload = () => {
    setMessages([]); // clear current chat
    setShowModal(false);
    onConfirmUploadNewPdf();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-white">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && <p className="text-sm text-gray-400">Thinking...</p>}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex items-center">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
        <button
          className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => setShowModal(true)}
        >
          Upload New PDF
        </button>
      </div>
      {/* Confirmation Modal */}
      <ConfirmUploadModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmUpload}
      />
    </div>
  );
}
