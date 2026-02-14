import React from 'react';
import { 
  Database, 
  Satellite, 
  Waves, 
  CloudRain, 
  History,
  Brain,
  ChartLine
} from 'lucide-react';

const PredictionsSection = () => {
// Data for the left panel
const ProgressBar = ({ label, value, progress }) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <span className="text-slate-600 font-semibold text-lg tracking-tight">{label}</span>
      <span className="text-slate-800 font-semibold text-lg tracking-tighter">{value}</span>
    </div>
    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-600 rounded-full transition-all duration-1000"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);


  // Data for the right panel

  const dataSources = [
    {
      title: 'Weather Satellites',
      desc: 'Real-time atmospheric data',
      status: 'Active',
      icon: <Satellite size={20} className="text-blue-600" />,
      iconBg: 'bg-blue-100',
      statusColor: 'text-green-600'
    },
    {
      title: 'River Sensors',
      desc: 'Water level monitoring',
      status: 'Active',
      icon: <Waves size={20} className="text-cyan-600" />,
      iconBg: 'bg-cyan-100',
      statusColor: 'text-green-600'
    },
    {
      title: 'Rain Gauges',
      desc: 'Precipitation measurement',
      status: 'Active',
      icon: <CloudRain size={20} className="text-orange-600" />,
      iconBg: 'bg-orange-100',
      statusColor: 'text-green-600'
    },
    {
      title: 'Historical Data',
      desc: '10 years of flood records',
      status: 'Archive',
      icon: <History size={20} className="text-purple-600" />,
      iconBg: 'bg-purple-100',
      statusColor: 'text-blue-600'
    }
  ];

  return (
    <div className="w-full relative p-10 bg-white flex flex-col items-center  font-sans">
      
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-1.5 rounded-full border border-purple-100 mb-6">
          <Brain size={20} className="text-purple-600 " />
          <span className="text-purple-600 text-md font-bold tracking-tight">AI-Powered Analytics</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Machine Learning Predictions</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Advanced neural networks analyzing historical data and real-time sensors for accurate flood forecasting
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full p-15">
        
        {/* Left Panel: Prediction Accuracy */}
        <div className="bg-purple-200/40 rounded-[2.5rem] p-10 border border-purple-50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Prediction Accuracy</h2>
            <div className="bg-purple-600 px-1.5 py-3 rounded-xl">
              <ChartLine size={24} className="text-white" />
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-1">
              <span className="text-7xl font-black text-purple-600 leading-none tracking-tighter">98.3</span>
              <span className="text-4xl ml-2 font-black text-purple-400 leading-none">%</span>
            </div>
            <p className="text-slate-600 font-semibold text-lg mt-4">Based on last 1000 predictions</p>
          </div>

          {/* Progress Bars */}
          <div className="space-y-8">
            <ProgressBar label="Short-term (0-6h)" value="99.2%" progress={99.2} />
            <ProgressBar label="Medium-term (6-24h)" value="97.8%" progress={97.8} />
            <ProgressBar label="Long-term (24-72h)" value="95.6%" progress={95.6} />
          </div>
        </div>

        {/* Right Panel: Data Sources */}
        <div className="bg-blue-200/40 rounded-[2.5rem] p-10 border border-blue-50">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Data Sources</h2>
            <div className="bg-blue-600 px-1.5 py-3 rounded-xl">
              <Database size={25} className="text-white " />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {dataSources.map((source, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-sm border border-blue-100/20 border-none transition-all duration-200 hover:shadow-xl cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className={`${source.iconBg} p-4 rounded-2xl`}>
                    {source.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-tight">{source.title}</h4>
                    <p className="text-slate-600 text-md mt-0.5">{source.desc}</p>
                  </div>
                </div>
                <span className={`text-lg font-bold ${source.statusColor}`}>{source.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Progress Bar Component
const ProgressBar = ({ label, value, progress }) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <span className="text-slate-600 font-bold text-sm tracking-tight">{label}</span>
      <span className="text-slate-800 font-black text-sm tracking-tighter">{value}</span>
    </div>
    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-600 rounded-full transition-all duration-1000"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default PredictionsSection;