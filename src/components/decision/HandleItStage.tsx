import React from 'react';
import { WasteDecision } from '../../types';

interface HandleItStageProps {
  waste: WasteDecision;
}

export const HandleItStage: React.FC<HandleItStageProps> = ({ waste }) => {
  return (
    <div className="bg-cherry dark:bg-cream text-cream dark:text-dark-ink border border-cream/20 dark:border-dark-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-cherry dark:shadow-dark-card space-y-6 animate-fadeIn transition-all duration-200">
      {/* Stage Header */}
      <div className="border-b border-cream/20 dark:border-dark-border pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-matcha dark:text-cherry block font-bold">Stage 03</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-cream dark:text-dark-ink">
            Handle It — Containment & Protocols
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Facility Requirements & Contingency */}
        <div className="space-y-4 bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-6 shadow-inner dark:shadow-subtle flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
              Required Facility & Equipment
            </h3>
            <p className="text-xs sm:text-sm text-cream dark:text-dark-ink bg-cherry-deeper dark:bg-cream/40 p-4 rounded-xl border border-cream/15 dark:border-dark-border font-medium leading-relaxed">
              {waste.required_facility || 'Compatible chemical container, proper labeling, approved chemical waste storage area, authorized waste handler.'}
            </p>
          </div>

          {waste.if_facility_unavailable && waste.if_facility_unavailable.trim() !== '' && (
            <div className="space-y-2 pt-3 border-t border-cream/15 dark:border-dark-border">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cream/80 dark:text-dark-mutedInk font-bold">
                Contingency Guidance (If Facility Unavailable):
              </span>
              <p className="text-xs text-cream dark:text-dark-ink bg-cherry-deeper dark:bg-cream/40 p-3 rounded-xl border border-cream/15 dark:border-dark-border italic leading-relaxed">
                {waste.if_facility_unavailable}
              </p>
            </div>
          )}
        </div>

        {/* Card 2: Practices to Avoid & Institutional Verification */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Prohibited Practices Box */}
          <div className="bg-cherry-deeper dark:bg-white border border-cream/20 dark:border-dark-border rounded-2xl p-5 space-y-2 shadow-sm dark:shadow-subtle">
            <h3 className="text-xs font-mono uppercase tracking-wider text-matcha dark:text-cherry font-bold">
              Explicit Practices to AVOID
            </h3>
            <p className="text-xs sm:text-sm text-cream dark:text-dark-ink font-medium leading-relaxed">
              {waste.avoid || 'Do not pour down the drain, do not treat as ordinary municipal trash, and avoid mixing with incompatible chemical wastes.'}
            </p>
          </div>

          {/* Institutional Verification Box */}
          <div className="bg-cherry-dark/70 dark:bg-white border border-cream/15 dark:border-dark-border rounded-2xl p-5 space-y-1.5 shadow-inner dark:shadow-subtle">
            <span className="text-xs font-mono uppercase tracking-wider text-cream/80 dark:text-dark-mutedInk font-bold block">
              Institutional Verification Checkpoint
            </span>
            <p className="text-xs sm:text-sm text-cream dark:text-dark-ink font-medium">
              Status: <strong className="text-matcha dark:text-cherry font-bold">{waste.verification_status || 'Needs SDS + institutional confirmation'}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Source Citation Footer */}
      {waste.source_reference && (
        <div className="pt-2 text-xs font-mono text-cream/70 dark:text-dark-mutedInk border-t border-cream/15 dark:border-dark-border">
          Source Reference: {waste.source_reference}
        </div>
      )}
    </div>
  );
};
