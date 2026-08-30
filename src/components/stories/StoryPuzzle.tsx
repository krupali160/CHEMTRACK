import React, { useState } from 'react';
import { Sparkles, Eye, CheckCircle2, HelpCircle } from 'lucide-react';

interface StoryPuzzleProps {
  puzzleText: string;
  storyTitle: string;
}

export const StoryPuzzle: React.FC<StoryPuzzleProps> = ({ puzzleText, storyTitle }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50/60 to-purple-100/40 border border-purple-200/90 rounded-2xl p-6 sm:p-7 space-y-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                Card 7 of 7 • Interactive Challenge
              </span>
            </div>
            <h3 className="text-lg font-bold text-purple-950 mt-0.5">
              Puzzle & Molecular Reconstruction 🧩
            </h3>
          </div>
        </div>
        <span className="text-xs font-medium text-purple-800 bg-white/80 border border-purple-200 px-2.5 py-1 rounded-full shadow-sm">
          "{storyTitle}"
        </span>
      </div>

      {/* Puzzle Challenge Narrative */}
      <div className="bg-white/95 border border-purple-200 rounded-xl p-5 text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium shadow-sm">
        {puzzleText}
      </div>

      {/* Interactive Self-Reflection / Solution Drawer */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-purple-900 font-semibold flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            Can you reconstruct the molecular logic without looking at the answer?
          </p>

          <button
            onClick={() => setRevealed(!revealed)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-sm transition-all active:scale-[0.98]"
          >
            <Eye className="w-4 h-4" />
            {revealed ? 'Hide Conceptual Guide' : 'Reveal Conceptual Synthesis'}
          </button>
        </div>

        {revealed && (
          <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-xl p-4 text-xs sm:text-sm text-emerald-950 flex items-start gap-3 shadow-sm transition-all duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-emerald-900">Pedagogical Synthesis:</p>
              <p className="leading-relaxed">
                Notice how the molecular behavior naturally flows from fundamental physical principles — electronegativity, molecular geometry, and intermolecular interactions. Memorizing facts is unnecessary when you can reconstruct chemical properties directly from structure!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
