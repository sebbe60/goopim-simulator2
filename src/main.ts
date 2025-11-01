
import { Game } from "./game";

function main(): void {
  const game = new Game();
  game.init();
}

document.addEventListener('DOMContentLoaded', main);
