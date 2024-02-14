const crypto = require("crypto");

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

module.exports = Game;
