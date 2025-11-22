import React, { useState } from 'react';
import { HabitData, HabitCategory } from './types';
import StatCard from './components/StatCard';
import { MainBarChart, CategoryRadialChart } from './components/Charts';
import AIInsight from './components/AIInsight';

// Data updated to match "Gerakan 7 Kebiasaan Anak Indonesia Hebat"
// Specific to SD NEG. No. 3 Balangnipa context
const SEVEN_HABITS_DATA: HabitData[] = [
  {
    id: '1',
    activity: 'Bangun Pagi',
    percentage: 88,
    category: HabitCategory.DISIPLIN,
    description: 'Membiasakan siswa bangun subuh untuk kesiapan mental dan fisik sebelum sekolah.',
    trend: 'up'
  },
  {
    id: '2',
    activity: 'Beribadah',
    percentage: 95,
    category: HabitCategory.SPIRITUAL,
    description: 'Menjalankan sholat 5 waktu dan berdoa sebelum memulai kegiatan belajar.',
    trend: 'stable'
  },
  {
    id: '3',
    activity: 'Berolahraga',
    percentage: 78,
    category: HabitCategory.KESEHATAN,
    description: 'Melakukan senam pagi atau aktivitas fisik ringan minimal 30 menit sehari.',
    trend: 'up'
  },
  {
    id: '4',
    activity: 'Makan Sehat & Bergizi',
    percentage: 82,
    category: HabitCategory.KESEHATAN,
    description: 'Mengkonsumsi 4 sehat 5 sempurna dan mengurangi jajan sembarangan.',
    trend: 'stable'
  },
  {
    id: '5',
    activity: 'Gemar Belajar',
    percentage: 90,
    category: HabitCategory.LITERASI,
    description: 'Membaca buku perpustakaan dan mengulang pelajaran di rumah dengan riang.',
    trend: 'up'
  },
  {
    id: '6',
    activity: 'Bermasyarakat',
    percentage: 85,
    category: HabitCategory.SOSIAL,
    description: 'Gotong royong membersihkan kelas dan bersikap sopan santun kepada guru/teman.',
    trend: 'stable'
  },
  {
    id: '7',
    activity: 'Tidur Cepat',
    percentage: 75,
    category: HabitCategory.DISIPLIN,
    description: 'Tidur maksimal jam 21.00 malam agar tubuh bugar keesokan harinya.',
    trend: 'down'
  }
];

// Student Statistics
const TOTAL_STUDENTS = 421;
const NO_RESPONSE_STUDENTS = 46;
const ACTIVE_STUDENTS = TOTAL_STUDENTS - NO_RESPONSE_STUDENTS;
const PARTICIPATION_RATE = Math.round((ACTIVE_STUDENTS / TOTAL_STUDENTS) * 100);

