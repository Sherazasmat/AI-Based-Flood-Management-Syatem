import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FloodAlerts from './pages/FloodAlerts'
import LiveMap from './pages/LiveMap'
import LiveChatBoard from './pages/LiveChatBoard'
import Analytics from './pages/Analytics'
import SafetyGuide from './pages/SafetyGuide'
import Community from './pages/Community'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route without sidebar */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Routes with sidebar layout */}
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/flood-alerts" element={
          <Layout>
            <FloodAlerts />
          </Layout>
        } />
        <Route path="/live-map" element={
          <Layout>
            <LiveMap />
          </Layout>
        } />
        <Route path="/live-chat" element={
          <LiveChatBoard />
        } />
        <Route path="/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />
        <Route path="/safety-guide" element={
          <Layout>
            <SafetyGuide />
          </Layout>
        } />
        <Route path="/community" element={
          <Layout>
            <Community />
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout>
            <Settings />
          </Layout>
        } />
        
        {/* Redirect root to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
