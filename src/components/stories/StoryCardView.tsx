import React from 'react';
import { StoryCard } from '../../types';
import { StoryPuzzle } from './StoryPuzzle';
import {
  Compass,
  Eye,
  HelpCircle,
  Atom,
  Microscope,
  Lightbulb,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface StoryCardViewProps {
  story: StoryCard;
  cardIndex: number;
}

export const StoryCardView: React.FC<StoryCardViewProps> = ({ story, cardIndex }) => {
  const cards = [
    {
      num: 1,
      title: 'The Hook 🎣',
      subtitle: 'A real-world mystery or observable phenomenon',
      icon: Compass,
      content: story.card_1_hook,
      badgeText: 'Card 1 of 7 • Mystery',
      accentBg: 'bg-blue-50/50',
      accentBorder: 'border-blue-200',
      accentText: 'text-blue-900',
      iconBg: 'bg-blue-600',
    },
    {
      num: 2,
      title: 'The Reveal 🔍',
      subtitle: 'The surprising chemical identity',
      icon: Eye,
      content: story.card_2_reveal,
      badgeText: 'Card 2 of 7 • Discovery',
      accentBg: 'bg-indigo-50/50',
      accentBorder: 'border-indigo-200',
      accentText: 'text-indigo-900',
      iconBg: 'bg-indigo-600',
    },
    {
      num: 3,
      title: 'Prediction Prompt 🔮',
      subtitle: 'Intuitive hypothesis before formal theory',
      icon: HelpCircle,
      content: story.card_3_why,
      badgeText: 'Card 3 of 7 • Hypothesis',
      accentBg: 'bg-amber-50/50',
      accentBorder: 'border-amber-200',
      accentText: 'text-amber-900',
      iconBg: 'bg-amber-600',
    },
    {
      num: 4,
      title: 'Molecular Explanation ⚛️',
      subtitle: 'Structure, bonding, and intermolecular forces',
      icon: Atom,
      content: story.card_4_explanation,
      badgeText: 'Card 4 of 7 • Molecular Mechanism',
      accentBg: 'bg-teal-50/50',
      accentBorder: 'border-teal-200',
      accentText: 'text-teal-900',
      iconBg: 'bg-teal-700',
    },
    {
      num: 5,
      title: 'Real Lab & Research Connection 🔬',
      subtitle: 'Bridging textbook theory to cutting-edge practice',
      icon: Microscope,
      content: story.card_5_beyond_textbook,
      badgeText: 'Card 5 of 7 • Real-World Chemistry',
      accentBg: 'bg-emerald-50/50',
      accentBorder: 'border-emerald-200',
      accentText: 'text-emerald-900',
      iconBg: 'bg-emerald-700',
    },
    {
      num: 6,
      title: 'The Aha Moment 💡',
      subtitle: 'The central conceptual synthesis',
      icon: Lightbulb,
      content: story.card_6_aha,
      badgeText: 'Card 6 of 7 • Conceptual Breakthrough',
      accentBg: 'bg-orange-50/50',
      accentBorder: 'border-orange-200',
      accentText: 'text-orange-900',
      iconBg: 'bg-orange-600',
    },
    {
      num: 7,
      title: 'Puzzle & Reconstruction 🧩',
      subtitle: 'Interactive self-assessment challenge',
      icon: Sparkles,
      content: story.card_7_puzzle,
      badgeText: 'Card 7 of 7 • Interactive Challenge',
      accentBg: 'bg-purple-50/50',
      accentBorder: 'border-purple-200',
      accentText: 'text-purple-900',
      iconBg: 'bg-purple-600',
    }
  ];

  const current = cards[cardIndex];
  const Icon = current.icon;

  if (current.num === 7) {
    return <StoryPuzzle puzzleText={story.card_7_puzzle} storyTitle={story.story_title} />;
  }

  return (
    <div className={`bg-white border ${current.accentBorder} rounded-2xl p-6 sm:p-7 shadow-card space-y-5 min-h-[300px] flex flex-col justify-between`}>
      {/* Card Header */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 border border-purple-200 px-2.5 py-0.5 rounded-md">
            {current.badgeText}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Route: <strong className="text-slate-600">{story.story_id}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className={`w-10 h-10 rounded-xl ${current.iconBg} text-white flex items-center justify-center shadow-md shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-brand-dark">{current.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{current.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Card Narrative Body */}
      <div className={`${current.accentBg} border ${current.accentBorder} rounded-xl p-5 text-sm sm:text-[15px] text-slate-800 leading-relaxed whitespace-pre-line font-medium shadow-inner`}>
        {current.content}
      </div>

      {/* Card Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <BookOpen className="w-3.5 h-3.5 text-purple-600" />
          <span>"{story.story_title}"</span>
        </div>
        <span className="font-mono">
          {story.chemical_name} ({story.formula || '—'})
        </span>
      </div>
    </div>
  );
};
