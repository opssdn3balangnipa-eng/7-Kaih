export enum HabitCategory {
  DISIPLIN = 'Disiplin',
  KESEHATAN = 'Kesehatan',
  LITERASI = 'Literasi',
  SOSIAL = 'Sosial',
  SPIRITUAL = 'Spiritual'
}

export interface HabitData {
  id: string;
  activity: string; // "Bangun Pagi", "Membaca"
  percentage: number; // 0-100
  category: HabitCategory;
  description: string;
  trend: 'up' | 'stable' | 'down';
}

export interface AnalysisResult {
  summary: string;
  recommendation: string;
  highlight: string;
}
