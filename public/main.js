import createKeyboardListener from "./keyboardListener.js";
import createGame from "./game.js";
import renderScreen from "./render.js";

const game = createGame();

const keyboardListener = createKeyboardListener(document);
keyboardListener.subscribe(game.movePlayer);

const screen = document.getElementById("screen");
renderScreen(screen, game, requestAnimationFrame);

const socket = io();

socket.on('connect', () => {
  const playerId = socket.id;
  console.log(`Player connected on client with id: ${playerId}`);
});

socket.on('setup', state => {
  console.log('Receiving game state');
  console.log(state);
  game.state = state;
});
