import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Atom, Check } from 'lucide-react';
import { StoryCard, ChemicalDetail } from '../../types';

interface StoryPayoffProps {
  story: StoryCard;
  chemical: ChemicalDetail;
  onCompleteAndExit: () => void;
  onReplay: () => void;
}

export const StoryPayoff: React.FC<StoryPayoffProps> = ({
  story,
  chemical,
  onCompleteAndExit,
  onReplay
}) => {
  const [imageError, setImageError] = useState(false);

  // NIH PubChem 2D chemical structure URL
  const pubchemImageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(
    chemical.chemical_name
  )}/PNG?image_size=300x300`;

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-b from-slate-900/90 via-purple-950/90 to-slate-950 border border-purple-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-xl animate-fadeIn">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Assembly Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>7 of 7 Pieces Assembled</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Molecular Identity Reconstructed ✨
        </h2>
      </div>

      {/* Payoff Reveal Card: Chemical Name, Formula & 2D Structure */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 backdrop-blur-md relative">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-purple-300 font-mono font-bold">
            Target Molecule
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-emerald-200">
            {chemical.chemical_name}
          </h1>
          <div className="flex items-center justify-center gap-3 pt-1 text-sm font-mono text-emerald-300">
            <span className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-lg font-bold">
              Formula: {chemical.formula || '—'}
            </span>
            <span className="bg-purple-950/60 border border-purple-500/40 px-3 py-1 rounded-lg font-bold">
              CAS: {chemical.cas_number}
            </span>
          </div>
        </div>

        {/* 2D Molecular Structure View */}
        <div className="flex flex-col items-center justify-center p-4 bg-white/90 rounded-xl border border-white/20 shadow-inner max-w-xs mx-auto">
          {!imageError ? (
            <img
              src={pubchemImageUrl}
              alt={chemical.chemical_name}
              onError={() => setImageError(true)}
              className="w-48 h-48 object-contain transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-48 h-48 flex flex-col items-center justify-center text-slate-700 space-y-2">
              <Atom className="w-16 h-16 text-purple-700 animate-pulse" />
              <span className="font-mono text-xs font-bold text-slate-800">{chemical.formula}</span>
            </div>
          )}
          <span className="text-[10px] font-mono text-slate-500 pt-1">
            2D Molecular Depiction • {chemical.representation_type || 'Pure compound'}
          </span>
        </div>

        {/* Story Synthesis Insight */}
        <div className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-lg mx-auto italic">
          "{story.card_6_aha}"
        </div>
      </div>

      {/* Completion Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onCompleteAndExit}
          className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Check className="w-4 h-4" />
          <span>Save Progress & Return to Guide</span>
        </button>

        <button
          onClick={onReplay}
          className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-purple-200 text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Story</span>
        </button>
      </div>
    </div>
  );
};