function App() {
  const [data] = useState<HabitData[]>(SEVEN_HABITS_DATA);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Top Banner */}
      <div className="bg-indigo-900 text-white text-xs text-center py-1 px-4">
        Portal Data Pendidikan Karakter &bull; Menuju Indonesia Emas 2045
      </div>

      {/* Header / Hero Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 bg-opacity-90 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-red-700 text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg shadow-lg">
                SD
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight leading-none">
                  SD NEG. NO. 3 BALANGNIPA
                </h1>
                <p className="text-xs text-slate-500 font-medium">Kabupaten Sinjai, Sulawesi Selatan</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
               <div className="text-right mr-2">
                 <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Tahun Ajaran</p>
                 <p className="text-sm font-bold text-indigo-600">2025/2026</p>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Hero Intro with Gradient */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-20 -mt-20 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 opacity-20 rounded-full -mr-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-md border border-white/20">
                        ✨ Program Unggulan Sekolah
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                        Gerakan 7 Kebiasaan <br/>
                        <span className="text-yellow-300">Anak Indonesia Hebat</span>
                    </h2>
                    <p className="text-lg text-indigo-100 max-w-xl leading-relaxed">
                        Kami berkomitmen membangun generasi cerdas berkarakter melalui pembiasaan positif setiap hari. 
                        Mulai dari bangun pagi hingga tidur cepat.
                    </p>
                </div>
                {/* Quick Stats Pill */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white min-w-[200px] text-center hidden md:block">
                    <p className="text-4xl font-bold mb-1">85%</p>
                    <p className="text-sm opacity-80">Rata-rata Ketercapaian</p>
                    <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[85%]"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Buttons: Form & Data */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScM6CG0ad1orsUsDXAQ2oFKbnEiyyG8Akx57ybz5RmFUWL2QQ/viewform?usp=header"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-4 font-bold text-lg group border border-indigo-500"
            >
               <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                 </svg>
               </div>
               <span>Isi Formulir Harian</span>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-auto opacity-70 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
               </svg>
            </a>
            
            <a 
              href="https://docs.google.com/spreadsheets/d/1G4VwL4nOXjL_rntBhRIKzgxCHnzonE8JpDdUxHA7QIg/edit?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-4 font-bold text-lg group"
            >
                <div className="bg-green-100 text-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M19.125 9h-2.25a2.25 2.25 0 100 4.5h2.25a2.25 2.25 0 000-4.5z" />
                  </svg>
                </div>
                <span>Lihat Data Respon</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-auto opacity-70 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </a>
        </div>

        {/* Participation Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 relative z-10">Total Siswa</p>
                 <p className="text-3xl font-extrabold text-slate-800 relative z-10">{TOTAL_STUDENTS}</p>
                 <p className="text-xs text-slate-400 font-medium mt-1">Terdaftar</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 relative z-10">Siswa Aktif</p>
                 <p className="text-3xl font-extrabold text-green-600 relative z-10">{ACTIVE_STUDENTS}</p>
                 <p className="text-xs text-green-500 font-medium mt-1">Merespon</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 relative z-10">Belum Merespon</p>
                 <p className="text-3xl font-extrabold text-red-500 relative z-10">{NO_RESPONSE_STUDENTS}</p>
                 <p className="text-xs text-red-400 font-medium mt-1">Perlu Tindak Lanjut</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 relative z-10">Partisipasi</p>
                 <p className="text-3xl font-extrabold text-indigo-600 relative z-10">{PARTICIPATION_RATE}%</p>
                 <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${PARTICIPATION_RATE}%` }}></div>
                 </div>
            </div>
        </div>

        {/* Stats Grid Title */}
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                Monitoring 7 Kebiasaan Utama
            </h3>
        </div>

        {/* Grid of Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {data.map((item) => (
            <StatCard key={item.id} data={item} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 shadow-lg rounded-xl bg-white">
                <MainBarChart data={data} />
            </div>
            <div className="shadow-lg rounded-xl bg-white">
                <CategoryRadialChart data={data} />
            </div>
        </div>

        {/* AI Section */}
        <div className="mb-16">
             <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                Analisis Cerdas & Konsultasi
            </h3>
            <AIInsight data={data} />
        </div>
        
      </main>

      <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-4">SD NEG. NO. 3 BALANGNIPA</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Mencetak generasi "Anak Indonesia Hebat" yang beriman, bertakwa, cerdas, dan berkarakter.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-4">Kontak Kami</h4>
                    <p className="text-slate-500 text-sm">Jl. Jend. Sudirman, Balangnipa</p>
                    <p className="text-slate-500 text-sm">Kab. Sinjai, Sulawesi Selatan</p>
                </div>
                <div>
                     <h4 className="font-bold text-slate-900 text-lg mb-4">Sumber Data</h4>
                     <p className="text-slate-500 text-sm mb-2">Data dihimpun dari laporan harian siswa dan orang tua.</p>
                     <a href="https://docs.google.com/spreadsheets/d/1G4VwL4nOXjL_rntBhRIKzgxCHnzonE8JpDdUxHA7QIg/edit?usp=sharing" 
                       target="_blank" 
                       rel="noreferrer"
                       className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-semibold">
                        Akses Spreadsheet Laporan &rarr;
                    </a>
                </div>
            </div>
            <div className="border-t border-slate-100 pt-8 text-center">
                <p className="text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} SD Negeri No. 3 Balangnipa. Powered by Google Gemini AI.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;