import React, { useState, useEffect } from 'react';
import { HabitData } from '../types';
import { generateDataAnalysis, askChatbot } from '../services/geminiService';

interface AIInsightProps {
  data: HabitData[];
}

const AIInsight: React.FC<AIInsightProps> = ({ data }) => {
  const [analysis, setAnalysis] = useState<{ summary: string, recommendation: string, keyTakeaway: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState(false);

  const handleGenerateAnalysis = async () => {
    setLoading(true);
    const result = await generateDataAnalysis(data);
    setAnalysis(result);
    setLoading(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatInput.trim()) return;
      
      setChatLoading(true);
      const response = await askChatbot(chatInput, data);
      setChatResponse(response);
      setChatLoading(false);
  }

  // Auto-generate on mount for immediate value
  useEffect(() => {
    handleGenerateAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Analysis Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Analisis AI Gemini</h2>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-white/30 rounded w-3/4"></div>
              <div className="h-4 bg-white/30 rounded w-1/2"></div>
              <div className="h-20 bg-white/30 rounded w-full mt-6"></div>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              <div>
                <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider mb-1">Ringkasan Data</p>
                <p className="text-lg leading-relaxed">{analysis.summary}</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <p className="text-yellow-300 text-sm font-bold mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                  Rekomendasi
                </p>
                <p className="text-indigo-50">{analysis.recommendation}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  "{analysis.keyTakeaway}"
                </p>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleGenerateAnalysis}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Generate Analisis
            </button>
          )}
        </div>
      </div>

      {/* Chat Card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 flex flex-col">
         <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Tanya AI tentang Data</h3>
            <p className="text-slate-500 text-sm">Tanyakan tren, saran, atau detail spesifik tentang kebiasaan anak hebat.</p>
         </div>

         <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[200px] min-h-[150px] pr-2">
            {chatResponse && (
                <div className="bg-slate-50 p-4 rounded-xl rounded-tl-none border border-slate-100">
                    <p className="text-slate-700 text-sm leading-relaxed">{chatResponse}</p>
                </div>
            )}
            {chatLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-75">●</span>
                    <span className="animate-bounce delay-150">●</span>
                    <span>Sedang mengetik...</span>
                </div>
            )}
         </div>

         <form onSubmit={handleChatSubmit} className="relative">
             <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Contoh: Apa kebiasaan paling dominan?"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
             />
             <button 
                type="submit"
                disabled={chatLoading || !chatInput}
                className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
             </button>
         </form>
      </div>
    </div>
  );
};

export default AIInsight;