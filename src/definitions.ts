
export interface GameState {
  money: number;
  pakistaniCount: number;
  homelessCount: number;
  sebastianCount: number;
  zaidCount: number;
  elonCount: number;
  muhammadCount: number;
  superMuhammadCount: number;
  ultraMuhammadCount: number;
  omegaMuhammadCount: number;
  ascendedMuhammadCount: number;
  pakistaniCost: number;
  homelessCost: number;
  sebastianCost: number;
  zaidCost: number;
  elonCost: number;
  muhammadCost: number;
  superMuhammadCost: number;
  ultraMuhammadCost: number;
  omegaMuhammadCost: number;
  ascendedMuhammadCost: number;
  lastSave: number;
  currentLevel: number;
  totalEarned: number;
  prestige: number;
  prestigeMultiplier: number;
  highestPrestigeEarned: number;
  prestigeTokens: number;
  unlockedCanvasUpgrades: string[];
}

export const initialState: GameState = {
  money: 0,
  pakistaniCount: 0,
  homelessCount: 0,
  sebastianCount: 0,
  zaidCount: 0,
  elonCount: 0,
  muhammadCount: 0,
  superMuhammadCount: 0,
  ultraMuhammadCount: 0,
  omegaMuhammadCount: 0,
  ascendedMuhammadCount: 0,
  pakistaniCost: 10,
  homelessCost: 100,
  sebastianCost: 500,
  zaidCost: 1000,
  elonCost: 2500,
  muhammadCost: 10000,
  superMuhammadCost: 50000,
  ultraMuhammadCost: 250000,
  omegaMuhammadCost: 1000000,
  ascendedMuhammadCost: 5000000,
  lastSave: Date.now(),
  currentLevel: 0,
  totalEarned: 0,
  prestige: 0,
  prestigeMultiplier: 1,
  highestPrestigeEarned: 0,
  prestigeTokens: 0,
  unlockedCanvasUpgrades: [],
};

export const costIncrease = 1.15;
export const generationRates = {
  pakistani: { perSecond: 0.1 },
  homeless: { perSecond: 1 },
  sebastian: { perSecond: 5 },
  zaid: { perSecond: 10 },
  elon: { perSecond: 25 },
  muhammad: { perSecond: 100 },
  superMuhammad: { perSecond: 500 },
  ultraMuhammad: { perSecond: 2500 },
  omegaMuhammad: { perSecond: 10000 },
  ascendedMuhammad: { multiplierBoost: 0.1 }, // 10% boost per unit
  comboBoost: { multiplier: 1.5 }, // Boost for owning multiple Muhammads together
};

export const prestigeRequirements = [
  { threshold: (highest: number, prestige: number) => 500000 * (1 + prestige * 0.5), description: (highest: number, prestige: number) => `Reach $${(500000 * (1 + prestige * 0.5)).toLocaleString()} to unlock prestige!` },
];

export interface Level {
  name: string;
  threshold: number;
  backgroundColor: string;
  description: string;
}

export const levels: Level[] = [
  { name: "Amman, Jordan", threshold: 0, backgroundColor: "#D2B48C", description: "Your humble beginnings in the beautiful capital of Jordan." },
  { name: "Beirut, Lebanon", threshold: 100, backgroundColor: "#F5DEB3", description: "Moving to the vibrant shores of Beirut." },
  { name: "Dubai, UAE", threshold: 300, backgroundColor: "#FFEBCD", description: "Rising to the heights in the luxurious Dubai." },
  { name: "Cairo, Egypt", threshold: 500, backgroundColor: "#DEB887", description: "Exploring the ancient wonders of Cairo." },
  { name: "Riyadh, Saudi Arabia", threshold: 1000, backgroundColor: "#F0E68C", description: "Diving into the bustling heart of Riyadh." },
  { name: "New York, USA", threshold: 5000, backgroundColor: "#ADD8E6", description: "Conquering the city that never sleeps." },
  { name: "London, UK", threshold: 10000, backgroundColor: "#D3D3D3", description: "Tea time in the historic streets of London." },
  { name: "Paris, France", threshold: 25000, backgroundColor: "#FFD700", description: "Romance and richness in the City of Lights." },
  { name: "Singapore", threshold: 50000, backgroundColor: "#98FB98", description: "Embracing innovation in the lion city of Singapore." },
  { name: "Rome, Italy", threshold: 75000, backgroundColor: "#F4A460", description: "Mastering the eternal city of Rome." },
  { name: "Berlin, Germany", threshold: 100000, backgroundColor: "#708090", description: "Pioneering progress in the vibrant Berlin." },
  { name: "Sydney, Australia", threshold: 250000, backgroundColor: "#87CEEB", description: "Discovering the harbors of Sydney down under." },
  { name: "Cape Town, South Africa", threshold: 500000, backgroundColor: "#FFEFD5", description: "Scaling the peaks of opportunity in Cape Town." },
  { name: "Los Angeles, USA", threshold: 750000, backgroundColor: "#FFA07A", description: "Starring in the entertainment capital of Los Angeles." },
  { name: "Stockholm, Sweden", threshold: 1000000, backgroundColor: "#FFFACD", description: "The pinnacle of success in serene Stockholm." },
];

export const canvasUpgrades = [
  { id: "particles", name: "Enhanced Particles", cost: 1, description: "Unlock colorful particle effects on clicks." },
  { id: "animations", name: "Background Animations", cost: 2, description: "Add animated backgrounds tied to prestige level." },
  { id: "glow", name: "Entity Glow", cost: 3, description: "Make entities glow in higher prestige levels." },
];
