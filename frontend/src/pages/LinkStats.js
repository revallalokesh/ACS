import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { linkAPI } from '../services/api';

const LinkStats = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    fetchLinkStats();
  }, [code]);

  const fetchLinkStats = async () => {
    try {
      setLoading(true);
      const data = await linkAPI.getLinkStats(code);
      setLink(data);
      setError('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Link not found');
      } else {
        setError('Failed to fetch link stats');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    
    try {
      await linkAPI.deleteLink(code);
      navigate('/');
    } catch (err) {
      alert('Failed to delete link');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error}
          </h2>
          <p className="text-gray-600 mb-6">
            The link you're looking for doesn't exist or has been deleted.
          </p>
          <Link to="/" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary-600">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-900">{code}</span>
      </nav>

      {/* Header */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Link Statistics
            </h1>
            <p className="text-gray-600">
              Detailed analytics for your short link
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="btn-danger"
          >
            Delete Link
          </button>
        </div>
      </div>

      {/* Link Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Link Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Code
              </label>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                  {link.code}
                </code>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short URL
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={`${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/${link.code}`}
                  readOnly
                  className="input-field flex-1 bg-gray-50"
                />
                <button
                  onClick={() => handleCopy(`${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/${link.code}`)}
                  className="btn-secondary"
                >
                  {copiedUrl ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <div className="bg-gray-50 px-3 py-2 rounded text-sm break-all">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800"
                >
                  {link.url}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Statistics
          </h2>
          
          <div className="space-y-6">
            {/* Click Count */}
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {link.clicks}
              </div>
              <div className="text-sm text-primary-700">
                Total Clicks
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created
                </label>
                <div className="text-sm text-gray-900">
                  {formatDate(link.createdAt)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Clicked
                </label>
                <div className="text-sm text-gray-900">
                  {link.lastClicked ? formatDate(link.lastClicked) : 'Never'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        
        <div className="flex flex-wrap gap-3">
          <a
            href={`${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/${link.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Test Link
          </a>
          
          <button
            onClick={() => handleCopy(`${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/${link.code}`)}
            className="btn-secondary"
          >
            {copiedUrl ? 'Copied!' : 'Copy Short URL'}
          </button>
          
          <Link to="/" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkStats;