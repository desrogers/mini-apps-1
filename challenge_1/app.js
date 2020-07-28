(function TicTacToe() {
  const Player = (mark) => {
    const obj = {};
    obj.mark = mark;
    obj.isTurn = false;
    obj.score = 0;
    return obj;
  };

  const Display = () => {
    // TODO: display Xs and Os
    // TODO: display reset option
    // TODO: display alert
  }

  const Game = () => {
    let currentPlayer;
    let turnsTotal = 0;
    const x = Player('x');
    const o = Player('o');
    const view = Display();

    // players keep their scores, unless the entire game/page is refreshed
    const play = () => {
      turnsTotal = 0;
      currentPlayer = x;
    };

    const reset = () => { play(); }

    const switchPlayer = () => {
      turnsTotal += 1;
      currentPlayer === x ? currentPlayer = o : currentPlayer = x;
    }

    // TODO:
    const detectWin = () => {}

    return {
      play
    }
  }

  const newGame = Game();
  newGame.play();
})();

