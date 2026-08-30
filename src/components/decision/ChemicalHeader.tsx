import React from 'react';
import { ChemicalDetail } from '../../types';
import { HazardBadge } from '../common/HazardBadge';

interface ChemicalHeaderProps {
  chemical: ChemicalDetail;
}

export const ChemicalHeader: React.FC<ChemicalHeaderProps> = ({ chemical }) => {
  return (
    <section className="bg-cherry dark:bg-cream text-cream dark:text-dark-ink border border-cream/20 dark:border-dark-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-cherry dark:shadow-dark-card space-y-5 transition-all duration-200">
      {/* Top Metadata Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-mono tracking-wider font-bold text-cherry-deeper bg-matcha px-3 py-1 rounded-md shadow-sm">
          {chemical.chemical_id}
        </span>
        <span className="text-[11px] font-mono text-cream font-semibold bg-cherry-dark dark:bg-white dark:text-dark-ink border border-cream/20 dark:border-dark-border px-3 py-1 rounded-md shadow-sm">
          {chemical.representation_type || 'Pure compound'}
        </span>
      </div>

      {/* Confident Editorial Headline */}
      <div className="space-y-3">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-cream dark:text-dark-ink leading-[1.02]">
          {chemical.chemical_name}
        </h1>

        {/* Scientific Metadata Parameters */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono text-cream dark:text-dark-ink flex-wrap pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-cream/80 dark:text-dark-mutedInk font-sans text-xs font-medium">Formula:</span>
            <strong className="text-matcha dark:text-cherry font-bold text-sm tracking-wide">{chemical.formula || '—'}</strong>
          </div>
          <span className="text-cream/30 dark:text-dark-border select-none">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-cream/80 dark:text-dark-mutedInk font-sans text-xs font-medium">CAS:</span>
            <strong className="text-cream dark:text-dark-ink font-bold text-sm tracking-wide">{chemical.cas_number}</strong>
          </div>
          <span className="text-cream/30 dark:text-dark-border select-none">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-cream/80 dark:text-dark-mutedInk font-sans text-xs font-medium">State:</span>
            <strong className="text-cream dark:text-dark-ink font-semibold text-xs">{chemical.physical_state || 'Refer to SDS'}</strong>
          </div>
        </div>
      </div>

      {/* Hazard Profile Bar */}
      <div className="pt-3 border-t border-cream/15 dark:border-dark-border flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cream dark:text-dark-mutedInk font-bold">Hazard Profile:</span>
          <HazardBadge tags={chemical.hazard_tags} />
        </div>
        {chemical.needs_full_hazard_review === 'Yes' && (
          <span className="text-xs font-mono text-matcha dark:text-cherry font-bold">
            * SDS Verification Required
          </span>
        )}
      </div>
    </section>
  );
};
