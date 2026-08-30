/**
 * ChemTrack TypeScript Data Types (mirrors FastAPI Pydantic schemas)
 */

export interface ChemicalSummary {
  chemical_id: string;
  chemical_name: string;
  formula: string | null;
  cas_number: string;
  physical_state: string | null;
  hazard_tags: string | null;
}

export interface ChemicalDetail {
  chemical_id: string;
  chemical_name: string;
  formula: string | null;
  cas_number: string;
  physical_state: string | null;
  representation_type: string | null;
  ghs_hazard_class: string | null;
  hazard_tags: string | null;
  flammability_toxicity_notes: string | null;
  needs_full_hazard_review: string | null;
  merge_correction_notes: string | null;
  safety_disclaimer: string;
}

export interface WasteDecision {
  chemical_id_fk: string;
  cas_number: string;
  waste_category: string;
  canonical_waste_category: string | null;
  preferred_management_pathway: string | null;
  required_facility: string | null;
  if_facility_unavailable: string | null;
  avoid: string | null;
  storage_compatibility_group: string | null;
  incompatible_with: string | null;
  peroxide_former: string | null;
  environmental_context: string | null;
  environmental_risk_level: string | null;
  verification_status: string | null;
  scientific_review_notes: string | null;
  source_reference: string | null;
  safety_disclaimer: string;
}

export interface StoryCard {
  story_id: string;
  chemical_name: string;
  formula: string | null;
  cas_number: string | null;
  is_matched_to_master: number;
  batch: string | null;
  global_sequence: number | null;
  story_title: string;
  story_theme: string | null;
  card_1_hook: string;
  card_2_reveal: string;
  card_3_why: string;
  card_4_explanation: string;
  card_5_beyond_textbook: string;
  card_6_aha: string;
  card_7_puzzle: string;
}
