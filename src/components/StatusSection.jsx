import React from 'react';
import {
  AlertTriangle, ShieldAlert, MapPin, CheckCircle2, Clock
} from 'lucide-react';

const StatusSection = () => {
  return (
    // Background match with previous sections
    <section className="w-full bg-[#F8FAFC] mb-15 font-sans flex flex-col items-center">


      <div className="w-full p-16 border-2 border-dashed border-blue-200  relative">

        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">
            <ShieldAlert size={14} className="text-orange-500" />
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">AI Risk Assessment</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Current Flood Risk Status
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Machine learning algorithms analyzing multiple data sources in real-time.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">

          {/* Column 1: Risk Level Card */}
          <div className="bg-white border border-amber-200 rounded-[2.5rem] p-8 shadow-md relative transition-all hover:shadow-xl">
            <div className="flex justify-between gap-4 items-start mb-8">
              <h3 className="font-bold text-slate-800 items-center text-xl">Risk Level</h3>
              <div className="p-2 bg-orange-500/2 justify-center rounded-xl text-orange-600">
                <AlertTriangle size={20} />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-5xl font-black text-orange-400 tracking-tighter mb-2">WARNING</h2>
              <p className="text-amber-700/70 text-sm font-semibold">Moderate to High Risk Detected</p>
            </div>

            <div className="space-y-5 pt-6 border-t border-amber-200/50">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-400">Confidence Level</span>
                <span className="text-slate-800">87%</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-400">Alert Priority</span>
                <span className="text-red-500">High</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-400">Last Assessment</span>
                <span className="text-slate-800">2 min ago</span>
              </div>
            </div>
          </div>

          {/* Column 2: Affected Areas Card */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-md transition-all hover:shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-bold text-slate-800 text-xl">Affected Areas</h3>
              <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                <MapPin size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-100/50">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                  <span className="font-bold text-slate-800 text-sm">Riverside District</span>
                </div>
                <span className="text-[10px] font-black text-rose-600 uppercase">Critical</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                  <span className="font-bold text-slate-800 text-sm">Downtown Valley</span>
                </div>
                <span className="text-[10px] font-black text-orange-600 uppercase">Warning</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                  <span className="font-bold text-slate-800 text-sm">East Suburbs</span>
                </div>
                <span className="text-[10px] font-black text-amber-600 uppercase">Watch</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="font-bold text-slate-800 text-sm">North Hills</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 uppercase">Safe</span>
              </div>
            </div>
          </div>

          {/* Column 3: Prediction Timeline Card */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-md transition-all hover:shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-bold text-slate-800 text-xl">Prediction Timeline</h3>
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                <Clock size={20} />
              </div>
            </div>

            <div className="relative pl-6 space-y-10">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100"></div>

              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Now</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Water level rising steadily</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-4 border-rose-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">+6 Hours</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Peak water level expected</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-4 border-amber-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">+12 Hours</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Gradual water recession</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">+24 Hours</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Safe conditions restored</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatusSection;