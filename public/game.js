const createGame = () => {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  };

  const observers = [];

  const start = () => {
    const frequencyInMS = 2000;
    return setInterval(addFruit, frequencyInMS);
  };

  const subscribe = observerFunction => {
    observers.push(observerFunction);
  };

  const notifyAll = (command) => {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  };

  const setState = newState => {
    Object.assign(state, newState);
  };

  const addPlayer = ({
    playerId,
    x = Math.floor(Math.random() * state.screen.width),
    y = Math.floor(Math.random() * state.screen.height)
  }) => {
    state.players[playerId] = { x, y };

    notifyAll({
      type: 'add-player',
      playerId,
      x,
      y
    });
  };

  const removePlayer = ({ playerId }) => {
    delete state.players[playerId];
    notifyAll({
      type: 'remove-player',
      playerId,
    });
  };

  const addFruit = (command) => {
    const fruitId = command
      ? command.fruitId
      : Math.floor(Math.random() * 10000000);
    const x = command
      ? command.x
      : Math.floor(Math.random() * state.screen.width);
    const y = command
      ? command.y
      : Math.floor(Math.random() * state.screen.height);


    if (Object.keys(state.players)) {
      state.fruits[fruitId] = { x, y };

      notifyAll({
        type: 'add-fruit',
        fruitId,
        x,
        y
      });
    }
  };

  const removeFruit = ({ fruitId }) => {
    delete state.fruits[fruitId];
    notifyAll({
      type: 'remove-fruit',
      fruitId,
    });
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
    notifyAll({
      type: 'move-player',
      playerId,
      keyPressed,
    });
    const player = state.players[playerId];

    const moves = {
      ArrowUp: () => {
        if (player.y - 1 >= 0) {
          player.y -= 1;
        }
      },
      ArrowDown: () => {
        if (player.y + 1 < state.screen.height) {
          player.y += 1;
        }
      },
      ArrowLeft: () => {
        if (player.x - 1 >= 0) {
          player.x -= 1;
        }
      },
      ArrowRight: () => {
        if (player.x + 1 < state.screen.width) {
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
    setState,
    state,
    subscribe,
    start,
  };
};

export default createGame;
