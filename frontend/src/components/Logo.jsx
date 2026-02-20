import React, { useContext } from "react";
import { Wrench, Search, MessageSquare, Bell, ArrowRight, User, ShieldCheck, CheckCircle, Smartphone, MapPin } from "lucide-react";
import { StoreContext } from "../context/store";

function LandingPage() {
  const { setShowLogin } = useContext(StoreContext);
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* --- HERO SECTION --- */}
      <section className="w-full relative overflow-hidden pt-24 pb-32 px-6 border-b border-slate-100">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234338ca' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            CAMPUS FACILITY COMMAND CENTER
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 text-slate-900 leading-tight">
            Better Campus. <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Easier Reporting.</span>
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            From a broken chair in the library to a lost set of keys—report any campus issue in seconds. 
            Track progress in real-time and chat directly with the maintenance team.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-2xl mx-auto">
            {/* <button>
              <User size={20} /> Member Login <ArrowRight size={20} />
            </button> */}
            <button onClick={() => setShowLogin(true)}  className="flex-1 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-200">
              <ShieldCheck size={20} /> get started <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="w-full py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            {/* LEFT SIDE: Visual Mockup */}
            <div className="flex w-full max-w-xl">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60" />
                
                {/* Mockup Card */}
                <div className="relative bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Engineering Block</p>
                        <p className="text-xs text-slate-400">Room 402 • 10:15 AM</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider">In Progress</span>
                  </div>

                  {/* Comment Simulation */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-[80%]">
                        I found a broken table leg in the back row.
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Wrench size={14} className="text-indigo-600" />
                      </div>
                      <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%] shadow-lg shadow-indigo-100">
                        Received! A technician is scheduled for 2 PM today.
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors">
                      View All Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Feature Grid */}
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Everything you need <br />
                  <span className="text-indigo-600">to keep campus running.</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  FaciliFix streamlines communication between students and administrators. 
                  No more lost emails or ignored requests—just a simple, transparent fix.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <Feature icon={<MessageSquare className="text-indigo-600" />} title="Report Issues" desc="Broken furniture, electrical faults, or leaks. Report with photos." />
                <Feature icon={<Search className="text-blue-600" />} title="Lost & Found" desc="A digital board to help lost items find their way back home." />
                <Feature icon={<Bell className="text-purple-600" />} title="Live Updates" desc="Notifications sent directly to you when your report status changes." />
                <Feature icon={<Smartphone className="text-emerald-600" />} title="Quick Access" desc="Built for mobile use across all campus buildings and facilities." />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <div className="w-full py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-slate-900">1.2k</p>
              <p className="text-sm text-slate-500 font-medium">Issues Solved</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">15m</p>
              <p className="text-sm text-slate-500 font-medium">Avg Response</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">98%</p>
              <p className="text-sm text-slate-500 font-medium">Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">24/7</p>
              <p className="text-sm text-slate-500 font-medium">Monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Feature = ({ icon, title, desc }) => (
  <div className="group">
    <div className="mb-4 p-3 bg-white rounded-xl shadow-sm border border-slate-100 inline-block group-hover:shadow-md transition-shadow">
      {icon}
    </div>
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;