
import { GameState, initialState, costIncrease, generationRates, prestigeRequirements } from "./definitions";

export function updateCosts(state: GameState): GameState {
  state.pakistaniCost = Math.floor(10 * Math.pow(costIncrease, state.pakistaniCount));
  state.homelessCost = Math.floor(100 * Math.pow(costIncrease, state.homelessCount));
  state.sebastianCost = Math.floor(500 * Math.pow(costIncrease, state.sebastianCount));
  state.zaidCost = Math.floor(1000 * Math.pow(costIncrease, state.zaidCount));
  state.elonCost = Math.floor(2500 * Math.pow(costIncrease, state.elonCount));
  state.muhammadCost = Math.floor(10000 * Math.pow(costIncrease, state.muhammadCount));
  state.superMuhammadCost = Math.floor(50000 * Math.pow(costIncrease, state.superMuhammadCount));
  state.ultraMuhammadCost = Math.floor(250000 * Math.pow(costIncrease, state.ultraMuhammadCount));
  state.omegaMuhammadCost = Math.floor(1000000 * Math.pow(costIncrease, state.omegaMuhammadCount));
  state.ascendedMuhammadCost = Math.floor(5000000 * Math.pow(costIncrease, state.ascendedMuhammadCount));
  return state;
}

export function calculateOffineIncome(state: GameState): number {
  const now = Date.now();
  const elapsedSeconds = (now - state.lastSave) / 1000;
  let income = 0;
  let muhammadCombo = 1 + (state.muhammadCount + state.superMuhammadCount + state.ultraMuhammadCount + state.omegaMuhammadCount + state.ascendedMuhammadCount >= 10 ? generationRates.comboBoost.multiplier - 1 : 0);
  income += state.pakistaniCount * generationRates.pakistani.perSecond * state.prestigeMultiplier;
  income += state.homelessCount * generationRates.homeless.perSecond * state.prestigeMultiplier;
  income += state.sebastianCount * generationRates.sebastian.perSecond * state.prestigeMultiplier;
  income += state.zaidCount * generationRates.zaid.perSecond * state.prestigeMultiplier;
  income += state.elonCount * generationRates.elon.perSecond * state.prestigeMultiplier;
  income += state.muhammadCount * generationRates.muhammad.perSecond * state.prestigeMultiplier * muhammadCombo;
  income += state.superMuhammadCount * generationRates.superMuhammad.perSecond * state.prestigeMultiplier * muhammadCombo;
  income += state.ultraMuhammadCount * generationRates.ultraMuhammad.perSecond * state.prestigeMultiplier * muhammadCombo;
  income += state.omegaMuhammadCount * generationRates.omegaMuhammad.perSecond * state.prestigeMultiplier * muhammadCombo;
  income += state.ascendedMuhammadCount * 0; // No base income, just boost
  const ascendedBoost = Math.pow(1 + generationRates.ascendedMuhammad.multiplierBoost, state.ascendedMuhammadCount);
  return Math.floor(income * ascendedBoost);
}

export function checkLevelProgression(state: GameState, newMoney: number): number {
  let newLevel = state.currentLevel;
  const levels = require('./definitions').levels; // Import if needed, but inline for simplicity
  for (let i = state.currentLevel + 1; i < levels.length; i++) {
    if (newMoney >= levels[i].threshold) {
      newLevel = i;
    } else {
      break;
    }
  }
  return newLevel;
}

export function canPrestige(state: GameState): boolean {
  const req = prestigeRequirements[0].threshold(state.highestPrestigeEarned, state.prestige);
  if (state.totalEarned >= req) return true;
  return false;
}

export function getCurrentPrestigeRequirement(state: GameState): string {
  return prestigeRequirements[0].description(state.highestPrestigeEarned, state.prestige);
}

export async function loadGame(): Promise<GameState> {
  const { persistence } = await import("./libs/persistence");
  const saved = await persistence.getItem('gameState');
  if (saved) {
    const state = { ...initialState };
    const parsed: Partial<GameState> = JSON.parse(saved);
    Object.assign(state, parsed);
    return state;
  }
  return { ...initialState };
}

export async function saveGame(state: GameState): Promise<void> {
  const { persistence } = await import("./libs/persistence");
  state.lastSave = Date.now();
  await persistence.setItem('gameState', JSON.stringify(state));
}

export async function prestigeReset(state: GameState): Promise<GameState> {
  const newHighest = Math.max(state.highestPrestigeEarned, state.totalEarned);
  const newMultiplier = 1 + (state.prestige * 0.5);
  const tokensEarned = Math.floor(state.prestige * 0.5) + 1; // 1 base + 0.5 per prestige level
  const resetState: GameState = {
    ...initialState,
    prestige: state.prestige + 1,
    prestigeMultiplier: newMultiplier,
    highestPrestigeEarned: newHighest,
    prestigeTokens: state.prestigeTokens + tokensEarned,
    lastSave: Date.now(),
  };
  await saveGame(resetState);
  return resetState;
}
