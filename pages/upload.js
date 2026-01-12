import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    const formData = new FormData(e.target);
    
    // For now, just show a message since we need PDF parsing setup
    setTimeout(() => {
      setUploading(false);
      setMessage('Upload functionality requires PDF parsing setup. Please configure OpenAI API and upload endpoint.');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Upload Recipe | My Recipe Cookbook</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                📤 Upload Recipe
              </h1>
              <Link href="/">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold">
                  ← Back to Home
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload a Recipe PDF</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe PDF File
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This feature requires backend configuration with OpenAI API for PDF parsing.
                  The upload functionality will be available once the backend is properly set up.
                </p>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Recipe'}
              </button>
            </form>

            {message && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">{message}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
