import React, { useState } from 'react';
import { ChemicalDetail, WasteDecision, StoryCard } from '../../types';
import { ChemicalHeader } from './ChemicalHeader';
import { StageNav, StageId } from './StageNav';
import { KnowItStage } from './KnowItStage';
import { SortItStage } from './SortItStage';
import { HandleItStage } from './HandleItStage';
import { WhyItMattersStage } from './WhyItMattersStage';
import { StoryUnlockModal } from '../stories/StoryUnlockModal';
import { StoryReelsViewer } from '../stories/StoryReelsViewer';
import { getStoryIndexForChemical, advanceStoryIndexForChemical } from '../../services/storyRotation';
import { Loader2 } from 'lucide-react';

interface ChemicalProfileProps {
  chemical: ChemicalDetail;
  waste: WasteDecision | null;
  stories: StoryCard[];
  loadingWaste?: boolean;
}

export const ChemicalProfile: React.FC<ChemicalProfileProps> = ({
  chemical,
  waste,
  stories,
  loadingWaste = false
}) => {
  const [activeStage, setActiveStage] = useState<StageId>('know');
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showReelsViewer, setShowReelsViewer] = useState(false);

  // Rotation index for this chemical
  const storyIndex = getStoryIndexForChemical(chemical.cas_number, stories.length);
  const currentStory = stories[storyIndex] || stories[0];

  const handleSelectStage = (stage: StageId) => {
    setActiveStage(stage);
    // When user reaches Stage 4 (Why It Matters), trigger surprise discovery invitation if stories exist
    if (stage === 'why' && stories.length > 0) {
      setShowUnlockModal(true);
    }
  };

  const handleStoryCompleted = () => {
    // Advance rotation only upon completing story assembly
    advanceStoryIndexForChemical(chemical.cas_number, stories.length);
  };

  return (
    <div className="space-y-6">
      {/* 1. Chemical Identity Hero Banner */}
      <ChemicalHeader chemical={chemical} />

      {/* 2. Four-Stage Stepper Navigation */}
      <StageNav activeStage={activeStage} onSelectStage={handleSelectStage} />

      {/* 3. Stage Content Panels */}
      <div className="pt-2">
        {activeStage === 'know' && (
          <KnowItStage chemical={chemical} />
        )}

        {activeStage === 'sort' && (
          loadingWaste ? (
            <div className="py-12 text-center text-cream dark:text-dark-ink space-y-2 bg-cherry dark:bg-cream rounded-3xl border border-cream/20 dark:border-dark-border p-8 shadow-cherry dark:shadow-dark-card">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-matcha dark:text-cherry" />
              <p className="text-xs font-mono font-bold">Loading waste decision data...</p>
            </div>
          ) : waste ? (
            <SortItStage waste={waste} />
          ) : (
            <div className="py-8 text-center text-xs font-mono bg-cherry dark:bg-cream text-cream dark:text-dark-ink rounded-3xl border border-cream/20 dark:border-dark-border p-8 shadow-cherry dark:shadow-dark-card">
              No waste decision record found for CAS {chemical.cas_number}.
            </div>
          )
        )}

        {activeStage === 'handle' && (
          loadingWaste ? (
            <div className="py-12 text-center text-cream dark:text-dark-ink space-y-2 bg-cherry dark:bg-cream rounded-3xl border border-cream/20 dark:border-dark-border p-8 shadow-cherry dark:shadow-dark-card">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-matcha dark:text-cherry" />
              <p className="text-xs font-mono font-bold">Loading handling guidance...</p>
            </div>
          ) : waste ? (
            <HandleItStage waste={waste} />
          ) : (
            <div className="py-8 text-center text-xs font-mono bg-cherry dark:bg-cream text-cream dark:text-dark-ink rounded-3xl border border-cream/20 dark:border-dark-border p-8 shadow-cherry dark:shadow-dark-card">
              No handling guidance record found for CAS {chemical.cas_number}.
            </div>
          )
        )}

        {activeStage === 'why' && (
          loadingWaste ? (
            <div className="py-12 text-center text-cream dark:text-dark-ink space-y-2 bg-cherry dark:bg-cream rounded-3xl border border-cream/20 dark:border-dark-border p-8 shadow-cherry dark:shadow-dark-card">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-matcha dark:text-cherry" />
              <p className="text-xs font-mono font-bold">Loading environmental context...</p>
            </div>
          ) : waste ? (
            <WhyItMattersStage waste={waste} />
          ) : (
            <div className="py-8 text-center text-xs font-mono bg-cherry dark:bg-cream text-cream dark:text-dark-ink rounded-3xl border border-cream/20 dark:border-dark-border p-8 shadow-cherry dark:shadow-dark-card">
              No environmental context record found for CAS {chemical.cas_number}.
            </div>
          )
        )}
      </div>

      {/* 4. Beyond the Textbook Surprise Modal (Triggered after Stage 4) */}
      {stories.length > 0 && currentStory && (
        <StoryUnlockModal
          isOpen={showUnlockModal}
          onClose={() => setShowUnlockModal(false)}
          onExplore={() => {
            setShowUnlockModal(false);
            setShowReelsViewer(true);
          }}
          currentStory={currentStory}
          casNumber={chemical.cas_number}
          totalStories={stories.length}
        />
      )}

      {/* 5. Full-Screen Vertical Scroll Reels Viewer */}
      {showReelsViewer && currentStory && (
        <StoryReelsViewer
          story={currentStory}
          chemical={chemical}
          onClose={() => setShowReelsViewer(false)}
          onComplete={handleStoryCompleted}
        />
      )}
    </div>
  );
};
