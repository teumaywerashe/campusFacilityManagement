import React from "react";
import { Wrench, Droplet, Lightbulb } from "lucide-react";

function Logo() {
  return (
    // Main Container: Deep Gradient Background
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 relative overflow-hidden min-h-[300px] md:min-h-screen p-8 text-white">
      
      {/* Decorative Background Blobs (Glow Effects) */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Icon Container: Glassmorphism Effect */}
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl flex items-center justify-center">
            
            {/* Icons positioned in a triangle */}
            <div className="relative w-full h-full animate-spin-slow">
              {/* Lightbulb - Top */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
                <Lightbulb className="w-8 h-8 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]" />
              </div>
              
              {/* Wrench - Bottom Left */}
              <div className="absolute bottom-6 left-6">
                <Wrench className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              </div>

              {/* Droplet - Bottom Right */}
              <div className="absolute bottom-6 right-6">
                <Droplet className="w-7 h-7 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              </div>
            </div>
            
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-sm">
            FACILIFIX
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide max-w-sm mx-auto">
            Streamline Your Campus Solutions
          </p>
        </div>
        
        {/* Optional: Small divider line */}
        <div className="w-16 h-1 bg-indigo-500 rounded-full mt-8 mx-auto opacity-50"></div>
      </div>
    </div>
  );
}

export default Logo;