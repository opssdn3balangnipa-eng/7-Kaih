import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { HabitData } from '../types';

interface ChartsProps {
  data: HabitData[];
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#14b8a6', '#ec4899'];

export const MainBarChart: React.FC<ChartsProps> = ({ data }) => {
  return (
    <div className="h-[350px] w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Perbandingan Persentase Kebiasaan</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="activity" 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
          />
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="percentage" radius={[4, 4, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryRadialChart: React.FC<ChartsProps> = ({ data }) => {
  // Aggregate data by category for a different view
  const categoryMap = new Map<string, number>();
  data.forEach(d => {
    const current = categoryMap.get(d.category) || 0;
    categoryMap.set(d.category, (current + d.percentage) / 2); // Simple average for demo
  });

  const chartData = Array.from(categoryMap).map(([name, value], index) => ({
    name,
    value: Math.round(value),
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div className="h-[350px] w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Dominasi Kategori</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={20} data={chartData}>
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={10}
            label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }}
          />
          <Legend 
            iconSize={10} 
            layout="vertical" 
            verticalAlign="middle" 
            wrapperStyle={{
              top: '50%',
              right: 0,
              transform: 'translate(0, -50%)',
              lineHeight: '24px',
            }} 
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};