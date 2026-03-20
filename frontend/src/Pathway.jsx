import React, { useRef, useState } from "react";

const roadmapSteps = [
  { id: 1, title: "Introduction", status: "completed", x: 100, y: 350, color: "bg-emerald-400" },
  { 
    id: 2, 
    title: "Learn SQL Fundamentals", 
    status: "active", 
    x: 350, 
    y: 250, 
    color: "bg-green-400",
    description: [
      "Start with basic queries and functions",
      "Practice filtering and joining data",
      "Complete this module",
    ]
  },
  { id: 3, title: "Advanced SQL", status: "locked", x: 600, y: 150, color: "bg-violet-500" },
  { id: 4, title: "Data Visualization", status: "locked", x: 850, y: 80, color: "bg-violet-500" },
  { id: 5, title: "Final Project", status: "locked", x: 1100, y: 50, color: "bg-violet-600" },
];

export default function CandyCrushRoadmap() {
  const [selectedStep, setSelectedStep] = useState(roadmapSteps[1]);
  
  // Generate the SVG Path string based on node coordinates
  const pathData = `M ${roadmapSteps.map(s => `${s.x},${s.y}`).join(' L ')}`;

  return (
    <div className="relative w-full h-screen bg-[#f3e8ff] overflow-hidden font-sans">
      {/* Background Glows & Sparkles */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-white pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-300/20 blur-3xl rounded-full" />
      
      {/* Header Info */}
      <div className="absolute top-10 left-10 z-20">
        <div className="bg-white/80 backdrop-blur-md border border-purple-200 px-6 py-3 rounded-2xl shadow-sm text-gray-600 font-medium">
          Estimated Completion Time: <span className="text-purple-600">3–4 months</span>
        </div>
      </div>

      {/* Main Scrollable Area */}
      <div className="w-full h-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide">
        <div className="relative h-full" style={{ width: '1500px' }}>
          
          {/* The Winding Track (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={pathData}
              fill="none"
              stroke="white"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
            />
            <path
              d={pathData}
              fill="none"
              stroke="url(#trackGradient)"
              strokeWidth="24"
              strokeDasharray="1, 15"
              strokeLinecap="round"
              className="opacity-60"
            />
            <defs>
              <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          {roadmapSteps.map((step) => (
            <div
              key={step.id}
              style={{ left: step.x, top: step.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
            >
              {/* Node Button (3D Candy Style) */}
              <button
                onClick={() => setSelectedStep(step)}
                className={`relative w-20 h-20 rounded-full transition-all duration-300 transform 
                  ${step.id === selectedStep.id ? 'scale-110' : 'hover:scale-105 active:scale-95'}
                  ${step.color} shadow-[0_10px_0_0_rgba(0,0,0,0.1),inset_0_-8px_0_0_rgba(0,0,0,0.2),inset_0_8px_0_0_rgba(255,255,255,0.4)]
                  flex items-center justify-center text-white text-3xl font-bold border-4 border-white/50
                `}
              >
                {step.id}
                
                {/* Active Indicator (Pointer) */}
                {step.id === selectedStep.id && (
                  <div className="absolute -top-12 animate-bounce">
                    <div className="w-6 h-8 bg-purple-600 clip-path-triangle rotate-180 rounded-sm shadow-lg" 
                         style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                  </div>
                )}
              </button>

              {/* Title under node */}
              <p className="absolute top-24 left-1/2 -translate-x-1/2 w-32 text-center font-bold text-purple-900/60 text-sm uppercase tracking-wider">
                {step.title}
              </p>

              {/* Tooltip Card (Only for active/selected) */}
              {selectedStep?.id === step.id && step.description && (
                <div className="absolute left-1/2 top-28 -translate-x-1/2 z-30 w-72 bg-white rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
                  {/* Speech bubble arrow */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-bottom-[15px] border-b-white" />
                  
                  <h3 className="text-xl font-bold text-purple-900 mb-4">{step.title}</h3>
                  <ul className="space-y-3">
                    {step.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="text-purple-400 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                  
                  <label className="mt-6 flex items-center gap-3 p-3 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors">
                    <input type="checkbox" className="w-5 h-5 accent-purple-600 rounded" />
                    <span className="text-sm font-semibold text-purple-700">Complete this module</span>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Chat Bottom Bar */}
      <div className="fixed bottom-8 left-8 z-40 group cursor-pointer">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-purple-100 hover:shadow-xl transition-all">
          <div className="relative">
            <img src="https://i.pravatar.cc/100?img=32" alt="Mentor" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
          </div>
          <span className="font-bold text-purple-800">Mentor Chat</span>
          <span className="text-purple-300 group-hover:translate-x-1 transition-transform">❯</span>
        </div>
      </div>
    </div>
  );
}