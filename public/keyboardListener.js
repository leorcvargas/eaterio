const createKeyboardListener = document => {
  const state = {
    observers: [],
    playerId: null,
  };

  const registerPlayerId = playerId => {
    state.playerId = playerId;
  }

  const subscribe = observerFunction => {
    state.observers.push(observerFunction);
  };

  const notifyAll = command => {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  };

  const handleKeyDown = event => {
    const command = {
      type: 'move-player',
      playerId: state.playerId,
      keyPressed: event.key
    }
    notifyAll(command);
  }

  document.addEventListener("keydown", handleKeyDown);

  return {
    registerPlayerId,
    subscribe
  };
};

export default createKeyboardListener;
