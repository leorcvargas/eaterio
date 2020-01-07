const createGame = () => {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
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
    state
  };
};

export default createGame;
