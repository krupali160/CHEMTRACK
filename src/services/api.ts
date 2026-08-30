/**
 * ChemTrack Frontend API Client
 * Clean fetch wrappers for interacting with the FastAPI backend.
 */

import { ChemicalSummary, ChemicalDetail, WasteDecision, StoryCard } from '../types';

const API_BASE = 'http://127.0.0.1:8000';

export async function searchChemicals(query?: string, limit: number = 20): Promise<ChemicalSummary[]> {
  const params = new URLSearchParams();
  if (query && query.trim()) params.append('q', query.trim());
  if (limit) params.append('limit', limit.toString());

  const url = `${API_BASE}/chemicals/search${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to search chemicals: ${response.statusText}`);
  }
  return response.json();
}

export async function getChemicalDetail(casNumber: string): Promise<ChemicalDetail> {
  const response = await fetch(`${API_BASE}/chemicals/${encodeURIComponent(casNumber)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch chemical detail for CAS ${casNumber}`);
  }
  return response.json();
}

export async function getWasteDecision(casNumber: string): Promise<WasteDecision> {
  const response = await fetch(`${API_BASE}/chemicals/${encodeURIComponent(casNumber)}/waste`);
  if (!response.ok) {
    throw new Error(`Failed to fetch waste decision for CAS ${casNumber}`);
  }
  return response.json();
}

export async function getStories(casNumber: string): Promise<StoryCard[]> {
  const response = await fetch(`${API_BASE}/stories/${encodeURIComponent(casNumber)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stories for CAS ${casNumber}`);
  }
  return response.json();
}
