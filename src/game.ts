
import { GameState, initialState, generationRates, levels } from "./definitions";
import { updateCosts, calculateOffineIncome, checkLevelProgression, saveGame, loadGame, prestigeReset } from "./utils";
import { PakistaniDeveloper, HomelessMan, Sebastian, Zaid, ElonMusk, Muhammad, SuperMuhammad, UltraMuhammad, OmegaMuhammad, ClickParticle, Entity } from "./entities";
import { updateUI, showLevelUpNotification, showPrestigeNotification } from "./ui";

export class Game {
  private state: GameState = { ...initialState };
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private entities: Entity[] = [];
  private particles: ClickParticle[] = [];
  private lastLevel = 0;
  private incomePerSec = 0;
  private ticks = 0;

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setupEventListeners();
  }

  async init() {
    this.state = await loadGame();
    this.lastLevel = this.state.currentLevel;
    this.applyOfflineIncome();
    this.updateIncomePerSec();
    updateUI(this.state.money, {
      pakistani: this.state.pakistaniCount,
      homeless: this.state.homelessCount,
      sebastian: this.state.sebastianCount,
      zaid: this.state.zaidCount,
      elon: this.state.elonCount,
      muhammad: this.state.muhammadCount,
      superMuhammad: this.state.superMuhammadCount,
      ultraMuhammad: this.state.ultraMuhammadCount,
      omegaMuhammad: this.state.omegaMuhammadCount,
      ascendedMuhammad: this.state.ascendedMuhammadCount
    }, {
      pakistani: this.state.pakistaniCost,
      homeless: this.state.homelessCost,
      sebastian: this.state.sebastianCost,
      zaid: this.state.zaidCost,
      elon: this.state.elonCost,
      muhammad: this.state.muhammadCost,
      superMuhammad: this.state.superMuhammadCost,
      ultraMuhammad: this.state.ultraMuhammadCost,
      omegaMuhammad: this.state.omegaMuhammadCost,
      ascendedMuhammad: this.state.ascendedMuhammadCost
    }, this.state.currentLevel, this.incomePerSec, this.state);
    this.spawnEntities();
    requestAnimationFrame(this.gameLoop.bind(this));
    setInterval(() => this.generateIncome(), 1000);
  }

  private async applyOfflineIncome() {
    const offlineIncome = Math.min(calculateOffineIncome(this.state), 1000000); // Cap offline income to prevent excessive load
    this.state.money += offlineIncome;
    this.state.totalEarned += offlineIncome;
    this.state.currentLevel = checkLevelProgression(this.state, this.state.money);
    if (this.state.currentLevel > this.lastLevel) {
      showLevelUpNotification(this.lastLevel, this.state.currentLevel);
      this.lastLevel = this.state.currentLevel;
    }
    updateCosts(this.state);
  }

  private updateIncomePerSec() {
    const totalMuhammad = this.state.muhammadCount + this.state.superMuhammadCount + this.state.ultraMuhammadCount + this.state.omegaMuhammadCount + this.state.ascendedMuhammadCount;
    const muhammadCombo = totalMuhammad >= 10 ? generationRates.comboBoost.multiplier : 1;
    const ascendedBoost = Math.pow(1 + generationRates.ascendedMuhammad.multiplierBoost, this.state.ascendedMuhammadCount);
    this.incomePerSec = (this.state.pakistaniCount * generationRates.pakistani.perSecond +
                        this.state.homelessCount * generationRates.homeless.perSecond +
                        this.state.sebastianCount * generationRates.sebastian.perSecond +
                        this.state.zaidCount * generationRates.zaid.perSecond +
                        this.state.elonCount * generationRates.elon.perSecond +
                        this.state.muhammadCount * generationRates.muhammad.perSecond +
                        this.state.superMuhammadCount * generationRates.superMuhammad.perSecond +
                        this.state.ultraMuhammadCount * generationRates.ultraMuhammad.perSecond +
                        this.state.omegaMuhammadCount * generationRates.omegaMuhammad.perSecond) * this.state.prestigeMultiplier * muhammadCombo * ascendedBoost;
  }

  private setupEventListeners() {
    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    document.getElementById('buy-pakistani')!.addEventListener('click', () => this.buyPakistani());
    document.getElementById('buy-homeless')!.addEventListener('click', () => this.buyHomeless());
    document.getElementById('buy-sebastian')!.addEventListener('click', () => this.buySebastian());
    document.getElementById('buy-zaid')!.addEventListener('click', () => this.buyZaid());
    document.getElementById('buy-elon')!.addEventListener('click', () => this.buyElon());
    document.getElementById('buy-muhammad')!.addEventListener('click', () => this.buyMuhammad());
    document.getElementById('buy-super-muhammad')!.addEventListener('click', () => this.buySuperMuhammad());
    document.getElementById('buy-ultra-muhammad')!.addEventListener('click', () => this.buyUltraMuhammad());
    document.getElementById('buy-omega-muhammad')!.addEventListener('click', () => this.buyOmegaMuhammad());
    document.getElementById('buy-ascended-muhammad')!.addEventListener('click', () => this.buyAscendedMuhammad());
    document.getElementById('prestige-btn')!.addEventListener('click', () => this.handlePrestige());
    document.getElementById('buy-particles')!.addEventListener('click', () => this.buyCanvasUpgrade('particles'));
    document.getElementById('buy-animations')!.addEventListener('click', () => this.buyCanvasUpgrade('animations'));
    document.getElementById('buy-glow')!.addEventListener('click', () => this.buyCanvasUpgrade('glow'));
  }

  private handleClick(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.state.money += 1;
    this.state.totalEarned += 1;
    const newLevel = checkLevelProgression(this.state, this.state.money);
    if (newLevel > this.state.currentLevel) {
      this.state.currentLevel = newLevel;
      showLevelUpNotification(this.lastLevel, this.state.currentLevel);
      this.lastLevel = this.state.currentLevel;
    }
    const enhancedParticles = this.state.unlockedCanvasUpgrades.includes('particles');
    if (this.particles.length < 50) { // Cap particle count for performance
      this.particles.push(new ClickParticle(x, y, enhancedParticles));
    }
    updateUI(this.state.money, {
      pakistani: this.state.pakistaniCount,
      homeless: this.state.homelessCount,
      sebastian: this.state.sebastianCount,
      zaid: this.state.zaidCount,
      elon: this.state.elonCount,
      muhammad: this.state.muhammadCount,
      superMuhammad: this.state.superMuhammadCount,
      ultraMuhammad: this.state.ultraMuhammadCount,
      omegaMuhammad: this.state.omegaMuhammadCount,
      ascendedMuhammad: this.state.ascendedMuhammadCount
    }, {
      pakistani: this.state.pakistaniCost,
      homeless: this.state.homelessCost,
      sebastian: this.state.sebastianCost,
      zaid: this.state.zaidCost,
      elon: this.state.elonCost,
      muhammad: this.state.muhammadCost,
      superMuhammad: this.state.superMuhammadCost,
      ultraMuhammad: this.state.ultraMuhammadCost,
      omegaMuhammad: this.state.omegaMuhammadCost,
      ascendedMuhammad: this.state.ascendedMuhammadCost
    }, this.state.currentLevel, this.incomePerSec, this.state);
    saveGame(this.state);
  }

  private async handlePrestige() {
    if (this.state.totalEarned >= Math.floor(500000 * (1 + this.state.prestige * 0.5))) {
      this.state = await prestigeReset(this.state);
      showPrestigeNotification(this.state.prestigeMultiplier);
      this.entities = [];
      this.spawnEntities();
      this.lastLevel = this.state.currentLevel;
      this.updateIncomePerSec();
      updateUI(this.state.money, {
        pakistani: this.state.pakistaniCount,
        homeless: this.state.homelessCount,
        sebastian: this.state.sebastianCount,
        zaid: this.state.zaidCount,
        elon: this.state.elonCount,
        muhammad: this.state.muhammadCount,
        superMuhammad: this.state.superMuhammadCount,
        ultraMuhammad: this.state.ultraMuhammadCount,
        omegaMuhammad: this.state.omegaMuhammadCount,
        ascendedMuhammad: this.state.ascendedMuhammadCount
      }, {
        pakistani: this.state.pakistaniCost,
        homeless: this.state.homelessCost,
        sebastian: this.state.sebastianCost,
        zaid: this.state.zaidCount,
        elon: this.state.elonCost,
        muhammad: this.state.muhammadCost,
        superMuhammad: this.state.superMuhammadCost,
        ultraMuhammad: this.state.ultraMuhammadCost,
        omegaMuhammad: this.state.omegaMuhammadCost,
        ascendedMuhammad: this.state.ascendedMuhammadCost
      }, this.state.currentLevel, this.incomePerSec, this.state);
    }
  }

  private buyCanvasUpgrade(id: string) {
    const upgrade = { 'particles': 1, 'animations': 2, 'glow': 3 }[id];
    if (this.state.prestigeTokens >= (upgrade || 0) && !this.state.unlockedCanvasUpgrades.includes(id)) {
      this.state.prestigeTokens -= upgrade!;
      this.state.unlockedCanvasUpgrades.push(id);
      updateUI(this.state.money, {
        pakistani: this.state.pakistaniCount,
        homeless: this.state.homelessCount,
        sebastian: this.state.sebastianCount,
        zaid: this.state.zaidCount,
        elon: this.state.elonCount,
        muhammad: this.state.muhammadCount,
        superMuhammad: this.state.superMuhammadCount,
        ultraMuhammad: this.state.ultraMuhammadCount,
        omegaMuhammad: this.state.omegaMuhammadCount,
        ascendedMuhammad: this.state.ascendedMuhammadCount
      }, {
        pakistani: this.state.pakistaniCost,
        homeless: this.state.homelessCost,
        sebastian: this.state.sebastianCost,
        zaid: this.state.zaidCount,
        elon: this.state.elonCost,
        muhammad: this.state.muhammadCost,
        superMuhammad: this.state.superMuhammadCost,
        ultraMuhammad: this.state.ultraMuhammadCost,
        omegaMuhammad: this.state.omegaMuhammadCost,
        ascendedMuhammad: this.state.ascendedMuhammadCost
      }, this.state.currentLevel, this.incomePerSec, this.state);
      saveGame(this.state);
    }
  }

  private buyPakistani() {
    if (this.state.money >= this.state.pakistaniCost) {
      this.state.money -= this.state.pakistaniCost;
      this.state.pakistaniCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnPakistani();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buyHomeless() {
    if (this.state.money >= this.state.homelessCost) {
      this.state.money -= this.state.homelessCost;
      this.state.homelessCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnHomeless();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buySebastian() {
    if (this.state.money >= this.state.sebastianCost) {
      this.state.money -= this.state.sebastianCost;
      this.state.sebastianCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnSebastian();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buyZaid() {
    if (this.state.money >= this.state.zaidCost) {
      this.state.money -= this.state.zaidCost;
      this.state.zaidCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnZaid();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buyElon() {
    if (this.state.money >= this.state.elonCost) {
      this.state.money -= this.state.elonCost;
      this.state.elonCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnElon();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buyMuhammad() {
    if (this.state.money >= this.state.muhammadCost) {
      this.state.money -= this.state.muhammadCost;
      this.state.muhammadCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnMuhammad();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buySuperMuhammad() {
    if (this.state.money >= this.state.superMuhammadCost && this.state.prestige >= 1) {
      this.state.money -= this.state.superMuhammadCost;
      this.state.superMuhammadCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnSuperMuhammad();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buyUltraMuhammad() {
    if (this.state.money >= this.state.ultraMuhammadCost && this.state.prestige >= 2) {
      this.state.money -= this.state.ultraMuhammadCost;
      this.state.ultraMuhammadCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnUltraMuhammad();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buyOmegaMuhammad() {
    if (this.state.money >= this.state.omegaMuhammadCost && this.state.prestige >= 3) {
      this.state.money -= this.state.omegaMuhammadCost;
      this.state.omegaMuhammadCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnOmegaMuhammad();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private buyAscendedMuhammad() {
    if (this.state.money >= this.state.ascendedMuhammadCost && this.state.prestige >= 4) {
      this.state.money -= this.state.ascendedMuhammadCost;
      this.state.ascendedMuhammadCount++;
      updateCosts(this.state);
      this.updateIncomePerSec();
      this.spawnAscendedMuhammad();
      saveGame(this.state);
      this.updateUI();
    }
  }

  private updateUI() {
    updateUI(this.state.money, {
      pakistani: this.state.pakistaniCount,
      homeless: this.state.homelessCount,
      sebastian: this.state.sebastianCount,
      zaid: this.state.zaidCount,
      elon: this.state.elonCount,
      muhammad: this.state.muhammadCount,
      superMuhammad: this.state.superMuhammadCount,
      ultraMuhammad: this.state.ultraMuhammadCount,
      omegaMuhammad: this.state.omegaMuhammadCount,
      ascendedMuhammad: this.state.ascendedMuhammadCount
    }, {
      pakistani: this.state.pakistaniCost,
      homeless: this.state.homelessCost,
      sebastian: this.state.sebastianCost,
      zaid: this.state.zaidCost,
      elon: this.state.elonCost,
      muhammad: this.state.muhammadCost,
      superMuhammad: this.state.superMuhammadCost,
      ultraMuhammad: this.state.ultraMuhammadCost,
      omegaMuhammad: this.state.omegaMuhammadCost,
      ascendedMuhammad: this.state.ascendedMuhammadCost
    }, this.state.currentLevel, this.incomePerSec, this.state);
  }

  private spawnEntities() {
    for (let i = 0; i < this.state.pakistaniCount; i++) this.spawnPakistani();
    for (let i = 0; i < this.state.homelessCount; i++) this.spawnHomeless();
    for (let i = 0; i < this.state.sebastianCount; i++) this.spawnSebastian();
    for (let i = 0; i < this.state.zaidCount; i++) this.spawnZaid();
    for (let i = 0; i < this.state.elonCount; i++) this.spawnElon();
    for (let i = 0; i < this.state.muhammadCount; i++) this.spawnMuhammad();
    for (let i = 0; i < this.state.superMuhammadCount; i++) this.spawnSuperMuhammad();
    for (let i = 0; i < this.state.ultraMuhammadCount; i++) this.spawnUltraMuhammad();
    for (let i = 0; i < this.state.omegaMuhammadCount; i++) this.spawnOmegaMuhammad();
    for (let i = 0; i < this.state.ascendedMuhammadCount; i++) this.spawnAscendedMuhammad();
  }

  private spawnPakistani() {
    const x = Math.random() * (this.canvas.width - 15);
    const y = Math.random() * (this.canvas.height - 15);
    this.entities.push(new PakistaniDeveloper(x, y));
  }

  private spawnHomeless() {
    const x = Math.random() * (this.canvas.width - 20);
    const y = Math.random() * (this.canvas.height - 30);
    this.entities.push(new HomelessMan(x, y));
  }

  private spawnSebastian() {
    const x = Math.random() * (this.canvas.width - 20);
    const y = Math.random() * (this.canvas.height - 20);
    this.entities.push(new Sebastian(x, y));
  }

  private spawnZaid() {
    const x = Math.random() * (this.canvas.width - 20);
    const y = Math.random() * (this.canvas.height - 20);
    this.entities.push(new Zaid(x, y));
  }

  private spawnElon() {
    const x = Math.random() * (this.canvas.width - 25);
    const y = Math.random() * (this.canvas.height - 35);
    this.entities.push(new ElonMusk(x, y));
  }

  private spawnMuhammad() {
    const x = Math.random() * (this.canvas.width - 20);
    const y = Math.random() * (this.canvas.height - 20);
    this.entities.push(new Muhammad(x, y));
  }

  private spawnSuperMuhammad() {
    const x = Math.random() * (this.canvas.width - 25);
    const y = Math.random() * (this.canvas.height - 25);
    this.entities.push(new SuperMuhammad(x, y));
  }

  private spawnUltraMuhammad() {
    const x = Math.random() * (this.canvas.width - 30);
    const y = Math.random() * (this.canvas.height - 30);
    this.entities.push(new UltraMuhammad(x, y));
  }

  private spawnOmegaMuhammad() {
    const x = Math.random() * (this.canvas.width - 30);
    const y = Math.random() * (this.canvas.height - 30);
    this.entities.push(new OmegaMuhammad(x, y));
  }

  private spawnAscendedMuhammad() {
    const x = Math.random() * (this.canvas.width - 35);
    const y = Math.random() * (this.canvas.height - 35);
    this.entities.push(new AscendedMuhammad(x, y));
  }

  private generateIncome() {
    const income = this.incomePerSec;
    this.state.money += income;
    this.state.totalEarned += income;
    const newLevel = checkLevelProgression(this.state, this.state.money);
    if (newLevel > this.state.currentLevel) {
      this.state.currentLevel = newLevel;
      showLevelUpNotification(this.lastLevel, this.state.currentLevel);
      this.lastLevel = this.state.currentLevel;
    }
    this.updateUI();
    saveGame(this.state);
  }

  private gameLoop() {
    this.ticks++;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.entities.forEach(entity => entity.animate(this.ctx, this.ticks));
    this.particles = this.particles.filter(p => p.life > 0).slice(0, 50); // Cap and filter particles
    this.particles.forEach(particle => {
      if (particle.life > 0) {
        particle.update();
        particle.draw(this.ctx);
      }
    });
    if (this.entities.length > 1000) { // Performance cap: remove entities if too many
      this.entities = this.entities.slice(-1000);
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
