import { X, Send } from "lucide-react";
import { useState } from "react";

type Message = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", sender: 'bot', timestamp: new Date() }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Add user message to chat
      const userMessage: Message = {
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setMessage("");

      // Simulate bot response after 1 second
      setTimeout(() => {
        const botResponse: Message = {
          text: `This is a simulated response to: "${message}"`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

 

  return (
    <div className="w-80 md:w-96 h-[28rem] bg-white shadow-xl rounded-t-lg overflow-hidden fixed bottom-16 right-4 flex flex-col border border-gray-200">
      <div className="flex justify-between items-center bg-blue-600 text-white p-3">
        <h2 className="text-lg font-semibold">Chat Support</h2>
        <button onClick={onClose} className="hover:bg-blue-700 rounded-full p-1">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs p-3 rounded-lg shadow ${msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none'}`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;