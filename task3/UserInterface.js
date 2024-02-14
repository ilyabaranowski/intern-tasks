const readline = require("readline");
const Table = require('./Table');
const UserMove = require('./UserMove')

class UserInterface {
  constructor(game) {
    this.game = game;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("HMAC:", this.game.hmacResult);
    console.log("Available moves:");
    this.game.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - exit");
    console.log("? - help");
  }

  getUserMove() {
    this.rl.question("Insert your move:", (userInput) => {
      switch (userInput) {
        case "?":
          new Table(this.game).print();
          this.getUserMove();
          break;
        case "0":
          process.exit(1);
          break;
        default:
          const moveIndex = parseInt(userInput, 10);
          if (
            isNaN(moveIndex) ||
            moveIndex < 0 ||
            moveIndex >= this.game.moves.length + 1
          ) {
            console.error("Invalid move. Please, insert a valid move.");
            this.getUserMove();
          } else {
            this.rl.close();
            new UserMove(this.game, moveIndex).handle();
          }
          break;
      }
    });
  }
}

module.exports = UserInterface;
