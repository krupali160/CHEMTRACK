import React from 'react';
import { ChemicalDetail } from '../../types';
import { HazardBadge } from '../common/HazardBadge';

interface KnowItStageProps {
  chemical: ChemicalDetail;
}

export const KnowItStage: React.FC<KnowItStageProps> = ({ chemical }) => {
  return (
    <div className="bg-cherry dark:bg-cream text-cream dark:text-dark-ink border border-cream/20 dark:border-dark-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-cherry dark:shadow-dark-card space-y-6 animate-fadeIn transition-all duration-200">
      {/* Stage Header */}
      <div className="border-b border-cream/20 dark:border-dark-border pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-matcha dark:text-cherry block font-bold">Stage 01</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-cream dark:text-dark-ink">
            Know It — Chemical Identity & SDS Parameters
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Molecular & Physical Profile */}
        <div className="space-y-4 bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-6 shadow-inner dark:shadow-subtle">
          <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
            Molecular & Physical Profile
          </h3>
          
          <dl className="space-y-3 text-xs sm:text-sm font-sans">
            <div className="flex justify-between py-1.5 border-b border-cream/10 dark:border-dark-border">
              <dt className="text-cream/80 dark:text-dark-mutedInk font-medium">Chemical Name:</dt>
              <dd className="font-display font-bold text-cream dark:text-dark-ink text-right">{chemical.chemical_name}</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-cream/10 dark:border-dark-border">
              <dt className="text-cream/80 dark:text-dark-mutedInk font-medium">CAS Number:</dt>
              <dd className="font-mono font-bold text-matcha dark:text-cherry">{chemical.cas_number}</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-cream/10 dark:border-dark-border">
              <dt className="text-cream/80 dark:text-dark-mutedInk font-medium">Formula:</dt>
              <dd className="font-mono font-bold text-cream dark:text-dark-ink">{chemical.formula || '—'}</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-cream/10 dark:border-dark-border">
              <dt className="text-cream/80 dark:text-dark-mutedInk font-medium">Physical State:</dt>
              <dd className="font-medium text-cream dark:text-dark-ink">{chemical.physical_state || 'Refer to SDS'}</dd>
            </div>
            <div className="flex justify-between py-1.5">
              <dt className="text-cream/80 dark:text-dark-mutedInk font-medium">Representation:</dt>
              <dd className="font-medium text-cream dark:text-dark-ink">{chemical.representation_type || 'Pure compound'}</dd>
            </div>
          </dl>
        </div>

        {/* Card 2: Hazard Classification & Toxicity */}
        <div className="space-y-4 bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-6 shadow-inner dark:shadow-subtle">
          <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
            Hazard Classification & Toxicity
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm font-sans">
            <div>
              <p className="text-cream/80 dark:text-dark-mutedInk text-[11px] mb-1.5 font-mono font-semibold">Hazard Tags:</p>
              <HazardBadge tags={chemical.hazard_tags} />
            </div>

            <div>
              <p className="text-cream/80 dark:text-dark-mutedInk text-[11px] mb-1 font-mono font-semibold">Flammability & Toxicity Information:</p>
              <p className="text-cream dark:text-dark-ink bg-cherry-deeper dark:bg-cream/40 p-3.5 rounded-xl border border-cream/15 dark:border-dark-border leading-relaxed font-medium">
                {chemical.flammability_toxicity_notes || 'Review institutional Safety Data Sheet (SDS).'}
              </p>
            </div>

            {chemical.merge_correction_notes && (
              <div>
                <p className="text-cream/80 dark:text-dark-mutedInk text-[11px] mb-1 font-mono font-semibold">Scientific Review Notes:</p>
                <p className="text-cream/90 dark:text-dark-mutedInk italic bg-cherry-deeper dark:bg-cream/40 p-3.5 rounded-xl border border-cream/15 dark:border-dark-border leading-relaxed">
                  {chemical.merge_correction_notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
