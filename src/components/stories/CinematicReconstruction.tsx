import React, { useState, useEffect } from 'react';
import { Sparkles, Check, RotateCcw, Puzzle } from 'lucide-react';
import { StoryCard, ChemicalDetail } from '../../types';
import { Molecule3DViewer } from './Molecule3DViewer';

interface CinematicReconstructionProps {
  story: StoryCard;
  chemical: ChemicalDetail;
  onCompleteAndExit: () => void;
  onReplay: () => void;
}

export const CinematicReconstruction: React.FC<CinematicReconstructionProps> = ({
  story,
  chemical,
  onCompleteAndExit,
  onReplay
}) => {
  const [animationPhase, setAnimationPhase] = useState<'gathering' | 'locking' | 'revealed'>('gathering');

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationPhase('locking'), 900);
    const t2 = setTimeout(() => setAnimationPhase('revealed'), 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto text-white text-center space-y-6 relative overflow-hidden font-sans">
      {/* PHASE 1 & 2: 7 Jigsaw pieces fly and lock together */}
      {animationPhase !== 'revealed' ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-8 animate-fadeIn">
          <div className="relative w-52 h-52 flex items-center justify-center">
            {Array.from({ length: 7 }).map((_, idx) => {
              const angle = (idx / 7) * Math.PI * 2;
              const radius = animationPhase === 'gathering' ? 85 : 12;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={idx}
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${animationPhase === 'gathering' ? 1 : 1.3}) rotate(${idx * 45}deg)`,
                    transition: 'all 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  className={`absolute w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                    animationPhase === 'gathering'
                      ? 'bg-cherry text-white shadow-cherry/50 border border-cherry-border'
                      : 'bg-matcha text-dark-bg shadow-matcha/80 border border-white ring-2 ring-matcha'
                  }`}
                >
                  <Puzzle className="w-4 h-4" />
                </div>
              );
            })}

            {/* Glowing Center Core */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cherry via-matcha to-matcha-light animate-pulse blur-xl opacity-75" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              {animationPhase === 'gathering' ? '7 Clues Converging...' : 'Locking Molecular Puzzle...'}
            </h3>
            <p className="text-xs text-matcha font-mono">
              Reconstructing chemical identity ✨
            </p>
          </div>
        </div>
      ) : (
        /* PHASE 3: Complete Chemical Identity Reveal */
        <div className="bg-gradient-to-b from-dark-surface via-dark-card to-dark-bg border border-matcha/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl animate-fadeIn relative">
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-matcha/10 rounded-full blur-3xl pointer-events-none" />

          {/* Payoff Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-matcha/15 text-matcha border border-matcha/30 text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-matcha" />
              <span>Puzzle Reconstructed</span>
            </div>

            {/* Complete Chemical Name as a SINGLE WORD */}
            <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white capitalize">
              {chemical.chemical_name}
            </h1>

            {/* Formula · CAS Number */}
            <div className="flex items-center justify-center gap-2 pt-1 text-sm font-mono text-matcha">
              <span className="bg-matcha-darkSoft border border-matcha/30 px-3.5 py-1 rounded-xl font-bold shadow-inner">
                {chemical.formula || '—'} · CAS {chemical.cas_number}
              </span>
            </div>
          </div>

          {/* Interactive 3D Molecular Structure */}
          <div className="space-y-1">
            <Molecule3DViewer chemicalName={chemical.chemical_name} formula={chemical.formula} />
          </div>

          {/* Discovery Payoff Message */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-dark-text leading-relaxed max-w-lg mx-auto font-medium">
            <span className="block font-bold text-white mb-1">
              "Now you know the molecule behind the mystery."
            </span>
            <span className="text-dark-muted">{story.card_6_aha}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onCompleteAndExit}
              className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-cherry hover:bg-cherry-hover text-white font-bold text-sm shadow-lg shadow-cherry/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Check className="w-4 h-4" />
              <span>Explore this Molecule</span>
            </button>

            <button
              onClick={onReplay}
              className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-dark-muted hover:text-white text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Story</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
