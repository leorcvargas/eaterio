const currentPlayerId = "player1";
const screen = document.getElementById("screen");
const context = screen.getContext("2d");

const addPlayer = (context, { x, y }) => {
  const color = "green";

  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
};

const addFruit = (context, { x, y }) => {
  const color = "red";

  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
};

const render = (context, state) => {
  context.clearRect(0, 0, 500, 500);

  for (const playerId in state.players) {
    const player = state.players[playerId];
    addPlayer(context, player);
  }

  for (const fruitId in state.fruits) {
    const fruit = state.fruits[fruitId];
    addFruit(context, fruit);
  }

  requestAnimationFrame(() => render(context, state));
};

const createGame = () => {
  const state = {
    players: {
      player1: { x: 1, y: 1 },
      player2: { x: 9, y: 2 },
      player3: { x: 5, y: 8 }
    },
    fruits: {
      fruit1: { x: 3, y: 9 }
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
    if (moveFunction) {
      moveFunction();
    }
  };

  return {
    state,
    movePlayer
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
