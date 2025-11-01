
import { generationRates } from "./definitions";

export class PakistaniDeveloper {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(this.x, this.y, 15, 15);
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.1) * 0.1;
    ctx.save();
    ctx.translate(this.x + 7.5, this.y + 7.5);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(-7.5, -7.5, 15, 15);
    ctx.restore();
  }
}

export class HomelessMan {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(this.x, this.y, 20, 30);
    ctx.fillStyle = "#000";
    ctx.fillRect(this.x + 5, this.y - 5, 10, 5);
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.2) * 0.05;
    ctx.save();
    ctx.translate(this.x + 10, this.y + 15);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(-10, -15, 20, 30);
    ctx.fillStyle = "#000";
    ctx.fillRect(-5, -20, 10, 5);
    ctx.restore();
  }
}

export class Sebastian {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#FF69B4";
    ctx.beginPath();
    ctx.arc(this.x + 10, this.y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.15) * 0.1;
    ctx.save();
    ctx.translate(this.x + 10, this.y + 10);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#FF69B4";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class Zaid {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#FF6347";
    ctx.beginPath();
    ctx.arc(this.x + 10, this.y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.15) * 0.1;
    ctx.save();
    ctx.translate(this.x + 10, this.y + 10);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#FF6347";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class ElonMusk {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(this.x, this.y, 25, 35);
    ctx.fillStyle = "#FF4500";
    ctx.fillRect(this.x - 5, this.y + 10, 5, 15);
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.25) * 0.1;
    ctx.save();
    ctx.translate(this.x + 12.5, this.y + 17.5);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(-12.5, -17.5, 25, 35);
    ctx.fillStyle = "#FF4500";
    ctx.fillRect(-17.5, -7.5, 5, 15);
    ctx.restore();
  }
}

export class Muhammad {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.1) * 0.1;
    ctx.save();
    ctx.translate(this.x + 10, this.y + 10);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(-10, -10, 20, 20);
    ctx.restore();
  }
}

export class SuperMuhammad {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#FFFF00"; // Yellow for super
    ctx.fillRect(this.x, this.y, 25, 25);
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.2) * 0.2; // More pronounced
    ctx.save();
    ctx.translate(this.x + 12.5, this.y + 12.5);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(-12.5, -12.5, 25, 25);
    ctx.restore();
  }
}

export class UltraMuhammad {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#FF1493"; // Deep pink for ultra
    ctx.beginPath();
    ctx.arc(this.x + 15, this.y + 15, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.25) * 0.3;
    ctx.save();
    ctx.translate(this.x + 15, this.y + 15);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#FF1493";
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class OmegaMuhammad {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#DC143C"; // Crimson for omega
    ctx.fillRect(this.x, this.y, 30, 30);
    // Aura effect
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(this.x + 15, this.y + 15, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.3) * 0.4;
    ctx.save();
    ctx.translate(this.x + 15, this.y + 15);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#DC143C";
    ctx.fillRect(-15, -15, 30, 30);
    ctx.globalAlpha = 0.3 + Math.sin(tick * 0.1) * 0.2;
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

export class AscendedMuhammad {
  constructor(public x: number, public y: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#9370DB"; // Purple for ascended
    ctx.fillRect(this.x, this.y, 35, 35);
    // Ascension particles
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x - 2, this.y - 2, 5, 5);
    ctx.fillRect(this.x + 30, this.y - 2, 5, 5);
    ctx.fillRect(this.x - 2, this.y + 30, 5, 5);
    ctx.fillRect(this.x + 30, this.y + 30, 5, 5);
    ctx.globalAlpha = 1;
  }

  animate(ctx: CanvasRenderingContext2D, tick: number) {
    const scale = 1 + Math.sin(tick * 0.4) * 0.5;
    ctx.save();
    ctx.translate(this.x + 17.5, this.y + 17.5);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#9370DB";
    ctx.fillRect(-17.5, -17.5, 35, 35);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(-19.5, -19.5, 5, 5);
    ctx.fillRect(14.5, -19.5, 5, 5);
    ctx.fillRect(-19.5, 14.5, 5, 5);
    ctx.fillRect(14.5, 14.5, 5, 5);
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

export class ClickParticle {
  public life: number;
  public x: number;
  public y: number;
  public dx: number;
  public dy: number;
  public color: string;

  constructor(x: number, y: number, enhanced = false) {
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * 10;
    this.dy = -Math.abs(Math.random()) * 5;
    this.life = 30;
    this.color = enhanced ? `hsl(${Math.random() * 360}, 100%, 50%)` : "#FFD700";
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.5;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.life / 30;
    ctx.fillStyle = this.color;
    ctx.font = "20px Arial";
    ctx.fillText("+$1", this.x, this.y);
    ctx.globalAlpha = 1;
  }
}
