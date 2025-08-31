"use client"
//for individual stats of a website.import React from 'react';

import { ArrowLeft, Globe, ExternalLink, Activity, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Tick {
  id: string;
  timestamp: Date;
  status: 'up' | 'down';
  responseTime: number;
}

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  uptime: number;
  responseTime: number;
  lastChecked: Date;
}

interface WebsiteDetailsProps {
  website: Website;
}

const WebsiteDetails: React.FC<WebsiteDetailsProps> = ({ website }) => {
    const router = useRouter();
  // Generate sample tick data for the last 10 checks
  const generateTicks = (): Tick[] => {
    const ticks: Tick[] = [];
    const now = new Date();
    
    for (let i = 9; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000); // Every 5 minutes
      const isUp = Math.random() > (website.status === 'down' ? 0.7 : 0.1); // Bias based on current status
      
      ticks.push({
        id: `tick-${i}`,
        timestamp,
        status: isUp ? 'up' : 'down',
        responseTime: isUp ? Math.floor(Math.random() * 300) + 100 : 0,
      });
    }
    
    return ticks;
  };

  const ticks = generateTicks();
  const avgResponseTime = Math.floor(ticks.filter(t => t.status === 'up').reduce((sum, t) => sum + t.responseTime, 0) / ticks.filter(t => t.status === 'up').length) || 0;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusIcon = (status: Website['status']) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'down':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'checking':
        return <Clock className="w-6 h-6 text-yellow-500 animate-pulse" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Website Details</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Website Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <Globe className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{website.name}</h2>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <span>{website.url}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(website.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    website.status === 'up' 
                      ? 'bg-green-100 text-green-800' 
                      : website.status === 'down' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {website.status === 'up' ? 'Online' : website.status === 'down' ? 'Offline' : 'Checking'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-3xl font-bold text-gray-900">{website.uptime}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className={`h-2 rounded-full ${
                  website.uptime >= 99 ? 'bg-green-500' : website.uptime >= 95 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${website.uptime}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900">{avgResponseTime}ms</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Checked</p>
                <p className="text-lg font-semibold text-gray-900">{formatTime(website.lastChecked)}</p>
                <p className="text-sm text-gray-500">
                  {Math.floor((Date.now() - website.lastChecked.getTime()) / 60000)}m ago
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Checks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Checks</h3>
            <p className="text-sm text-gray-600 mt-1">Last 10 monitoring checks (every 5 minutes)</p>
          </div>

          <div className="p-6">
            {/* Status Timeline */}
            <div className="flex items-center space-x-1 mb-6">
              {ticks.map((tick, index) => (
                <div
                  key={tick.id}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer ${
                    tick.status === 'up' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                  title={`${tick.status === 'up' ? 'Online' : 'Offline'} at ${formatTime(tick.timestamp)} - ${tick.responseTime}ms`}
                >
                  {tick.status === 'up' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              ))}
              <div className="ml-4 text-sm text-gray-500">
                ← Most recent
              </div>
            </div>

            {/* Detailed Table */}
          </div>
        </div>
      </main>
    </div>
  );
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

export default WebsiteDetails;