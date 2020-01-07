import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();
game.start();

game.subscribe(command => {
  console.log(`Emitting ${command.type}`);
  sockets.emit(command.type, command);
})

sockets.on('connection', socket => {
  const playerId = socket.id;
  console.log(`> Player connected on server with id: ${playerId}`);

  game.addPlayer({ playerId });

  socket.emit('setup', game.state);

  socket.on('disconnect', () => {
    game.removePlayer({ playerId });
    console.log(`> Player disconnected: ${playerId}`);
  });

  socket.on('move-player', command => {
    console.log(`> Moving player: ${playerId}`);
    const sanitizedCommand = {
      ...command,
      type: 'move-player',
      playerId
    };

    game.movePlayer(sanitizedCommand);
  });
});

server.listen(3000, () => {
  console.log('> Eater.io server listening on port: 3000');
});
