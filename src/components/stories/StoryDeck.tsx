import React, { useState } from 'react';
import { StoryCard } from '../../types';
import { StoryCardView } from './StoryCardView';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Award } from 'lucide-react';

interface StoryDeckProps {
  stories: StoryCard[];
  chemicalName: string;
}

export const StoryDeck: React.FC<StoryDeckProps> = ({ stories, chemicalName }) => {
  const [selectedStoryIdx, setSelectedStoryIdx] = useState(0);
  const [cardIndex, setCardIndex] = useState(0); // 0 to 6 (Cards 1 to 7)

  if (!stories || stories.length === 0) {
    return (
      <div className="bg-white border border-purple-200 rounded-2xl p-10 text-center space-y-4 shadow-card">
        <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
          <BookOpen className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-brand-dark">No Narrative Stories Yet for {chemicalName}</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Complete 4-stage decision support guidance (Know It, Sort It, Handle It, Why It Matters) is active in the Decision Guide tab.
          </p>
        </div>
      </div>
    );
  }

  const currentStory = stories[selectedStoryIdx] || stories[0];

  const handleNext = () => {
    if (cardIndex < 6) setCardIndex(cardIndex + 1);
  };

  const handlePrev = () => {
    if (cardIndex > 0) setCardIndex(cardIndex - 1);
  };

  const cardTitles = ['Hook', 'Reveal', 'Prediction', 'Molecular', 'Real Lab', 'Aha Moment', 'Puzzle'];

  return (
    <div className="space-y-5">
      {/* 1. Header & Story Route Selector Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-inner shrink-0">
            <Sparkles className="w-6 h-6 text-purple-200" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-wider font-bold bg-purple-400/20 text-purple-200 border border-purple-300/30 px-2 py-0.5 rounded">
                Beyond the Textbook
              </span>
              <span className="text-xs text-purple-200/80 font-mono">
                {stories.length} {stories.length === 1 ? 'Curiosity Route' : 'Curiosity Routes Available'}
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mt-1">
              "{currentStory.story_title}"
            </h2>
            {currentStory.story_theme && (
              <p className="text-xs text-purple-200/80 mt-0.5">Theme: {currentStory.story_theme}</p>
            )}
          </div>
        </div>

        {/* Multi-Story Route Tabs (e.g. Route A, Route B, Route C) */}
        {stories.length > 1 && (
          <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/15 shrink-0 flex items-center gap-1.5 self-start md:self-center">
            <span className="text-xs font-semibold text-purple-200 pl-2 pr-1">Routes:</span>
            {stories.map((s, idx) => (
              <button
                key={s.story_id}
                onClick={() => {
                  setSelectedStoryIdx(idx);
                  setCardIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStoryIdx === idx
                    ? 'bg-white text-purple-950 shadow-md scale-105'
                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {s.story_id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. 7-Card Step Progress Stepper */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {cardTitles.map((title, idx) => {
          const isActive = cardIndex === idx;
          const isCompleted = cardIndex > idx;

          return (
            <button
              key={idx}
              onClick={() => setCardIndex(idx)}
              className={`p-2 rounded-xl border text-center transition-all ${
                isActive
                  ? 'bg-purple-700 text-white border-purple-700 shadow-md font-bold ring-2 ring-purple-300'
                  : isCompleted
                  ? 'bg-purple-50 text-purple-900 border-purple-200 font-semibold hover:bg-purple-100'
                  : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] block opacity-80">Card {idx + 1}</span>
              <span className="text-[11px] truncate hidden md:block mt-0.5">{title}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Story Card Content (Cards 1 through 7) */}
      <StoryCardView story={currentStory} cardIndex={cardIndex} />

      {/* 4. Interactive Step Navigation Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={cardIndex === 0}
          className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Card
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Award className="w-3.5 h-3.5 text-purple-600" />
          <span>Step {cardIndex + 1} of 7: {cardTitles[cardIndex]}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={cardIndex === 6}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
        >
          Next Card <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
