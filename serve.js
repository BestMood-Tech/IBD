'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(methodOverride());
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(express.static('dist'));

app.get('*', (request, response) => response.sendFile(__dirname + '/dist/index.html'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});
setInterval(() => {
  io.emit('data-for-chart-declines', { time: Date.now(), value: getData('declines') });
  io.emit('data-for-chart-contacts', { time: Date.now(), value: getData('contacts') });
  io.emit('data-for-chart-responses', { time: Date.now(), value: getData('responses') });
  io.emit('data-for-chart-accepts', { time: Date.now(), value: getData('accepts') });
}, 1000);

server.listen(3000, 'localhost', () => console.log(`Listening on port 3000`));

function getData (type) {
  let min;
  let max;
  switch (type) {
    case 'declines':
      min = 10;
      max = 50;
      break;
    case 'contacts':
      min = 40;
      max = 70;
      break;
    case 'responses':
      min = 20;
      max = 80;
      break;
    case 'accepts':
      min = 40;
      max = 60;
      break;
    default:
      break;
  }
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
