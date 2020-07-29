(function TicTacToe() {
  const Player = (mark) => {
    const obj = {};
    obj.mark = mark;
    obj.isTurn = false;
    obj.score = 0;
    return obj;
  };

  const Display = ({ x, o }) => {
    const view = View();
    let turnsTotal = 1;
    let currentPlayer = x.isTurn ? x : o;

    const switchPlayer = () => {
      if (turnsTotal > 8) {
        view.alert();
        turnsTotal = 1;
        return;
      }

      turnsTotal += 1;
      currentPlayer === x ? currentPlayer = o : currentPlayer = x;
    };

    // display Xs and Os
    const markCell = () => {
      const target = document.getElementById(event.target.id);

      // add mark only if target cell/div empty
      if (!target.hasChildNodes()) {
        const node = document.createElement('P');
        const textNode = document.createTextNode(currentPlayer.mark);
        node.appendChild(textNode);
        target.appendChild(node);
        switchPlayer();
      }
    };

    // listen for click event on .cell elements
    document.querySelectorAll('.cell').forEach((cell, i) => {
      cell.addEventListener('click', markCell);
    });

    return;
  }

  const View = () => {
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
      clear, reset, alert
    }
  }

  const Game = () => {
    const x = Player('x');
    const o = Player('o');

    x.isTurn = true;

    // players keep their scores, unless the entire game/page is refreshed
    const play = () => {
      const view = Display({ x, o });
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

