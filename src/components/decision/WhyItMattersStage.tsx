import React from 'react';
import { WasteDecision } from '../../types';

interface WhyItMattersStageProps {
  waste: WasteDecision;
}

export const WhyItMattersStage: React.FC<WhyItMattersStageProps> = ({ waste }) => {
  return (
    <div className="bg-cherry dark:bg-cream text-cream dark:text-dark-ink border border-cream/20 dark:border-dark-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-cherry dark:shadow-dark-card space-y-6 animate-fadeIn transition-all duration-200">
      {/* Stage Header - EXACTLY "Why It Matters" */}
      <div className="border-b border-cream/20 dark:border-dark-border pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-matcha dark:text-cherry block font-bold">Stage 04</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-cream dark:text-dark-ink">
            Why It Matters
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Environmental Impact Context */}
        <div className="space-y-4 bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-6 shadow-inner dark:shadow-subtle">
          <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
            Environmental Impact & Context
          </h3>
          <p className="text-xs sm:text-sm font-sans text-cream dark:text-dark-ink font-medium leading-relaxed bg-cherry-deeper dark:bg-cream/40 p-4 rounded-xl border border-cream/15 dark:border-dark-border">
            {waste.environmental_context || 'Improper chemical release may lead to groundwater contamination, aquatic ecotoxicity, and atmospheric VOC emissions.'}
          </p>
        </div>

        {/* Card 2: Risk Level & Green Lab Stewardship */}
        <div className="space-y-4 bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-6 shadow-inner dark:shadow-subtle">
          <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
            Green Chemistry Assessment
          </h3>
          
          <div className="space-y-3.5 text-xs sm:text-sm font-sans">
            <div className="flex items-center justify-between p-3 bg-cherry-deeper dark:bg-cream/40 rounded-xl border border-cream/15 dark:border-dark-border">
              <span className="text-cream/90 dark:text-dark-mutedInk font-medium">Environmental Risk Level:</span>
              <span className="font-mono font-bold text-cherry-deeper dark:text-cream bg-matcha dark:bg-cherry px-3 py-1 rounded-md shadow-sm">
                {waste.environmental_risk_level || 'Moderate'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-cream/90 dark:text-dark-mutedInk leading-relaxed font-medium">
              Practicing rigorous waste segregation prevents costly incineration overhead and enables institutional recycling, recovering critical solvents and reducing the environmental footprint of chemistry education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
