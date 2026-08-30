import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-cherry-deeper dark:bg-[#1C1A18] text-cream/90 dark:text-cream/80 border-b border-cream/15 dark:border-white/10 px-4 py-2 text-xs font-sans transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-matcha shrink-0 animate-pulse" />
          <span className="text-[11px] sm:text-xs text-cream/90 dark:text-cream/90">
            <strong className="text-cream font-bold">Educational Decision Support:</strong> Always verify with official SDS, follow institutional SOPs, and consult your chemical safety officer.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-matcha shrink-0 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-matcha" />
          <span>Non-Regulatory Guidance</span>
        </div>
      </div>
    </div>
  );
};
