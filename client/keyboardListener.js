const createKeyboardListener = document => {
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

export default createKeyboardListener;
