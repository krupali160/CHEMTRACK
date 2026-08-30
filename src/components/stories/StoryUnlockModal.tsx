import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Sparkles, BookOpen, Puzzle } from 'lucide-react';
import { StoryCard } from '../../types';
import { getPartialProgress } from '../../services/storyRotation';

export const APPROVED_TAGLINES = [
  "What you know is only the beginning.",
  "Look closer. Chemistry has more to say.",
  "There’s another side to every molecule.",
  "Somewhere between the formula and the real world.",
  "The chemistry you didn’t know was there."
];

interface StoryUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
  currentStory: StoryCard;
  casNumber: string;
  totalStories?: number;
}

export const StoryUnlockModal: React.FC<StoryUnlockModalProps> = ({
  isOpen,
  onClose,
  onExplore,
  currentStory,
  casNumber,
  totalStories = 1
}) => {
  const [tagline, setTagline] = useState<string>(APPROVED_TAGLINES[0]);

  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem('chemtrack_tagline_idx');
        const currentIdx = raw !== null ? parseInt(raw, 10) : 0;
        const validIdx = isNaN(currentIdx) ? 0 : currentIdx % APPROVED_TAGLINES.length;
        setTagline(APPROVED_TAGLINES[validIdx]);

        // Advance to next tagline for subsequent popup entrance
        const nextIdx = (validIdx + 1) % APPROVED_TAGLINES.length;
        localStorage.setItem('chemtrack_tagline_idx', nextIdx.toString());
      } catch {
        setTagline(APPROVED_TAGLINES[0]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const partial = getPartialProgress(casNumber);
  const remaining = Math.max(0, 7 - partial);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* 
        LIGHT MODE: Solid Cherry (#670626) background, Cream (#FFF3D6) text, NO gradients, NO translucent overlay.
        DARK MODE: Solid Cream (#FFF3D6) background, Cherry (#670626) / Dark ink text.
      */}
      <div className="bg-cherry dark:bg-cream text-cream dark:text-dark-ink border border-cream/20 dark:border-dark-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden space-y-6 transition-all duration-200">
        
        {/* Top-Right Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-cream/80 hover:text-cream hover:bg-cream/10 dark:text-dark-mutedInk dark:hover:text-dark-ink dark:hover:bg-dark-border/40 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. Header: Small Discovery Label + Tagline + Bold Title */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-matcha/20 text-matcha dark:bg-cherry/10 dark:text-cherry border border-matcha/30 dark:border-cherry/20 text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-matcha dark:text-cherry" />
              <span>Discovery Unlocked</span>
            </span>
            {totalStories > 1 && (
              <span className="text-[11px] font-mono text-cream/90 dark:text-dark-mutedInk bg-cherry-dark dark:bg-white px-2.5 py-0.5 rounded-full border border-cream/20 dark:border-dark-border font-semibold">
                Route {currentStory.story_id} of {totalStories}
              </span>
            )}
          </div>

          {/* Rotating Tagline placed above BEYOND THE TEXTBOOK */}
          <p className="text-xs sm:text-sm font-sans italic text-matcha dark:text-cherry font-medium tracking-wide">
            "{tagline}"
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-cream dark:text-dark-ink leading-tight font-display">
            BEYOND THE TEXTBOOK
          </h2>
        </div>

        {/* 2. Story Hook & Teaser Card */}
        <div className="bg-cherry-dark/80 dark:bg-white border border-cream/20 dark:border-dark-border rounded-2xl p-5 sm:p-6 space-y-3 shadow-inner dark:shadow-subtle">
          <p className="text-base sm:text-lg text-cream dark:text-dark-ink font-bold leading-snug font-display">
            Want to uncover the chemistry behind it? 📖
          </p>
          <p className="text-xs sm:text-sm text-cream/90 dark:text-dark-mutedInk font-sans font-medium italic">
            "{currentStory.story_title}"
          </p>

          {/* Mystery / Progress Indicator */}
          {partial > 0 && partial < 7 ? (
            <div className="pt-2 flex items-center gap-2 text-xs text-matcha dark:text-cherry font-semibold border-t border-cream/15 dark:border-dark-border">
              <Puzzle className="w-4 h-4 shrink-0 text-matcha dark:text-cherry" />
              <span>You’re {partial}/7 through this mystery — {remaining} {remaining === 1 ? 'clue' : 'clues'} left.</span>
            </div>
          ) : (
            <div className="pt-2 flex items-center gap-2 text-xs text-cream/80 dark:text-dark-mutedInk font-mono border-t border-cream/15 dark:border-dark-border">
              <Puzzle className="w-4 h-4 text-matcha dark:text-cherry shrink-0" />
              <span>7 Clues to Solve • 3D Molecular Reconstruction</span>
            </div>
          )}
        </div>

        {/* 3. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          {/* Primary "Explore the Story" Button */}
          <button
            onClick={onExplore}
            className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-cream text-cherry hover:bg-cream-muted dark:bg-cherry dark:text-cream dark:hover:bg-cherry-light font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore the Story</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary "Close" Button */}
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl border border-cream/30 text-cream hover:bg-cream/10 dark:border-cherry/30 dark:text-cherry dark:hover:bg-cherry/10 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
