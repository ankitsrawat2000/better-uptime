import React, { useEffect, useState } from 'react';
import { Plus, Globe, Activity, AlertCircle, CheckCircle, Clock, MoreVertical, ExternalLink, LogOut } from 'lucide-react';
import AddWebsiteModal from './AddWebsiteModal';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Website {
  id: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  responseTime: number;
  lastChecked: string,
}

interface DashboardProps {
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const [websites, setWebsites] = useState<Website[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  //Auto-refresh simulation
  useEffect(() => {
      const response = axios.get(`${BACKEND_URL}/websites`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then((response) => {
        console.log(response);
        setWebsites(response.data.websites.map((w: any) => ({
          id: w.id,
          url: w.url,
          status: w.ticks[0] ? (w.ticks[0].status == "Up" ? 'up' : 'down') : 'checking',
          responseTime: w.ticks[0] ? w.ticks[0].response_time_ms : 0,
          lastChecked: w.ticks[0] ? w.ticks[0].createdAt : Date.now().toString()
        }) ));
      })
  }, []);
  // Debug logging for modal state
  const handleOpenModal = () => {
    console.log('Opening modal, current state:', isModalOpen);
    setIsModalOpen(true);
    console.log('Modal state set to true');
  };

  const handleCloseModal = () => {
    console.log('Closing modal, current state:', isModalOpen);
    setIsModalOpen(false);
    console.log('Modal state set to false');
  };

  const handleAddWebsite = (websiteData: { url: string }) => {
    const newWebsite: Website = {
      id: Date.now().toString(),
      url: websiteData.url,
      status: 'checking',
      responseTime: 0,
      lastChecked: 'Checking...',
    };
    axios.post(`${BACKEND_URL}/website`, {
      url : websiteData.url
    },{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    setWebsites([...websites, newWebsite]);
    setIsModalOpen(false);
  };

  const getStatusIcon = (status: Website['status']) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'down':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'checking':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
    }
  };

  const getStatusBadge = (status: Website['status']) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'up':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'down':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'checking':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  const formatLastChecked = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    }
  };

  const upWebsites = websites.filter(w => w.status === 'up').length;
  const downWebsites = websites.filter(w => w.status === 'down').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">BetterUptime</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Website
              </button>
              <button
                onClick={onSignOut}
                className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}

        {/* Websites Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Monitored Websites</h2>
            <p className="text-sm text-gray-600 mt-1">Track the status and performance of your websites</p>
          </div>

          {websites.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No websites yet</h3>
              <p className="text-gray-600 mb-6">Start monitoring your websites by adding your first one.</p>
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Website
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Checked
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {websites.map((website) => (
                    <tr key={website.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Globe className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm text-gray-500 flex items-center">
                              {website.url}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(website.status)}
                          <span className={getStatusBadge(website.status)}>
                            {website.status === 'up' ? 'Online' : website.status === 'down' ? 'Offline' : 'Checking'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {website.status === 'down' ? 'N/A' : `${website.responseTime}ms`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {website.lastChecked}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => {
                          router.push(`/website/${website.id}`)
                        }} className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Website Modal */}
      <AddWebsiteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddWebsite}
      />
    </div>
  );
};

const formatLastChecked = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  } else {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }
};

export default Dashboard;