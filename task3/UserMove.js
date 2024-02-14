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

module.exports = UserMove;
