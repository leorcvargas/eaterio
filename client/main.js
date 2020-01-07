import createKeyboardListener from "./keyboardListener.js";
import createGame from "./game.js";
import renderScreen from "./render.js";

const game = createGame();

const keyboardListener = createKeyboardListener(document);
keyboardListener.subscribe(game.movePlayer);

const screen = document.getElementById("screen");
renderScreen(screen, game, requestAnimationFrame);

game.addFruit({ fruitId: "fruit1", x: 1, y: 9 });
game.addFruit({ fruitId: "fruit2", x: 1, y: 9 });
game.addPlayer({ playerId: "player1", x: 3, y: 0 });
