const crypto = require("crypto");
const readline = require("readline");
const AsciiTable = require("ascii-table");

class Game {
  constructor(moves) {
    if (moves.length < 2 || moves.length % 2 === 0) {
      console.error('Invalid number of arguments. Number should be odd');
      process.exit(1);
    }

    if (this.hasDuplicates(moves)) {
      console.error('Invalid input. Duplicate arguments found');
      process.exit(1);
    }

    this.moves = moves;
    this.key = this.getKey();
    this.computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
    this.hmacResult = this.getHmac(this.key, this.computerMove);
  }

  hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }

  getKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  getHmac(key, move) {
    return crypto.createHmac("sha3-256", key).update(move).digest("hex");
  }

  getResult(userMove, computerMove) {
    const moveIndexDiff = Math.abs(
      this.moves.indexOf(userMove) - this.moves.indexOf(computerMove),
    );
    const halfLength = Math.floor(this.moves.length / 2);

    return moveIndexDiff === 0
      ? "Draw"
      : moveIndexDiff <= halfLength
        ? "Win"
        : "Lose";
  }
}

class Table {
  constructor(game) {
    this.game = game;
  }

  print() {
    const table = new AsciiTable("Game table");
    table.setHeading("v PC|User >", ...this.game.moves);

    for (const userMove of this.game.moves) {
      const row = [
        userMove,
        ...this.game.moves.map((computerMove) =>
          this.game.getResult(userMove, computerMove),
        ),
      ];
      table.addRow(...row);
    }
    console.log(table.toString());
  }
}

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

class UserMove {
  constructor(game, userMoveIndex) {
    this.game = game;
    this.userMove = this.game.moves[userMoveIndex - 1];
  }

  handle() {
    console.log("Your move", this.userMove);
    console.log("Computer move:", this.game.computerMove);

    const result = this.game.getResult(this.userMove, this.game.computerMove);

    console.log(
      result === "Draw"
        ? `It's a draw`
        : result === "Win"
          ? "You won!"
          : "Computer won!",
    );

    console.log("key", this.game.key);
  }
}

const game = new Game(process.argv.slice(2));
new UserInterface(game).getUserMove();
