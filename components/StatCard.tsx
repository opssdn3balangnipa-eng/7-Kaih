import React from 'react';
import { HabitData, HabitCategory } from '../types';

interface StatCardProps {
  data: HabitData;
}

const categoryColors: Record<HabitCategory, string> = {
  [HabitCategory.DISIPLIN]: 'bg-blue-100 text-blue-700 border-blue-200',
  [HabitCategory.KESEHATAN]: 'bg-green-100 text-green-700 border-green-200',
  [HabitCategory.LITERASI]: 'bg-purple-100 text-purple-700 border-purple-200',
  [HabitCategory.SOSIAL]: 'bg-orange-100 text-orange-700 border-orange-200',
  [HabitCategory.SPIRITUAL]: 'bg-teal-100 text-teal-700 border-teal-200',
};

// Helper to get an emoji based on the activity text
const getIcon = (activity: string): string => {
  const lower = activity.toLowerCase();
  if (lower.includes('bangun')) return '🌅';
  if (lower.includes('makan')) return '🥗';
  if (lower.includes('baca') || lower.includes('belajar')) return '📚';
  if (lower.includes('bantu') || lower.includes('masyarakat')) return '🤝';
  if (lower.includes('ibadah')) return '🕌';
  if (lower.includes('olahraga')) return '⚽';
  if (lower.includes('tidur')) return '😴';
  if (lower.includes('coding')) return '💻';
  return '✨';
};

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const icon = getIcon(data.activity);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative overflow-hidden group transform hover:-translate-y-1">
      {/* Decorative Background Circle */}
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500 ${data.category === HabitCategory.DISIPLIN ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${categoryColors[data.category]}`}>
          {data.category}
        </span>
        {data.trend === 'up' && (
          <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-xs font-bold flex items-center border border-green-100">
            ▲ Meningkat
          </span>
        )}
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-full shadow-sm border border-slate-100">
          {icon}
        </div>
        <div>
          <h3 className="text-slate-700 text-lg font-bold leading-tight">{data.activity}</h3>
          <p className="text-slate-400 text-xs mt-1">Gerakan Kebiasaan</p>
        </div>
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-extrabold text-slate-800">{data.percentage}%</span>
        <span className="text-slate-500 text-sm font-medium mb-1">Siswa Melakukan</span>
      </div>
      
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
            data.percentage > 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
            data.percentage > 60 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 
            'bg-gradient-to-r from-orange-400 to-red-500'
          }`}
          style={{ width: `${data.percentage}%` }}
        >
           <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
        {data.description}
      </p>
    </div>
  );
};

export default StatCard;