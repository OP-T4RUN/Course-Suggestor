import React, { useState } from 'react';
import { ArrowLeft, Plus, Send } from 'lucide-react';

const MentorChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'mentor',
      text: "Hi there! How can I assist you in your career journey today?",
      time: "2:16 PM",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: 2,
      sender: 'user',
      text: "Hi Sarah! I'm looking to transition into a data analyst role, but I'm not sure where to start. Do you have any advice?",
      time: "2:18 PM"
    },
    {
      id: 3,
      sender: 'mentor',
      text: "Absolutely! A great starting point would be to learn the basics of SQL and a programming language like Python. Have you had any experience with these before?",
      time: "2:20 PM",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: 4,
      sender: 'user',
      text: "I've done some basic Python, but I haven't learned SQL yet. It sounds like that's really important for data analysis!",
      time: "2:21 PM"
    }
  ]);

  return (
    <div className="flex flex-col h-screen bg-[#F8F4FF]">
      {/* --- Header --- */}
      <header className="flex items-center px-4 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-purple-700" />
        </button>
        
        <div className="flex items-center ml-4">
          <div className="relative">
            <img 
              src="https://i.pravatar.cc/150?u=sarah" 
              alt="Sarah Williams" 
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-purple-900 leading-tight">Sarah Williams</h1>
            <div className="flex items-center text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
              Mentor
            </div>
          </div>
        </div>
      </header>

      {/* --- Chat Area --- */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-col items-end' : 'flex-row items-start'}`}>
              
              <div className="flex items-start gap-3">
                {msg.sender === 'mentor' && (
                  <img src={msg.avatar} alt="avatar" className="w-8 h-8 rounded-full mt-1" />
                )}
                
                <div className={`relative px-5 py-3 rounded-2xl shadow-sm ${
                  msg.sender === 'user' 
                  ? 'bg-[#9D4EDD] text-white rounded-tr-none' 
                  : 'bg-white text-gray-700 rounded-tl-none border border-purple-50'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>

              <span className="text-[10px] text-gray-400 mt-1 px-1 uppercase font-medium tracking-wider">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </main>

      {/* --- Input Area --- */}
      <footer className="p-4 bg-white/80 backdrop-blur-md border-t border-purple-100">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button className="p-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors">
            <Plus className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="w-full py-3 px-5 bg-purple-50/50 border border-purple-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all text-gray-700"
            />
          </div>

          <button className="p-3 bg-[#9D4EDD] text-white rounded-2xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all transform active:scale-95">
            <Send className="w-5 h-5 fill-current" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MentorChat;