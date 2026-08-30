import React from 'react';
import { Recycle, HandMetal, Sprout, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { StageId } from './StageNav';

interface StagePlaceholderProps {
  stage: StageId;
  chemicalName: string;
}

export const StagePlaceholder: React.FC<StagePlaceholderProps> = ({ stage, chemicalName }) => {
  const meta = {
    sort: {
      title: 'Stage 2: Sort It ♻️',
      subtitle: 'Waste Categorization & Stream Segregation',
      description: `Waste stream classification, canonical categorization, and storage compatibility groups for ${chemicalName}.`,
      icon: Recycle,
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      text: 'text-amber-900',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      upcoming: [
        'Assigned Waste Category (e.g. Organic Solvent, Acid Waste)',
        'Preferred Management Pathway (Incineration, Recovery, Neutralization)',
        'Storage Compatibility Group & Incompatible Substances to Segregate'
      ]
    },
    handle: {
      title: 'Stage 3: Handle It 🧤',
      subtitle: 'Containment Facilities & Safe Handling Protocols',
      description: `Facility requirements, PPE checklist, and explicit practices to avoid when working with ${chemicalName}.`,
      icon: HandMetal,
      bg: 'bg-indigo-50/70',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      upcoming: [
        'Required Facility/Equipment (Fume Hood, Acid Cabinet, Flammable Storage)',
        'Contingency Guidance (If Preferred Facility Unavailable)',
        'Explicit Practices to AVOID (Drain disposal, unsafe mixing)',
        'Institutional Safety Officer Verification Checkpoint'
      ]
    },
    why: {
      title: 'Stage 4: Why It Matters 🌱',
      subtitle: 'Environmental Impact & Green Chemistry Practice',
      description: `Ecotoxicity context, environmental risk assessment, and green chemistry stewardship for ${chemicalName}.`,
      icon: Sprout,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      upcoming: [
        'Environmental Impact Context & Ecotoxicity Rationale',
        'Assessed Environmental Risk Level (Low / Moderate / High)',
        'Responsible Laboratory Citizenship & Solvent Recovery Principles'
      ]
    },
    know: {
      title: 'Stage 1: Know It 🧪',
      subtitle: 'Identity & Hazards',
      description: '',
      icon: Clock,
      bg: '',
      border: '',
      text: '',
      badgeBg: '',
      upcoming: []
    }
  }[stage];

  const Icon = meta.icon;

  return (
    <div className={`border ${meta.border} ${meta.bg} rounded-xl p-6 shadow-card space-y-4`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${meta.text}`}>{meta.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{meta.subtitle}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${meta.badgeBg} flex items-center gap-1`}>
          <Clock className="w-3.5 h-3.5" /> Structured Layout Ready
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-white/80 p-3.5 rounded-lg border border-slate-200/60">
        {meta.description}
      </p>

      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Upcoming Section Highlights:
        </span>
        <ul className="space-y-1.5 text-xs text-slate-600">
          {meta.upcoming.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-white/60 px-3 py-2 rounded border border-slate-100 font-medium">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-[11px] text-slate-500 pt-2 flex items-center gap-1.5 border-t border-slate-200/60">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Data verified in SQLite database (<code className="font-mono text-slate-700">chemtrack.db</code>). Full component rendering in Phase 3B-2.</span>
      </div>
    </div>
  );
};
