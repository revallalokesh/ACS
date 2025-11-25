import React, { useState, useEffect } from 'react';
import LinkForm from '../components/LinkForm';
import LinkTable from '../components/LinkTable';
import { linkAPI } from '../services/api';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const data = await linkAPI.getAllLinks();
      setLinks(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkCreated = (newLink) => {
    setLinks(prev => [newLink, ...prev]);
  };

  const handleLinkDeleted = (deletedCode) => {
    setLinks(prev => prev.filter(link => link.code !== deletedCode));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          URL Shortener Dashboard
        </h1>
        <p className="text-gray-600">
          Create and manage your short links
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button 
            onClick={fetchLinks}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Create Link Form */}
      <LinkForm onLinkCreated={handleLinkCreated} />

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Links ({links.length})
          </h2>
          {links.length > 0 && (
            <div className="text-sm text-gray-500">
              Total clicks: {links.reduce((sum, link) => sum + link.clicks, 0)}
            </div>
          )}
        </div>
        
        {links.length > 0 && (
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full sm:w-64"
            />
          </div>
        )}
      </div>

      {/* Links Table */}
      <LinkTable 
        links={links}
        onLinkDeleted={handleLinkDeleted}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Dashboard;