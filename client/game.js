const currentPlayerId = "player1";
const screen = document.getElementById("screen");
const context = screen.getContext("2d");

const renderPlayer = (context, { x, y }) => {
  const color = "gray";

  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
};

const renderFruit = (context, { x, y }) => {
  const color = "red";

  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
};

const render = (context, state) => {
  context.clearRect(0, 0, 500, 500);

  for (const playerId in state.players) {
    const player = state.players[playerId];
    renderPlayer(context, player);
  }

  for (const fruitId in state.fruits) {
    const fruit = state.fruits[fruitId];
    renderFruit(context, fruit);
  }

  requestAnimationFrame(() => render(context, state));
};

const createGame = () => {
  const state = {
    players: {},
    fruits: {}
  };

  const addPlayer = ({ playerId, x, y }) => {
    state.players[playerId] = { x, y };
  };

  const removePlayer = ({ playerId }) => {
    delete state.players[playerId];
  };

  const addFruit = ({ fruitId, x, y }) => {
    state.fruits[fruitId] = { x, y };
  };

  const removeFruit = ({ fruitId }) => {
    delete state.fruits[fruitId];
  };

  const checkForFruitCollision = playerId => {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];

      if (fruit.x === player.x && fruit.y === player.y) {
        removeFruit({ fruitId });
      }
    }
  };

  const movePlayer = ({ playerId, keyPressed }) => {
    const player = state.players[playerId];

    const moves = {
      ArrowUp: () => {
        if (player.y - 1 >= 0) {
          player.y -= 1;
        }
      },
      ArrowDown: () => {
        if (player.y + 1 < screen.height) {
          player.y += 1;
        }
      },
      ArrowLeft: () => {
        if (player.x - 1 >= 0) {
          player.x -= 1;
        }
      },
      ArrowRight: () => {
        if (player.x + 1 < screen.width) {
          player.x += 1;
        }
      }
    };

    const moveFunction = moves[keyPressed];

    if (player && moveFunction) {
      moveFunction();
      checkForFruitCollision(playerId);
    }
  };

  return {
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    state
  };
};

const createKeyboardListener = () => {
  const state = {
    observers: []
  };

  const subscribe = observerFunction => {
    state.observers.push(observerFunction);
  };

  const notifyAll = command => {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  };

  const handleKeyDown = event =>
    notifyAll({ playerId: "player1", keyPressed: event.key });

  document.addEventListener("keydown", handleKeyDown);

  return {
    subscribe
  };
};

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

render(context, game.state);
