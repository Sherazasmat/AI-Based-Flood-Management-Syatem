import React, { useState, useMemo } from 'react';
import {
  Download, Plus, Search, MapPin, Clock, MoreVertical,
  AlertTriangle, Waves, Target, X, Trash2, Edit, Eye, AlertCircle
} from 'lucide-react';

const FloodAlerts = () => {
  const [alerts, setAlerts] = useState([
    // {
    //   id: 1,
    //   type: 'Flash Flood Emergency',
    //   severity: 'EMERGENCY',
    //   description: 'Severe flash flooding in progress. Water levels rising rapidly. Immediate evacuation recommended for low-lying areas.',
    //   location: 'Miami Beach, FL',
    //   timeAgo: '2 hours ago',
    //   timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    //   icon: 'triangle',
    //   color: 'red'
    // },
    // {
    //   id: 2,
    //   type: 'River Flood Warning',
    //   severity: 'WARNING',
    //   description: 'Colorado River expected to exceed flood stage by 3 feet. Minor to moderate flooding anticipated along riverbanks.',
    //   location: 'Austin, TX',
    //   timeAgo: '5 hours ago',
    //   timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    //   icon: 'circle',
    //   color: 'orange'
    // },
    // {
    //   id: 3,
    //   type: 'River Flood Warning',
    //   severity: 'EMERGENCY',
    //   description: 'Water levels rising rapidly in low-lying areas. Residents should prepare for possible evacuation.',
    //   location: 'New Orleans, LA',
    //   timeAgo: '1 hour ago',
    //   timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    //   icon: 'waves',
    //   color: 'red'
    // }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 7 Days');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [newAlert, setNewAlert] = useState({ type: '', severity: 'WARNING', description: '', location: '' });

  const locations = useMemo(() => {
    const unique = [...new Set(alerts.map(alert => alert.location))];
    return ['All Locations', ...unique];
  }, [alerts]);

  const severities = ['All Severity', 'EMERGENCY', 'WARNING', 'INFO'];
  const timeRanges = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'];

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch = alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            alert.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedLocation === 'All Locations' || alert.location === selectedLocation;
      const matchesSeverity = selectedSeverity === 'All Severity' || alert.severity === selectedSeverity;
      
      const now = new Date();
      const matchesTime = (() => {
        if (selectedTimeRange === 'All Time') return true;
        const days = selectedTimeRange === 'Last 24 Hours' ? 1 : selectedTimeRange === 'Last 7 Days' ? 7 : 30;
        const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        return alert.timestamp >= cutoffDate;
      })();

      return matchesSearch && matchesLocation && matchesSeverity && matchesTime;
    });
  }, [alerts, searchQuery, selectedLocation, selectedSeverity, selectedTimeRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedSeverity('All Severity');
    setSelectedTimeRange('Last 7 Days');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredAlerts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flood-alerts-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateAlert = () => {
    if (!newAlert.type || !newAlert.description || !newAlert.location) {
      alert('Please fill in all required fields');
      return;
    }
    // FIX: Using Date.now() for unique numeric ID
    const alertToAdd = {
      id: Date.now(), 
      ...newAlert,
      timeAgo: 'Just now',
      timestamp: new Date(),
      icon: newAlert.severity === 'EMERGENCY' ? 'triangle' : newAlert.severity === 'WARNING' ? 'circle' : 'waves',
      color: newAlert.severity === 'EMERGENCY' ? 'red' : newAlert.severity === 'WARNING' ? 'orange' : 'blue'
    };
    setAlerts([alertToAdd, ...alerts]);
    setShowCreateModal(false);
    setNewAlert({ type: '', severity: 'WARNING', description: '', location: '' });
  };

  const handleDeleteAlert = (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      setAlerts(alerts.filter(alert => alert.id !== id));
      setOpenMenuId(null);
    }
  };

  const getIcon = (iconType, color) => {
    const colors = { red: 'text-red-500', orange: 'text-orange-500', blue: 'text-blue-500' };
    const iconClass = colors[color] || 'text-gray-500';
    switch (iconType) {
      case 'triangle': return <AlertTriangle className={iconClass} size={24} />;
      case 'waves': return <Waves className={iconClass} size={24} />;
      case 'target': return <Target className={iconClass} size={24} />;
      case 'circle': return <AlertCircle className={iconClass} size={24} />;
      default: return <AlertTriangle className={iconClass} size={24} />;
    }
  };

  const getSeverityClasses = (severity) => {
    const styles = {
      EMERGENCY: { border: 'border-l-4 border-red-500', badge: 'bg-red-100 text-red-800' },
      WARNING: { border: 'border-l-4 border-orange-500', badge: 'bg-orange-100 text-orange-800' },
      INFO: { border: 'border-l-4 border-blue-500', badge: 'bg-blue-100 text-blue-800' }
    };
    return styles[severity] || styles.INFO;
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen no-scrollbar overflow-y-auto">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6 sticky top-0 z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Flood Alerts</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor and manage flood warnings in real-time</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Download size={18} /> Export
            </button>
            <button onClick={() => setShowCreateModal(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} /> Create
            </button>
          </div>
        </div>

        {/* FILTERS SECTION */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500">
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <select value={selectedSeverity} onChange={(e) => setSelectedSeverity(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500">
            {severities.map(sev => <option key={sev} value={sev}>{sev}</option>)}
          </select>
          <button onClick={clearFilters} className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 shadow-sm"><X size={20} /></button>
        </div>
      </div>

      {/* ALERTS GRID */}
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAlerts.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
              <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No alerts found.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const styles = getSeverityClasses(alert.severity);
              return (
                <div key={alert.id} className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all ${styles.border} relative overflow-visible`}>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {getIcon(alert.icon, alert.color)}
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${styles.badge}`}>{alert.severity}</span>
                      </div>
                      <div className="relative">
                        <button onClick={() => setOpenMenuId(openMenuId === alert.id ? null : alert.id)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>
                        {openMenuId === alert.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Eye size={14}/> View Details</button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Edit size={14}/> Edit</button>
                            <button onClick={() => handleDeleteAlert(alert.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"><Trash2 size={14}/> Delete</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{alert.type}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{alert.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 font-medium"><MapPin size={14} className="text-blue-400"/> {alert.location}</div>
                      <div className="flex items-center gap-1.5"><Clock size={14}/> {alert.timeAgo}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-900 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <AlertCircle size={20} className="text-blue-400" />
                <h2 className="font-bold">Broadcast New Alert</h2>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Title</label>
                <input placeholder="e.g. Flash Flood Emergency" value={newAlert.type} onChange={(e) => setNewAlert({...newAlert, type: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Severity Level</label>
                <select value={newAlert.severity} onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none bg-gray-50 focus:border-blue-500">
                  <option value="EMERGENCY">EMERGENCY (Red)</option>
                  <option value="WARNING">WARNING (Orange)</option>
                  <option value="INFO">INFO (Blue)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Emergency Details</label>
                <textarea placeholder="Describe the situation..." rows={3} value={newAlert.description} onChange={(e) => setNewAlert({...newAlert, description: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Target Location</label>
                <input placeholder="e.g. Miami Beach, FL" value={newAlert.location} onChange={(e) => setNewAlert({...newAlert, location: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:border-blue-500" />
              </div>
              <button onClick={handleCreateAlert} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">Post Alert Now</button>
            </div>
          </div>
        </div>
      )}

      {/* CLICK OVERLAY */}
      {openMenuId && <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />}

      {/* NO-SCROLLBAR CSS */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>
    </div>
  );
};

export default FloodAlerts;