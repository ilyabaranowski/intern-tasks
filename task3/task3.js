const Game = require('./Game');
const UserInterface = require('./UserInterface');

const gameStart = new Game(process.argv.slice(2));
new UserInterface(gameStart).getUserMove();
