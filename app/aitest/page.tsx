'use client';

import { useState, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [displayedResponse, setDisplayedResponse] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDisplayedResponse('');
    setIsTyping(true);

    try {
      const body = { prompt, imageUrl: imageUrl || undefined };
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      
      if (data?.response) {
        simulateTyping(data.response);
      } else {
        setResponse('No valid response from the Gemini model.');
        setIsTyping(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to fetch response.');
      setIsTyping(false);
    } finally {
      setLoading(false);
    }
  };

  const simulateTyping = (text: string) => {
    let index = 0;
    const words = text.split(' ');
    const typeInterval = setInterval(() => {
      setDisplayedResponse((prev) => prev + ' ' + words[index]);
      index += 1;
      if (index === words.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 100);
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-900 text-white p-6 min-h-[101dvh]">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Gemini 2.0 AI Assistant</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
          />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL (optional)"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition disabled:bg-gray-600 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          {loading && <p className="text-blue-400">Loading...</p>}
          {isTyping && <p className="text-green-400">Gemini 2.0 is typing...</p>}
          <p className="text-gray-300 whitespace-pre-line">{displayedResponse}</p>
          {response && <p className="text-red-400 mt-2">{response}</p>}
        </div>
      </div>
    </div>
  );
}