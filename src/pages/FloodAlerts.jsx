import React, { useState, useMemo } from 'react';
import {
  Download,
  Plus,
  Search,
  MapPin,
  Clock,
  MoreVertical,
  AlertTriangle,
  Waves,
  Target,
  X,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';

const FloodAlerts = () => {
  // Sample alert data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Flash Flood Emergency',
      severity: 'EMERGENCY',
      description: 'Severe flash flooding in progress. Water levels rising rapidly. Immediate evacuation recommended for low-lying areas. Road closures in effect on Highway 95 and Main Street.',
      location: 'Miami Beach, FL',
      timeAgo: '2 hours ago',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: 'triangle',
      color: 'red'
    },
    {
      id: 2,
      type: 'River Flood Warning',
      severity: 'WARNING',
      description: 'Colorado River expected to exceed flood stage by 3 feet. Minor to moderate flooding anticipated along riverbanks. Residents near the river should prepare for possible evacuation.',
      location: 'Austin, TX',
      timeAgo: '5 hours ago',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      icon: 'circle',
      color: 'orange'
    },
    {
      id: 3,
      type: 'River Flood Warning',
      severity: 'EMERGENCY',
      description: 'Colorado River expected to exceed flood stage by 3 feet. Minor to moderate flooding anticipated along riverbanks. Residents near the river should prepare for possible evacuation.',
      location: 'New Orleans, LA',
      timeAgo: '1 hour ago',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      icon: 'waves',
      color: 'red'
    },
    {
      id: 4,
      type: 'River Flood Warning',
      severity: 'WARNING',
      description: 'Colorado River expected to exceed flood stage by 3 feet. Minor to moderate flooding anticipated along riverbanks. Residents near the river should prepare for possible evacuation.',
      location: 'Charleston, SC',
      timeAgo: '8 hours ago',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      icon: 'waves',
      color: 'orange'
    },
    {
      id: 5,
      type: 'River Flood Warning',
      severity: 'WARNING',
      description: 'Colorado River expected to exceed flood stage by 3 feet. Minor to moderate flooding anticipated along riverbanks. Residents near the river should prepare for possible evacuation.',
      location: 'Portland, OR',
      timeAgo: '12 hours ago',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      icon: 'waves',
      color: 'orange'
    },
    {
      id: 6,
      type: 'River Flood Warning',
      severity: 'INFO',
      description: 'Colorado River expected to exceed flood stage by 3 feet. Minor to moderate flooding anticipated along riverbanks. Residents near the river should prepare for possible evacuation.',
      location: 'Seattle, WA',
      timeAgo: '1 day ago',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: 'target',
      color: 'blue'
    },
  ]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 7 Days');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [newAlert, setNewAlert] = useState({
    type: '',
    severity: 'WARNING',
    description: '',
    location: '',
  });

  // Get unique locations from alerts
  const locations = useMemo(() => {
    const unique = [...new Set(alerts.map(alert => alert.location))];
    return ['All Locations', ...unique];
  }, [alerts]);

  // Get unique severities
  const severities = ['All Severity', 'EMERGENCY', 'WARNING', 'INFO'];
  const timeRanges = ['Last 7 Days', 'Last 24 Hours', 'Last 30 Days', 'All Time'];

  // Filter alerts based on search and filters
  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      // Search filter
      const matchesSearch = 
        alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = 
        selectedLocation === 'All Locations' || alert.location === selectedLocation;

      // Severity filter
      const matchesSeverity = 
        selectedSeverity === 'All Severity' || alert.severity === selectedSeverity;

      // Time range filter
      const now = new Date();
      const matchesTime = (() => {
        if (selectedTimeRange === 'All Time') return true;
        const days = selectedTimeRange === 'Last 24 Hours' ? 1 :
                    selectedTimeRange === 'Last 7 Days' ? 7 : 30;
        const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        return alert.timestamp >= cutoffDate;
      })();

      return matchesSearch && matchesLocation && matchesSeverity && matchesTime;
    });
  }, [alerts, searchQuery, selectedLocation, selectedSeverity, selectedTimeRange]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedSeverity('All Severity');
    setSelectedTimeRange('Last 7 Days');
  };

  // Export alerts
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

  // Create new alert
  const handleCreateAlert = () => {
    if (!newAlert.type || !newAlert.description || !newAlert.location) {
      alert('Please fill in all required fields');
      return;
    }

    const alertToAdd = {
      id: alerts.length + 1,
      ...newAlert,
      timeAgo: 'Just now',
      timestamp: new Date(),
      icon: newAlert.severity === 'EMERGENCY' ? 'triangle' : 
            newAlert.severity === 'WARNING' ? 'circle' : 'waves',
      color: newAlert.severity === 'EMERGENCY' ? 'red' :
             newAlert.severity === 'WARNING' ? 'orange' : 'blue'
    };

    setAlerts([alertToAdd, ...alerts]);
    setShowCreateModal(false);
    setNewAlert({ type: '', severity: 'WARNING', description: '', location: '' });
  };

  // Delete alert
  const handleDeleteAlert = (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      setAlerts(alerts.filter(alert => alert.id !== id));
      setOpenMenuId(null);
    }
  };

  // Get icon component
  const getIcon = (iconType, color) => {
    const iconClass = `text-${color}-500`;
    switch (iconType) {
      case 'triangle':
        return <AlertTriangle className={iconClass} size={24} />;
      case 'waves':
        return <Waves className={iconClass} size={24} />;
      case 'target':
        return <Target className={iconClass} size={24} />;
      default:
        return <AlertTriangle className={iconClass} size={24} />;
    }
  };

  // Get severity color classes
  const getSeverityClasses = (severity) => {
    switch (severity) {
      case 'EMERGENCY':
        return {
          border: 'border-l-4 border-red-500',
          badge: 'bg-red-100 text-red-800',
          icon: 'text-red-500'
        };
      case 'WARNING':
        return {
          border: 'border-l-4 border-orange-500',
          badge: 'bg-orange-100 text-orange-800',
          icon: 'text-orange-500'
        };
      default:
        return {
          border: 'border-l-4 border-blue-500',
          badge: 'bg-blue-100 text-blue-800',
          icon: 'text-blue-500'
        };
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flood Alerts</h1>
            <p className="text-gray-500 mt-1">Monitor and manage flood warnings in your area</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              Export
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Create Alert
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-8"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-8"
            >
              {severities.map(sev => (
                <option key={sev} value={sev}>{sev}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-8"
            >
              {timeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X size={18} />
            Clear
          </button>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlerts.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">No alerts found matching your filters.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const severityClasses = getSeverityClasses(alert.severity);
              return (
                <div
                  key={alert.id}
                  className={`bg-white rounded-lg shadow-md ${severityClasses.border} relative overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getIcon(alert.icon, alert.color)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityClasses.badge}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === alert.id ? null : alert.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>
                        {openMenuId === alert.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                // View details functionality
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Eye size={16} />
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                // Edit functionality
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAlert(alert.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{alert.type}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{alert.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{alert.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Create New Alert</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewAlert({ type: '', severity: 'WARNING', description: '', location: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Type *
                </label>
                <input
                  type="text"
                  value={newAlert.type}
                  onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                  placeholder="e.g., Flash Flood Emergency"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity *
                </label>
                <select
                  value={newAlert.severity}
                  onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EMERGENCY">EMERGENCY</option>
                  <option value="WARNING">WARNING</option>
                  <option value="INFO">INFO</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={newAlert.description}
                  onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                  placeholder="Enter alert description..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  value={newAlert.location}
                  onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                  placeholder="e.g., Miami Beach, FL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewAlert({ type: '', severity: 'WARNING', description: '', location: '' });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlert}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {openMenuId && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenuId(null)}
        />
      )}
    </div>
  );
};

export default FloodAlerts;
