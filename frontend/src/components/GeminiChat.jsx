import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import{useNavigate} from 'react-router-dom'

const ChatArea = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate=useNavigate();
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-resize textarea and scroll to bottom
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    scrollToBottom();
  }, [input, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      // Get AI response
      const result = await axios.post(
        "http://localhost:4000/api/user/geminiTalk",
        { prompt: input }
      );
      
      // Add AI response to chat
      const aiMessage = { text: result.data.result, sender: "ai" };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      const errorMessage = { text: "Sorry, I couldn't process your request.", sender: "ai" };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="m-2 flex flex-col h-screen">
      <header className="m-4 border-b rounded-xl bg-gray-300 border-gray-500 flex justify-between">
        <span onClick={()=>{
          navigate("/");
          scrollTo(0,0);
        }} className="p-2"><img src={assets.logo} alt="" className="h-7 rounded-xl" /></span>
        <span className=" p-2 text-xl font-semibold text-center">Medical Peer</span>
        <span   onClick={()=>{
          navigate("/");
          scrollTo(0,0);
        }} className="p-2"><img src={assets.Back_icon} alt="" className="h-7 rounded-xl "  /></span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="italic text-center  text-gray-500 mt-4">
            Start a conversation with Medical Peer
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-300">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            className="flex-1 px-4 py-2 border-2 border-blue-400 rounded-3xl  break-words  resize-none overflow-hidden focus:outline-green-400 placeholder:text-gray-400"
            value={input}
            onChange={handleInputChange}
            onKeyDown ={handleKeyPress}
            placeholder="Type your message here..."
            rows="1"
          />
          <button
            className="px-4 py-2 shadow-xl bg-blue-600 text-white rounded-3xl hover:bg-green-500 focus:outline-green-900"
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;