/**
 * Per-chemical story rotation and partial progress tracker.
 */

export function getStoryIndexForChemical(cas: string, totalStories: number): number {
  if (totalStories <= 1) return 0;
  try {
    const raw = localStorage.getItem(`chemtrack_btt_idx_${cas}`);
    if (raw === null) return 0;
    const val = parseInt(raw, 10);
    return isNaN(val) ? 0 : val % totalStories;
  } catch {
    return 0;
  }
}

export function advanceStoryIndexForChemical(cas: string, totalStories: number): number {
  if (totalStories <= 1) return 0;
  try {
    const current = getStoryIndexForChemical(cas, totalStories);
    const next = (current + 1) % totalStories;
    localStorage.setItem(`chemtrack_btt_idx_${cas}`, next.toString());
    // Clear partial progress upon completed rotation
    localStorage.removeItem(`chemtrack_partial_${cas}`);
    return next;
  } catch {
    return 0;
  }
}

export function getPartialProgress(cas: string): number {
  try {
    const raw = localStorage.getItem(`chemtrack_partial_${cas}`);
    if (raw === null) return 0;
    const val = parseInt(raw, 10);
    return isNaN(val) ? 0 : val;
  } catch {
    return 0;
  }
}

export function setPartialProgress(cas: string, cardIndex: number): void {
  try {
    localStorage.setItem(`chemtrack_partial_${cas}`, cardIndex.toString());
  } catch {}
}
