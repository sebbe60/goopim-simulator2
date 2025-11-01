
import { levels, canvasUpgrades } from "./definitions";
import { canPrestige, getCurrentPrestigeRequirement } from "./utils";

export function updateUI(
  money: number,
  counts: { pakistani: number; homeless: number; sebastian: number; zaid: number; elon: number; muhammad: number; superMuhammad: number; ultraMuhammad: number; omegaMuhammad: number; ascendedMuhammad: number },
  costs: { pakistani: number; homeless: number; sebastian: number; zaid: number; elon: number; muhammad: number; superMuhammad: number; ultraMuhammad: number; omegaMuhammad: number; ascendedMuhammad: number },
  playerLevel: number,
  incomePerSec: number,
  state: any // GameState
) {
  const moneyValue = document.getElementById('money-value') as HTMLElement;
  const incomeValue = document.getElementById('income-value') as HTMLElement;
  const pakistaniCost = document.getElementById('pakistani-cost') as HTMLElement;
  const homelessCost = document.getElementById('homeless-cost') as HTMLElement;
  const sebastianCost = document.getElementById('sebastian-cost') as HTMLElement;
  const zaidCost = document.getElementById('zaid-cost') as HTMLElement;
  const elonCost = document.getElementById('elon-cost') as HTMLElement;
  const muhammadCost = document.getElementById('muhammad-cost') as HTMLElement;
  const pakistaniCount = document.getElementById('pakistani-count') as HTMLElement;
  const homelessCount = document.getElementById('homeless-count') as HTMLElement;
  const sebastianCount = document.getElementById('sebastian-count') as HTMLElement;
  const zaidCount = document.getElementById('zaid-count') as HTMLElement;
  const elonCount = document.getElementById('elon-count') as HTMLElement;
  const muhammadCount = document.getElementById('muhammad-count') as HTMLElement;
  const pakistaniGen = document.getElementById('pakistani-gen') as HTMLElement;
  const homelessGen = document.getElementById('homeless-gen') as HTMLElement;
  const sebastianGen = document.getElementById('sebastian-gen') as HTMLElement;
  const zaidGen = document.getElementById('zaid-gen') as HTMLElement;
  const elonGen = document.getElementById('elon-gen') as HTMLElement;
  const muhammadGen = document.getElementById('muhammad-gen') as HTMLElement;
  const levelDisplay = document.getElementById('level-display') as HTMLElement;
  const levelName = document.getElementById('level-name') as HTMLElement;
  const levelDescription = document.getElementById('level-description') as HTMLElement;
  const nextLevelInfo = document.getElementById('next-level-info') as HTMLElement;
  const disclaimer = document.getElementById('disclaimer') as HTMLElement;
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const prestigeDisplay = document.getElementById('prestige-display') as HTMLElement;
  const prestigeReq = document.getElementById('prestige-req') as HTMLElement;
  const prestigeButton = document.getElementById('prestige-btn') as HTMLButtonElement;
  const comboInfo = document.getElementById('combo-info') as HTMLElement;
  const superMuhammadSection = document.getElementById('super-muhammad-section') as HTMLElement;
  const ultraMuhammadSection = document.getElementById('ultra-muhammad-section') as HTMLElement;
  const omegaMuhammadSection = document.getElementById('omega-muhammad-section') as HTMLElement;
  const ascendedMuhammadSection = document.getElementById('ascended-muhammad-section') as HTMLElement;
  const superMuhammadCost = document.getElementById('super-muhammad-cost') as HTMLElement;
  const ultraMuhammadCost = document.getElementById('ultra-muhammad-cost') as HTMLElement;
  const omegaMuhammadCost = document.getElementById('omega-muhammad-cost') as HTMLElement;
  const ascendedMuhammadCost = document.getElementById('ascended-muhammad-cost') as HTMLElement;
  const superMuhammadCount = document.getElementById('super-muhammad-count') as HTMLElement;
  const ultraMuhammadCount = document.getElementById('ultra-muhammad-count') as HTMLElement;
  const omegaMuhammadCount = document.getElementById('omega-muhammad-count') as HTMLElement;
  const ascendedMuhammadCount = document.getElementById('ascended-muhammad-count') as HTMLElement;
  const superMuhammadGen = document.getElementById('super-muhammad-gen') as HTMLElement;
  const ultraMuhammadGen = document.getElementById('ultra-muhammad-gen') as HTMLElement;
  const omegaMuhammadGen = document.getElementById('omega-muhammad-gen') as HTMLElement;
  const ascendedMuhammadMult = document.getElementById('ascended-muhammad-mult') as HTMLElement;
  const prestigeTokensValue = document.getElementById('prestige-tokens-value') as HTMLElement;
  const buyParticlesBtn = document.getElementById('buy-particles') as HTMLButtonElement;
  const buyAnimationsBtn = document.getElementById('buy-animations') as HTMLButtonElement;
  const buyGlowBtn = document.getElementById('buy-glow') as HTMLButtonElement;

  const totalMuhammad = counts.muhammad + counts.superMuhammad + counts.ultraMuhammad + counts.omegaMuhammad + counts.ascendedMuhammad;
  const muhammadCombo = totalMuhammad >= 10 ? 1.5 : 1;
  const ascendedBoost = Math.pow(1 + 0.1, counts.ascendedMuhammad);

  moneyValue.textContent = money.toFixed(0);
  incomeValue.textContent = incomePerSec.toFixed(2);
  pakistaniCost.textContent = costs.pakistani.toString();
  homelessCost.textContent = costs.homeless.toString();
  sebastianCost.textContent = costs.sebastian.toString();
  zaidCost.textContent = costs.zaid.toString();
  elonCost.textContent = costs.elon.toString();
  muhammadCost.textContent = costs.muhammad.toString();
  superMuhammadCost.textContent = costs.superMuhammad.toString();
  ultraMuhammadCost.textContent = costs.ultraMuhammad.toString();
  omegaMuhammadCost.textContent = costs.omegaMuhammad.toString();
  ascendedMuhammadCost.textContent = costs.ascendedMuhammad.toString();
  pakistaniCount.textContent = counts.pakistani.toString();
  homelessCount.textContent = counts.homeless.toString();
  sebastianCount.textContent = counts.sebastian.toString();
  zaidCount.textContent = counts.zaid.toString();
  elonCount.textContent = counts.elon.toString();
  muhammadCount.textContent = counts.muhammad.toString();
  superMuhammadCount.textContent = counts.superMuhammad.toString();
  ultraMuhammadCount.textContent = counts.ultraMuhammad.toString();
  omegaMuhammadCount.textContent = counts.omegaMuhammad.toString();
  ascendedMuhammadCount.textContent = counts.ascendedMuhammad.toString();

  pakistaniGen.textContent = (counts.pakistani * 0.1 * state.prestigeMultiplier * ascendedBoost).toFixed(2);
  homelessGen.textContent = (counts.homeless * 1 * state.prestigeMultiplier * ascendedBoost).toFixed(2);
  sebastianGen.textContent = (counts.sebastian * 5 * state.prestigeMultiplier * ascendedBoost).toFixed(2);
  zaidGen.textContent = (counts.zaid * 10 * state.prestigeMultiplier * ascendedBoost).toFixed(2);
  elonGen.textContent = (counts.elon * 25 * state.prestigeMultiplier * ascendedBoost).toFixed(2);
  muhammadGen.textContent = (counts.muhammad * 100 * state.prestigeMultiplier * muhammadCombo * ascendedBoost).toFixed(2);
  superMuhammadGen.textContent = (counts.superMuhammad * 500 * state.prestigeMultiplier * muhammadCombo * ascendedBoost).toFixed(2);
  ultraMuhammadGen.textContent = (counts.ultraMuhammad * 2500 * state.prestigeMultiplier * muhammadCombo * ascendedBoost).toFixed(2);
  omegaMuhammadGen.textContent = (counts.omegaMuhammad * 10000 * state.prestigeMultiplier * muhammadCombo * ascendedBoost).toFixed(2);
  ascendedMuhammadMult.textContent = ascendedBoost.toFixed(2);

  // Update level info
  const currentLevel = levels[playerLevel] || levels[0];
  levelDisplay.textContent = `Level ${playerLevel + 1}`;
  levelName.textContent = currentLevel.name;
  levelDescription.textContent = currentLevel.description;
  canvas.style.backgroundColor = currentLevel.backgroundColor;
  if (playerLevel >= 2) {
    disclaimer.style.display = 'block';
  } else {
    disclaimer.style.display = 'none';
  }
  const nextLevel = levels[playerLevel + 1];
  if (nextLevel) {
    nextLevelInfo.textContent = `Next level: ${nextLevel.name} at $${nextLevel.threshold.toLocaleString()}`;
  } else {
    nextLevelInfo.textContent = 'Max level reached!';
  }

  // Prestige info
  prestigeDisplay.textContent = `Prestige: ${state.prestige} (Multiplier x${state.prestigeMultiplier.toFixed(1)})`;
  prestigeReq.textContent = getCurrentPrestigeRequirement(state);
  prestigeButton.disabled = !canPrestige(state);
  prestigeTokensValue.textContent = state.prestigeTokens.toString();

  // Combo info
  if (totalMuhammad >= 10) {
    comboInfo.style.display = 'block';
  } else {
    comboInfo.style.display = 'none';
  }

  // Section visibility
  superMuhammadSection.style.display = state.prestige >= 1 ? 'block' : 'none';
  ultraMuhammadSection.style.display = state.prestige >= 2 ? 'block' : 'none';
  omegaMuhammadSection.style.display = state.prestige >= 3 ? 'block' : 'none';
  ascendedMuhammadSection.style.display = state.prestige >= 4 ? 'block' : 'none';

  // Button disabled states
  const buyPakistaniBtn = document.getElementById('buy-pakistani') as HTMLButtonElement;
  const buyHomelessBtn = document.getElementById('buy-homeless') as HTMLButtonElement;
  const buySebastianBtn = document.getElementById('buy-sebastian') as HTMLButtonElement;
  const buyZaidBtn = document.getElementById('buy-zaid') as HTMLButtonElement;
  const buyElonBtn = document.getElementById('buy-elon') as HTMLButtonElement;
  const buyMuhammadBtn = document.getElementById('buy-muhammad') as HTMLButtonElement;
  const buySuperMuhammadBtn = document.getElementById('buy-super-muhammad') as HTMLButtonElement;
  const buyUltraMuhammadBtn = document.getElementById('buy-ultra-muhammad') as HTMLButtonElement;
  const buyOmegaMuhammadBtn = document.getElementById('buy-omega-muhammad') as HTMLButtonElement;
  const buyAscendedMuhammadBtn = document.getElementById('buy-ascended-muhammad') as HTMLButtonElement;

  buyPakistaniBtn.disabled = money < costs.pakistani;
  buyHomelessBtn.disabled = money < costs.homeless;
  buySebastianBtn.disabled = money < costs.sebastian;
  buyZaidBtn.disabled = money < costs.zaid;
  buyElonBtn.disabled = money < costs.elon;
  buyMuhammadBtn.disabled = money < costs.muhammad;
  buySuperMuhammadBtn.disabled = money < costs.superMuhammad || state.prestige < 1;
  buyUltraMuhammadBtn.disabled = money < costs.ultraMuhammad || state.prestige < 2;
  buyOmegaMuhammadBtn.disabled = money < costs.omegaMuhammad || state.prestige < 3;
  buyAscendedMuhammadBtn.disabled = money < costs.ascendedMuhammad || state.prestige < 4;

  // Canvas upgrades
  for (const upgrade of canvasUpgrades) {
    let btn: HTMLButtonElement;
    let unlocked = state.unlockedCanvasUpgrades.includes(upgrade.id);
    if (upgrade.id === 'particles') {
      btn = buyParticlesBtn;
    } else if (upgrade.id === 'animations') {
      btn = buyAnimationsBtn;
    } else if (upgrade.id === 'glow') {
      btn = buyGlowBtn;
    } else {
      continue;
    }
    if (unlocked) {
      btn.disabled = true;
      btn.textContent = `${upgrade.name} (Unlocked)`;
    } else if (state.prestigeTokens >= upgrade.cost) {
      btn.disabled = false;
      btn.textContent = `${upgrade.name} (${upgrade.cost} Tokens)`;
    } else {
      btn.disabled = true;
      btn.textContent = `${upgrade.name} (${upgrade.cost} Tokens)`;
    }
  }

  // Apply canvas effects
  canvas.classList.remove('animated', 'glow');
  if (state.unlockedCanvasUpgrades.includes('animations')) {
    canvas.classList.add('animated');
  }
  if (state.unlockedCanvasUpgrades.includes('glow')) {
    canvas.classList.add('glow');
  }
}

export function showLevelUpNotification(oldLevel: number, newLevel: number) {
  const notification = document.getElementById('level-up-notification') as HTMLElement;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

export function showPrestigeNotification(multiplier: number) {
  const notification = document.getElementById('prestige-notification') as HTMLElement;
  const message = document.getElementById('prestige-notification-message') as HTMLElement;
  message.textContent = `Prestige Successful! New Multiplier: x${multiplier.toFixed(1)}`;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}
