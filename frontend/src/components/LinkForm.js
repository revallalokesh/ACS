import React, { useState } from 'react';
import { linkAPI } from '../services/api';

const LinkForm = ({ onLinkCreated }) => {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const validateCode = (code) => {
    if (!code) return true;
    return /^[A-Za-z0-9]{6,8}$/.test(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!url.trim()) {
      setError('URL is required');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    if (code && !validateCode(code)) {
      setError('Code must be 6-8 alphanumeric characters');
      return;
    }

    setLoading(true);

    try {
      const newLink = await linkAPI.createLink(url, code);
      onLinkCreated(newLink);
      setUrl('');
      setCode('');
      setSuccess('Link created successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL *
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Code (optional)
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="abc123"
            className="input-field"
            maxLength={8}
          />
          <p className="text-xs text-gray-500 mt-1">
            6-8 alphanumeric characters. Leave empty to generate automatically.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>
    </div>
  );
};

export default LinkForm;