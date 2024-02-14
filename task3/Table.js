const AsciiTable = require("ascii-table");

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

module.exports = Table;
