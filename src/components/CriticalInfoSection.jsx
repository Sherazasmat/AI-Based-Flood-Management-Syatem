import React from 'react';
import { Phone, BookOpen, Building2, ShieldCheck, Truck, LifeBuoy, Hospital, Ambulance } from 'lucide-react';

const CriticalInfoSection = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Small Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-red-100 px-4 py-1.5 rounded-full border border-red-100">
            <LifeBuoy size={16} className="text-red-600" />
            <span className="text-md font-semibold text-red-600">Emergency Resources</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Critical Information & Resources
          </h2>
          <p className="text-slate-500 text-lg">
            Essential contacts, safety guidelines, and emergency protocols
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
          
          {/* Left Column: Emergency Contacts */}
          <div className="bg-orange-100/70 rounded-[2.5rem] p-8 md:p-10 border border-orange-100/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-red-500 p-3 rounded-2xl shadow-lg shadow-red-200 text-white">
                <Phone size={28} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Emergency Contacts</h3>
            </div>

            <div className="space-y-6">
              {/* Service 1 */}
              <div className="bg-white p-6 rounded-3xl shadow-md flex items-center justify-between border border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="bg-red-50 p-3 rounded-2xl text-red-500">
                    <Hospital size={24} />
                  </div>
                  <div>
                    <h4 className=" text-lg font-bold text-slate-900">Emergency Services</h4>
                    <p className="text-base text-slate-600">24/7 Emergency Hotline</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-red-500">911</span>
              </div>

              {/* Service 2 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center justify-between border border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-2xl text-blue-500">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Disaster Management</h4>
                    <p className="text-base text-slate-600">Flood Response Team</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-blue-600">1-800-FLOOD</span>
              </div>

              {/* Service 3 */}
              <div className=" bg-white p-6 rounded-3xl shadow-sm flex items-center justify-between border border-slate-50">
                <div className="flex items-center gap-6">
                  <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-500">
                    <Ambulance size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Medical Assistance</h4>
                    <p className="text-base text-slate-600">Emergency Medical Services</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-emerald-500">1-800-MEDIC</span>
              </div>
            </div>
          </div>

          {/* Right Column: Safety Guidelines */}
          <div className="bg-cyan-100/70 rounded-[2.5rem] p-8 md:p-10 border border-cyan-100/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200 text-white">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-600">Safety Guidelines</h3>
            </div>

            <div className="space-y-4">
              {/* Guideline 1 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex items-start gap-5 border border-slate-50">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Move to Higher Ground</h4>
                  <p className="text-base text-slate-600 leading-relaxed mt-1">
                    Evacuate immediately to elevated areas when flood warning is issued
                  </p>
                </div>
              </div>

              {/* Guideline 2 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex items-start gap-5 border border-slate-50">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Avoid Floodwater</h4>
                  <p className="text-base text-slate-600 leading-relaxed mt-1">
                    Never walk or drive through flood water - 6 inches can knock you down
                  </p>
                </div>
              </div>

              {/* Guideline 3 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex items-start gap-5 border border-slate-50">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Emergency Kit Ready</h4>
                  <p className="text-base text-slate-600 leading-relaxed mt-1">
                    Keep water, food, medications, and important documents in waterproof container
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CriticalInfoSection;