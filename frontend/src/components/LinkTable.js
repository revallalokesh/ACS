import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { linkAPI } from '../services/api';

const LinkTable = ({ links, onLinkDeleted, searchTerm }) => {
  const [deletingCode, setDeletingCode] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const filteredLinks = links.filter(link => 
    link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (code) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    
    setDeletingCode(code);
    try {
      await linkAPI.deleteLink(code);
      onLinkDeleted(code);
    } catch (err) {
      alert('Failed to delete link');
    } finally {
      setDeletingCode(null);
    }
  };

  const handleCopy = async (code) => {
    const shortUrl = `${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/${code}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (filteredLinks.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔗</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm ? 'No links found' : 'No links yet'}
        </h3>
        <p className="text-gray-500">
          {searchTerm 
            ? 'Try adjusting your search terms' 
            : 'Create your first short link to get started'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Clicked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLinks.map((link) => (
              <tr key={link.code} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Link 
                      to={`/code/${link.code}`}
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      {link.code}
                    </Link>
                    <button
                      onClick={() => handleCopy(link.code)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Copy short URL"
                    >
                      {copiedCode === link.code ? (
                        <span className="text-green-600 text-xs">✓</span>
                      ) : (
                        <span className="text-xs">📋</span>
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 truncate max-w-xs" title={link.url}>
                    {link.url}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {link.clicks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {link.lastClicked ? formatDate(link.lastClicked) : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(link.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(link.code)}
                    disabled={deletingCode === link.code}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    {deletingCode === link.code ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkTable;