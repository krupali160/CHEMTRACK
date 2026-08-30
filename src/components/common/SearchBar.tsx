import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { searchChemicals } from '../../services/api';
import { ChemicalSummary } from '../../types';

interface SearchBarProps {
  onSelectChemical: (cas: string) => void;
  selectedCas?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectChemical, selectedCas }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChemicalSummary[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchChemicals(query, 8);
        setResults(res);
        setIsOpen(true);
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (cas: string) => {
    onSelectChemical(cas);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="w-4 h-4 text-cherry/80 dark:text-dark-mutedInk absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search chemical name, CAS, formula..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          className="w-full bg-cream dark:bg-white border-2 border-cherry/30 dark:border-dark-border rounded-full pl-9 pr-9 py-2 text-sm text-cherry-dark dark:text-dark-ink placeholder:text-cherry/60 dark:placeholder:text-dark-mutedInk/60 focus:outline-none focus:ring-2 focus:ring-cherry dark:focus:ring-cherry focus:border-cherry dark:focus:border-cherry transition-all font-sans shadow-sm"
        />
        {loading ? (
          <Loader2 className="w-4 h-4 text-cherry dark:text-cherry animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
        ) : query ? (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="p-1 text-cherry/60 hover:text-cherry dark:text-dark-mutedInk dark:hover:text-dark-ink absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cherry dark:bg-cream text-cream dark:text-dark-ink border border-cream/20 dark:border-dark-border rounded-2xl shadow-cherry-lg dark:shadow-dark-card z-50 max-h-80 overflow-y-auto divide-y divide-cream/15 dark:divide-dark-border">
          {results.length === 0 ? (
            <div className="p-4 text-center text-xs text-cream/80 dark:text-dark-mutedInk font-sans">
              No matching chemical records for "{query}"
            </div>
          ) : (
            results.map((chem) => (
              <div
                key={chem.cas_number}
                onClick={() => handleSelect(chem.cas_number)}
                className={`p-3.5 hover:bg-cherry-light/60 dark:hover:bg-cream-muted cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                  selectedCas === chem.cas_number ? 'bg-cherry-dark dark:bg-cream-muted' : ''
                }`}
              >
                <div className="truncate">
                  <p className="text-sm font-display font-bold text-cream dark:text-dark-ink truncate">
                    {chem.chemical_name}
                  </p>
                  <p className="text-xs font-mono text-matcha dark:text-cherry font-semibold mt-0.5">
                    {chem.formula || '—'}
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-cherry-deeper dark:bg-white border border-cream/20 dark:border-dark-border text-cream/90 dark:text-dark-ink font-semibold shrink-0">
                  {chem.cas_number}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
