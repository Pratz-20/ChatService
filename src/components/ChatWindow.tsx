import { X, Send } from "lucide-react";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

type Message = {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (msg) => console.log("STOMP Debug:", msg)
    });

    client.onConnect = () => {
      console.log("✅ WebSocket Connected");

      client.subscribe("/topic/messages", (msg) => {
        console.log("📩 Received:", msg.body);
      
        const messageText = msg.body.trim();
        setMessages((prev) => [...prev, { text: messageText, sender: "bot", timestamp: new Date() }]);
      
        if (messageText.startsWith("http://") || messageText.startsWith("https://")) {
          try {
            const url = new URL(messageText);
            if (url.hostname.includes("connecticus.in")) {
              // Open in a new tab ONLY for connecticus.in
              window.open(messageText, "_blank");
            } else {
              // Embed all other links in the iframe
              setIframeUrl(messageText);
            }
          } catch (error) {
            console.error("Invalid URL:", messageText);
          }
        }
      });
      

      setStompClient(client);
    };

    client.activate();

    return () => {
      client.deactivate();
      console.log("❌ WebSocket Disconnected");
    };
  }, []);

  const handleSend = () => {
    if (message.trim() && stompClient && stompClient.connected) {
      const userMessage: Message = { text: message, sender: "user", timestamp: new Date() };
      setMessages((prev) => [...prev, userMessage]);
      stompClient.publish({ destination: "/app/process-message", body: message });
      setMessage("");
    } else {
      console.error("❌ Unable to send message: WebSocket not connected.");
    }
  };

  return (
    <div
      className={`fixed bottom-16 right-4 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 flex flex-col transition-all duration-300 ${
        iframeUrl ? "w-[60rem] h-[35rem]" : "w-[30rem] h-[40rem]"
      }`}
    >
      <div className="flex justify-between items-center bg-blue-600 text-white p-3">
        <h2 className="text-lg font-semibold">Chat Support</h2>
        <button onClick={onClose} className="hover:bg-blue-700 rounded-full p-1">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {iframeUrl ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between bg-gray-100 p-2">
              <h2 className="text-lg font-semibold">Job Details</h2>
              <button
                onClick={() => setIframeUrl(null)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
            <iframe
              src={iframeUrl}
              className="w-full flex-1 border border-gray-300 rounded-lg"
              title="Job Details"
            ></iframe>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl p-3 rounded-lg shadow ${
                  msg.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {!iframeUrl && (
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
      )}
    </div>
  );
};

export default ChatWindow;
