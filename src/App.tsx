import React, { useState } from 'react';
import { Book, AlertCircle } from 'lucide-react';
import { Toggle } from './components/Toggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { BIBLE_BOOKS } from './constants';
import { getBookExplanation } from './api';

function App() {
  const [selectedBook, setSelectedBook] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) {
      setError('Please select a book');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const result = await getBookExplanation(selectedBook);
      setExplanation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch book explanation. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedBook('');
    setExplanation('');
    setError('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-b from-blue-900 to-blue-800' : 'bg-gradient-to-b from-blue-100 to-blue-50'
    }`}>
      <div className="max-w-5xl mx-auto px-6 py-10 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          <h1 className={`text-4xl sm:text-5xl font-bold flex items-center gap-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Book className="h-10 w-10 text-blue-600" />
            Bible Explanations
          </h1>
          <Toggle enabled={isDarkMode} onChange={setIsDarkMode} />
        </div>

        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xl py-3 px-4"
            >
              <option value="">Select a Book</option>
              {BIBLE_BOOKS.map((book) => (
                <option key={book} value={book}>
                  {book}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-8 py-3 text-xl bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                Go
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-8 py-3 text-xl bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                Clear
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-xl">
            <AlertCircle className="h-6 w-6 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className={`rounded-lg p-8 mb-10 shadow-lg ${
          isDarkMode ? 'bg-blue-800 text-white' : 'bg-white text-gray-800'
        }`}>
          {isLoading ? (
            <LoadingSpinner />
          ) : explanation ? (
            <div className="leading-relaxed space-y-8">
              {explanation.split('\n').map((line, i) => (
                <p key={i} className="text-xl sm:text-2xl leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className={`text-center text-xl ${
              isDarkMode ? 'text-blue-200' : 'text-gray-500'
            }`}>
              Select a book and click "Go" to see its explanation
            </p>
          )}
        </div>

        <footer className={`text-center text-lg ${
          isDarkMode ? 'text-blue-200' : 'text-gray-600'
        }`}>
          Created by Quintin - Powered by AI
        </footer>
      </div>
    </div>
  );
}

export default App;