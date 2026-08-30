import React from 'react';
import { FlaskConical, Boxes, ShieldAlert, Sparkles } from 'lucide-react';

export type StageId = 'know' | 'sort' | 'handle' | 'why';

interface StageNavProps {
  activeStage: StageId;
  onSelectStage: (stage: StageId) => void;
}

export const StageNav: React.FC<StageNavProps> = ({ activeStage, onSelectStage }) => {
  const stages: {
    id: StageId;
    index: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'know', index: '01', title: 'Know It', subtitle: 'Identity & SDS', icon: FlaskConical },
    { id: 'sort', index: '02', title: 'Sort It', subtitle: 'Waste Segregation', icon: Boxes },
    { id: 'handle', index: '03', title: 'Handle It', subtitle: 'Containment & Safety', icon: ShieldAlert },
    { id: 'why', index: '04', title: 'Why It Matters', subtitle: 'Environmental Risk', icon: Sparkles },
  ];

  return (
    <nav className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {stages.map((st) => {
        const isActive = activeStage === st.id;
        const IconComponent = st.icon;

        return (
          <button
            key={st.id}
            onClick={() => onSelectStage(st.id)}
            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${
              /* Light Mode: Cherry background with Cream text */
              /* Dark Mode: Cream background with Ink black text */
              isActive
                ? 'bg-cherry text-cream border-2 border-cream ring-2 ring-cream/40 shadow-cherry scale-[1.02] dark:bg-cream dark:text-dark-ink dark:border-2 dark:border-cherry dark:ring-2 dark:ring-cherry/30 dark:shadow-dark-card'
                : 'bg-cherry/90 hover:bg-cherry text-cream border border-cream/20 shadow-sm hover:scale-[1.01] dark:bg-cream/90 dark:hover:bg-cream dark:text-dark-ink dark:border-dark-border'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-mono font-bold tracking-widest ${
                isActive
                  ? 'text-matcha dark:text-cherry'
                  : 'text-cream/80 dark:text-dark-mutedInk'
              }`}>
                {st.index}
              </span>
              <div className={`p-1.5 rounded-lg ${
                isActive
                  ? 'bg-cream/20 text-cream dark:bg-cherry/10 dark:text-cherry'
                  : 'bg-white/10 text-cream/70 dark:bg-dark-border/40 dark:text-dark-mutedInk group-hover:text-cream dark:group-hover:text-dark-ink'
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display text-base sm:text-lg font-bold leading-snug tracking-tight">
              {st.title}
            </p>
            <p className={`text-xs truncate mt-0.5 font-sans font-medium ${
              isActive
                ? 'text-cream/90 dark:text-dark-mutedInk font-semibold'
                : 'text-cream/70 dark:text-dark-mutedInk/80'
            }`}>
              {st.subtitle}
            </p>
          </button>
        );
      })}
    </nav>
  );
};
