import { useEffect, useState } from 'react';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { SearchBar } from './components/common/SearchBar';
import { ChemicalProfile } from './components/decision/ChemicalProfile';
import { getChemicalDetail, getWasteDecision, getStories } from './services/api';
import { ChemicalDetail, WasteDecision, StoryCard } from './types';
import { Loader2, Sun, Moon } from 'lucide-react';

export function App() {
  const [selectedCas, setSelectedCas] = useState<string>('67-64-1'); // Default to Acetone
  const [chemical, setChemical] = useState<ChemicalDetail | null>(null);
  const [waste, setWaste] = useState<WasteDecision | null>(null);
  const [stories, setStories] = useState<StoryCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingWaste, setLoadingWaste] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dark / Light Mode State (persisted)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('chemtrack_theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('chemtrack_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('chemtrack_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (!selectedCas) return;
    loadCompleteChemical(selectedCas);
  }, [selectedCas]);

  const loadCompleteChemical = async (cas: string) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Load Chemical Detail
      const chemData = await getChemicalDetail(cas);
      setChemical(chemData);
      setLoading(false);

      // 2. Load Waste Decision & Stories in Parallel
      setLoadingWaste(true);
      const [wasteData, storyData] = await Promise.all([
        getWasteDecision(cas).catch(() => null),
        getStories(cas).catch(() => [])
      ]);

      setWaste(wasteData);
      setStories(storyData || []);
      setLoadingWaste(false);
    } catch (err: any) {
      console.error('Failed to load complete chemical profile:', err);
      setError(err.message || 'Failed to load chemical data');
      setLoading(false);
      setLoadingWaste(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-matcha dark:bg-dark-bg text-cherry dark:text-dark-text font-sans selection:bg-cherry selection:text-cream transition-colors duration-200">
      {/* 1. Global Editorial Disclaimer Line */}
      <DisclaimerBanner />

      {/* 2. Top Editorial Header */}
      <header className="bg-matcha/95 dark:bg-dark-bg/95 backdrop-blur-md border-b-2 border-cherry/20 dark:border-white/10 sticky top-0 z-30 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Masthead Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-cherry dark:bg-matcha ring-2 ring-cherry/30 dark:ring-matcha/40 animate-pulse" />
            <div className="leading-none">
              <span className="font-display font-black text-xl tracking-tight text-cherry-deeper dark:text-cream">
                ChemTrack
              </span>
              <span className="text-[10px] font-mono text-cherry-soft dark:text-matcha hidden sm:inline ml-2 uppercase tracking-widest font-bold">
                Decision Support
              </span>
            </div>
          </div>

          {/* SearchBar */}
          <SearchBar onSelectChemical={(cas) => setSelectedCas(cas)} selectedCas={selectedCas} />

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full text-cherry dark:text-cream bg-cream dark:bg-[#252220] border border-cherry/30 dark:border-white/15 shadow-sm transition-all shrink-0 hover:scale-105"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-matcha font-bold" /> : <Moon className="w-4 h-4 text-cherry" />}
          </button>
        </div>
      </header>

      {/* 3. Main Workspace with Matcha Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {loading ? (
          <div className="py-24 text-center space-y-3 bg-cherry dark:bg-cream rounded-3xl border border-cream/20 dark:border-dark-border p-8 shadow-cherry dark:shadow-dark-card">
            <Loader2 className="w-7 h-7 text-matcha dark:text-cherry animate-spin mx-auto" />
            <p className="text-xs font-mono text-cream dark:text-dark-ink font-bold">
              Loading chemical profile for CAS {selectedCas}...
            </p>
          </div>
        ) : error ? (
          <div className="bg-cherry dark:bg-cream border border-cream/20 dark:border-dark-border rounded-3xl p-6 text-center space-y-2 shadow-cherry dark:shadow-dark-card text-cream dark:text-dark-ink">
            <h3 className="font-display text-base font-bold">Chemical Profile Error</h3>
            <p className="text-xs text-matcha dark:text-cherry font-mono">{error}</p>
          </div>
        ) : chemical ? (
          <ChemicalProfile
            chemical={chemical}
            waste={waste}
            stories={stories}
            loadingWaste={loadingWaste}
          />
        ) : null}
      </main>

      {/* 4. Minimal Footer */}
      <footer className="bg-cherry-deeper dark:bg-[#1C1A18] text-cream/80 dark:text-cream/70 border-t border-cream/15 dark:border-white/10 py-4 mt-auto transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-center sm:text-left">
          <p className="text-cream/80 dark:text-cream/70">ChemTrack Decision Support Platform • Scientific Microtool</p>
          <p className="text-matcha font-bold">172 Master Chemical Profiles</p>
        </div>
      </footer>
    </div>
  );
}
