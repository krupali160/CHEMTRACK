import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Puzzle } from 'lucide-react';
import { StoryCard, ChemicalDetail } from '../../types';
import { CinematicReconstruction } from './CinematicReconstruction';
import { setPartialProgress } from '../../services/storyRotation';

interface StoryReelsViewerProps {
  story: StoryCard;
  chemical: ChemicalDetail;
  onClose: () => void;
  onComplete: () => void;
}

export const StoryReelsViewer: React.FC<StoryReelsViewerProps> = ({
  story,
  chemical,
  onClose,
  onComplete
}) => {
  const [activeSection, setActiveSection] = useState(0); // 0 to 6
  const [maxSectionSeen, setMaxSectionSeen] = useState(0);
  const [isReconstructing, setIsReconstructing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // 7 Continuous Story Card Scenes with Abstract Molecular / Solvent Textures
  const storyCards = [
    {
      num: '01/07',
      text: story.card_1_hook,
      bg: 'from-[#0C0F14] via-[#121824] to-[#0A0D12]',
      pattern: 'radial-gradient(circle at 20% 30%, rgba(186, 215, 151, 0.08) 0%, transparent 50%)',
    },
    {
      num: '02/07',
      text: story.card_2_reveal,
      bg: 'from-[#120F1C] via-[#1A1429] to-[#0D0B14]',
      pattern: 'radial-gradient(circle at 80% 40%, rgba(103, 6, 38, 0.15) 0%, transparent 60%)',
    },
    {
      num: '03/07',
      text: story.card_3_why,
      bg: 'from-[#0B151A] via-[#102029] to-[#091217]',
      pattern: 'radial-gradient(circle at 30% 70%, rgba(186, 215, 151, 0.1) 0%, transparent 50%)',
    },
    {
      num: '04/07',
      text: story.card_4_explanation,
      bg: 'from-[#180E15] via-[#241320] to-[#120A10]',
      pattern: 'radial-gradient(circle at 70% 30%, rgba(103, 6, 38, 0.2) 0%, transparent 55%)',
    },
    {
      num: '05/07',
      text: story.card_5_beyond_textbook,
      bg: 'from-[#0D1815] via-[#132621] to-[#0A1411]',
      pattern: 'radial-gradient(circle at 40% 60%, rgba(186, 215, 151, 0.12) 0%, transparent 50%)',
    },
    {
      num: '06/07',
      text: story.card_6_aha,
      bg: 'from-[#1C140E] via-[#291D14] to-[#140E0A]',
      pattern: 'radial-gradient(circle at 60% 40%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)',
    },
    {
      num: '07/07',
      text: story.card_7_puzzle,
      bg: 'from-[#170C1B] via-[#24112B] to-[#0E0712]',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.18) 0%, transparent 60%)',
    }
  ];

  // IntersectionObserver for tracking active card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-section-index'));
            if (!isNaN(index)) {
              setActiveSection(index);
              setMaxSectionSeen((prev) => {
                const newMax = Math.max(prev, index);
                setPartialProgress(chemical.cas_number, newMax + 1);
                return newMax;
              });
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.55
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chemical.cas_number]);

  const fragmentsCollected = maxSectionSeen + 1;
  const remaining = Math.max(0, 7 - fragmentsCollected);

  const getProgressMessage = () => {
    if (fragmentsCollected === 7) return '7/7 discoveries collected ✨';
    if (remaining === 1) return '1 clue left to solve the mystery';
    return `${remaining} clues left to solve the mystery`;
  };

  const handleStartReconstruction = () => {
    setIsReconstructing(true);
  };

  const handleReplay = () => {
    setIsReconstructing(false);
    setActiveSection(0);
    setMaxSectionSeen(0);
    setPartialProgress(chemical.cas_number, 1);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToNextSection = () => {
    if (activeSection < 6 && containerRef.current) {
      const nextEl = sectionRefs.current[activeSection + 1];
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08090C] text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Minimal Top HUD */}
      <header className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
        {/* Exit Button */}
        <button
          onClick={onClose}
          className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>

        {/* 7 Fragment Progress Dots */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
          {Array.from({ length: 7 }).map((_, idx) => {
            const isUnlocked = idx <= maxSectionSeen;
            const isCurrent = idx === activeSection;

            return (
              <div
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isUnlocked
                    ? isCurrent
                      ? 'bg-matcha ring-2 ring-matcha/50 scale-125'
                      : 'bg-matcha/80 shadow-sm'
                    : 'bg-white/20'
                }`}
                title={`Clue ${idx + 1} of 7`}
              />
            );
          })}
        </div>

        {/* Contextual Progress Message */}
        <div className="pointer-events-auto text-[11px] sm:text-xs font-mono font-bold text-matcha bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-matcha/30 shadow-md">
          {getProgressMessage()}
        </div>
      </header>

      {/* Main Full-Screen Story Card Container */}
      {!isReconstructing ? (
        <div
          ref={containerRef}
          className="flex-1 w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth focus:outline-none"
        >
          {storyCards.map((card, idx) => (
            <section
              key={idx}
              ref={(el) => (sectionRefs.current[idx] = el)}
              data-section-index={idx}
              style={{ backgroundImage: card.pattern }}
              className={`min-h-screen w-full snap-start snap-always flex flex-col justify-center items-center p-6 sm:p-10 bg-gradient-to-b ${card.bg} relative transition-colors duration-700`}
            >
              {/* Intentional Story Card */}
              <div className="w-full max-w-2xl mx-auto bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6 animate-fadeIn">
                {/* Story Card Top Header: Title + 01/07 Counter */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-matcha" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/70 font-semibold">
                      {story.story_title}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-matcha border border-white/10">
                    {card.num}
                  </span>
                </div>

                {/* Main Story Narrative Text */}
                <p className="text-lg sm:text-2xl text-slate-100 font-display font-medium leading-relaxed tracking-normal whitespace-pre-line text-left">
                  {card.text}
                </p>

                {/* Card Action: Final Card Reconstruction vs Scroll Prompt */}
                {idx === 6 ? (
                  <div className="pt-4 space-y-3 text-center border-t border-white/10">
                    <button
                      onClick={handleStartReconstruction}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cherry via-purple-700 to-matcha-dark hover:brightness-110 text-white font-black text-sm sm:text-base shadow-2xl shadow-purple-950/80 flex items-center justify-center gap-2.5 mx-auto transition-all active:scale-95 animate-pulse"
                    >
                      <Puzzle className="w-5 h-5" />
                      <span>Assemble Final Molecule ✨</span>
                    </button>
                    <p className="text-xs text-white/60 font-mono">
                      7/7 discoveries collected • Reconstruct chemical puzzle
                    </p>
                  </div>
                ) : (
                  <div className="pt-4 flex items-center justify-between border-t border-white/10 text-xs text-white/50">
                    <span className="font-mono text-[11px]">Chemistry Clue {idx + 1}</span>
                    <button
                      onClick={scrollToNextSection}
                      className="hover:text-matcha flex items-center gap-1 transition-colors font-medium"
                    >
                      <span>Scroll for next clue</span>
                      <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                    </button>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Cinematic 3D Molecular Reconstruction View */
        <div className="flex-1 w-full h-full flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#08090C]">
          <CinematicReconstruction
            story={story}
            chemical={chemical}
            onCompleteAndExit={() => {
              onComplete();
              onClose();
            }}
            onReplay={handleReplay}
          />
        </div>
      )}
    </div>
  );
};
