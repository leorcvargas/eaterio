import createKeyboardListener from "./keyboardListener.js";
import createGame from "./game.js";
import renderScreen from "./render.js";

const game = createGame();

const keyboardListener = createKeyboardListener(document);

const socket = io();

socket.on('connect', () => {
  const playerId = socket.id;
  console.log(`Player connected on client with id: ${playerId}`);

  const screen = document.getElementById("screen");
  renderScreen(screen, game, requestAnimationFrame, playerId);
});

socket.on('setup', state => {
  const playerId = socket.id;
  game.setState(state);

  keyboardListener.registerPlayerId(playerId);
  keyboardListener.subscribe(game.movePlayer);
  keyboardListener.subscribe(command => {
    socket.emit(command.type, command);
  })
});

socket.on('add-player', command => {
  console.log(`Receiving command ${command.type}`);
  game.addPlayer(command);
});

socket.on('remove-player', command => {
  console.log(`Receiving command ${command.type}`);
  game.removePlayer(command);
});

socket.on('move-player', command => {
  console.log(`Receiving command ${command.type}`);
  const playerId = socket.id;

  if (playerId !== command.playerId) {
    game.movePlayer(command);
  }
});

socket.on('add-fruit', command => {
  console.log('Receiving command add-fruit');
  game.addFruit(command);
});

socket.on('remove-fruit', command => {
  console.log('Receiving command remove-fruit');
  game.addFruit(command);
});
