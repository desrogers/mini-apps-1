(function TicTacToe() {
  const Player = (mark) => {
    const obj = {};
    obj.mark = mark;
    obj.isTurn = false;
    obj.score = 0;
    obj.swapTurn = () => {
      obj.isTurn = !obj.isTurn
    }
    return obj;
  };

  const Model = () => {
    const x = Player('x');
    const o = Player('o');

    x.isTurn = true;

    const hasTurn = () => {
      return x.isTurn ? x : o;
    };

    const swap = () => {
        x.swapTurn();
        o.swapTurn();
    };

    return {
      users: { hasTurn, swap }
    }
  }

  const Controller = () => {
    const view = View();
    const { users } = Model();
    let turnsTotal = 1;

    const switchPlayer = () => {
      if (turnsTotal > 8) {
        view.alert();
        turnsTotal = 1;
        return;
      }

      turnsTotal += 1;
      users.swap();
    };

    // display Xs and Os
    const handleClick = () => {
      const target = document.getElementById(event.target.id);
      const currentPlayer = users.hasTurn();

      // add mark only if target cell/div empty
      if (!target.hasChildNodes()) {
        view.mark(target, currentPlayer.mark);
        switchPlayer();
      }
    };

    // listen for click event on .cell elements
    document.querySelectorAll('.cell').forEach((cell, i) => {
      cell.addEventListener('click', handleClick);
    });

    return;
  }

  const View = () => {
    const mark = (target, mark) => {
      const node = document.createElement('P');
      const textNode = document.createTextNode(mark);
      node.appendChild(textNode);
      target.appendChild(node);
    };

    // clear all cells
    const clear = () => {
      document.querySelectorAll('.cell').forEach((item, i) => {
        item.innerHTML = "";
      });
    };

    // display reset button
    const reset = () => {
      const btnWrapper = document.querySelector('.btn-wrapper');
      if (btnWrapper.hasChildNodes()) return;
      const btn = document.createElement('button');
      btn.innerHTML = 'reset';
      btn.addEventListener('click', clear);
      btnWrapper.appendChild(btn);
    };

    // Display alert with round result and confirmation to continue
    // Falsy input displays a tie.
    const alert = (player) => {
      const result = player ? `${player} wins!` : `It's a tie.`;
      const message = `${result} Best out of Three?`
      if (confirm(message)) {
        clear();
      } else {
        reset();
      }
    };
    return {
      clear, reset, alert, mark
    }
  }

  const Game = () => {

    // players keep their scores, unless the entire game/page is refreshed
    const play = () => {
      Controller();
    };

    // TODO:
    const detectWin = () => {}

    return {
      play
    }
  }

  const newGame = Game();
  newGame.play();
})();

