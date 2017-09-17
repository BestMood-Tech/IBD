let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

setInterval(() => {
  io.emit('data-for-chart-declines', {time: Date.now(), value: getData('declines')});
  io.emit('data-for-chart-contacts', {time: Date.now(), value: getData('contacts')});
  io.emit('data-for-chart-responses', {time: Date.now(), value: getData('responses')});
  io.emit('data-for-chart-accepts', {time: Date.now(), value: getData('accepts')});
}, 1000);

http.listen(4000, () => {
  console.log('started on port 4000');
});

function getData(type) {
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
