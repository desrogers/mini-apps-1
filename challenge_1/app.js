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
    const markCell = () => {
      const target = document.getElementById(event.target.id);

      // add mark only if target cell/div empty
      if (!target.hasChildNodes()) {
        const node = document.createElement('P');
        const textNode = document.createTextNode('x')
        node.appendChild(textNode);
        target.appendChild(node);
      }
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
      return confirm(message);
    };

    // listen for click event on .cell elements
    document.querySelectorAll('.cell').forEach((cell, i) => {
      cell.addEventListener('click', markCell);
    });

    return {
      reset, markCell, alert
    }
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

