import React from 'react';
import { WasteDecision } from '../../types';

interface SortItStageProps {
  waste: WasteDecision;
}

export const SortItStage: React.FC<SortItStageProps> = ({ waste }) => {
  const showCanonical = waste.canonical_waste_category && 
    waste.canonical_waste_category.trim().toLowerCase() !== waste.waste_category.trim().toLowerCase();

  return (
    <div className="bg-cherry dark:bg-cream text-cream dark:text-dark-ink border border-cream/20 dark:border-dark-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-cherry dark:shadow-dark-card space-y-6 animate-fadeIn transition-all duration-200">
      {/* Stage Header */}
      <div className="border-b border-cream/20 dark:border-dark-border pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-matcha dark:text-cherry block font-bold">Stage 02</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-cream dark:text-dark-ink">
            Sort It — Waste Stream & Compatibility
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Waste Categorization */}
        <div className="space-y-4 bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-6 shadow-inner dark:shadow-subtle">
          <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
            Waste Categorization
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm font-sans">
            <div>
              <span className="text-cream/80 dark:text-dark-mutedInk text-[11px] font-mono font-semibold">Assigned Waste Category:</span>
              <p className="text-base sm:text-lg font-display font-bold text-cream dark:text-dark-ink mt-0.5">
                {waste.waste_category}
              </p>
            </div>

            {showCanonical && (
              <div>
                <span className="text-cream/80 dark:text-dark-mutedInk text-[11px] font-mono font-semibold">Canonical Stream:</span>
                <p className="text-xs font-mono text-matcha dark:text-cherry font-bold mt-1 bg-cherry-deeper dark:bg-cream/40 px-3 py-1.5 rounded-lg border border-cream/15 dark:border-dark-border">
                  {waste.canonical_waste_category}
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-cream/15 dark:border-dark-border">
              <span className="text-cream/80 dark:text-dark-mutedInk text-[11px] font-mono font-semibold">Preferred Management Pathway:</span>
              <p className="text-xs sm:text-sm text-cream dark:text-dark-ink bg-cherry-deeper dark:bg-cream/40 p-3.5 rounded-xl border border-cream/15 dark:border-dark-border mt-1 font-medium leading-relaxed">
                {waste.preferred_management_pathway || 'Manage through institutional hazardous chemical waste pathway.'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Storage & Segregation Rules */}
        <div className="space-y-4 bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-6 shadow-inner dark:shadow-subtle">
          <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
            Storage & Segregation Rules
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm font-sans">
            <div>
              <span className="text-cream/80 dark:text-dark-mutedInk text-[11px] font-mono font-semibold">Storage Compatibility Group:</span>
              <p className="text-xs sm:text-sm font-mono font-medium text-cream dark:text-dark-ink bg-cherry-deeper dark:bg-cream/40 p-3 rounded-xl border border-cream/15 dark:border-dark-border mt-1">
                {waste.storage_compatibility_group || 'Segregate by hazard class'}
              </p>
            </div>

            <div>
              <span className="text-matcha dark:text-cherry font-bold text-[11px] font-mono block mb-1">
                Incompatible With (Strict Segregation):
              </span>
              <div className="bg-cherry-deeper dark:bg-cream/40 border border-cream/20 dark:border-dark-border rounded-xl p-3.5 text-cream dark:text-dark-ink font-medium leading-relaxed text-xs sm:text-sm">
                {waste.incompatible_with || 'Check SDS compatibility matrix'}
              </div>
            </div>

            {waste.peroxide_former && waste.peroxide_former !== 'No' && waste.peroxide_former !== 'No/Unknown' && (
              <div className="bg-cherry-deeper dark:bg-cream/40 border border-matcha/40 dark:border-cherry/30 rounded-xl p-3 text-matcha dark:text-cherry text-xs font-mono font-bold">
                * Peroxide Former Warning: {waste.peroxide_former}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
