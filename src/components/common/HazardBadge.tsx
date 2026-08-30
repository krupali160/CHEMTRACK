import React from 'react';

interface HazardBadgeProps {
  tags?: string | null;
  className?: string;
}

export const HazardBadge: React.FC<HazardBadgeProps> = ({ tags, className = '' }) => {
  if (!tags || tags.trim() === '') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-cream bg-cream/15 border border-cream/30 dark:bg-cherry/10 dark:text-cherry dark:border-cherry/20 font-medium ${className}`}>
        Standard Laboratory Chemical
      </span>
    );
  }

  // Deduplicate tags cleanly
  const rawTags = Array.from(
    new Set(tags.split(/[,;/]+/).map(t => t.trim()).filter(Boolean))
  );

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {rawTags.map((tag, idx) => (
        <span
          key={idx}
          className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] font-mono tracking-tight bg-cream/15 text-cream border border-cream/30 dark:bg-cherry/10 dark:text-cherry dark:border-cherry/20 font-bold shadow-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
