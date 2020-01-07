import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

const game = createGame();
game.addFruit({ fruitId: 'fruit1', x: 1, y: 9 });
game.addPlayer({ playerId: 'player1', x: 3, y: 0 });
game.addPlayer({ playerId: 'player2', x: 3, y: 0 });
game.addPlayer({ playerId: 'player3', x: 3, y: 0 });
game.movePlayer({ playerId: 'player1', keyPressed: 'ArrowDown' });
console.log(game.state);

io.on('connection', socket => {
  const playerId = socket.id;
  console.log(`> Player connected on server with id: ${playerId}`);
  
  io.emit('setup', game.state);
});


server.listen(3000, () => {
  console.log('> Eater.io server listening on port: 3000');
});
