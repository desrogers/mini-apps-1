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

  const Board = () => {
    let matrix = [
      [-1,-1,-1],[-1,-1,-1],[-1,-1,-1]
    ];

    const mark = (coords, mark) => {
      const nums = { 'x': 1, 'o': 0 };
      const row = parseInt(coords[3]) - 1;
      const col = parseInt(coords[8]) - 1;
      if (matrix[row][col] < 0) {
        matrix[row][col] = nums[mark];
      }
    };

    const traverse = (array, col) => {
      let hasWin = false;
      array.forEach((row, i) => {
        if (col) {
          row = [matrix[0][i], matrix[1][i], matrix[2][i]]
        }
        const el = row[0];
        if (row.every((item) => item != -1 && item === el)) {
          hasWin = true;
          return;
        };
      });
      return hasWin;
    };

    const hasRowWin = () => traverse(matrix);
    const hasColWin = () => traverse(matrix[0], true);

    const hasDiagWin = () => {
      const diags = [
        [matrix[0][0], matrix[1][1], matrix[2][2]],
        [matrix[2][0], matrix[1][1], matrix[0][2]]
      ];

      return traverse(diags);
    };

    // check horizontal, vertical, diagonal
    const detectWin = () => {
      return hasRowWin() || hasColWin() || hasDiagWin();
    }

    const clearBoard = () => { matrix = [ [-1,-1,-1],[-1,-1,-1],[-1,-1,-1] ]; };

    return {
      mark, detectWin, clearBoard
    };
  }

  const Model = () => {
    const x = Player('x');
    const o = Player('o');
    const board = Board();

    x.isTurn = true;

    const hasTurn = () => {
      return x.isTurn ? x : o;
    };

    const swap = () => {
        x.swapTurn();
        o.swapTurn();
    };

    return {
      players: { hasTurn, swap },
      board
    }
  }

  const Controller = () => {
    const view = View();
    const { players, board } = Model();
    let turnsTotal = 1;

    const reset = () => {
      turnsTotal = 1;
      board.clearBoard();
    };

    const handleTurn = () => {
      if (turnsTotal >= 5 && board.detectWin()) {
        const currentPlayer = players.hasTurn();
        view.alert(currentPlayer.mark);
        reset();
        return;
      }

      if (turnsTotal > 8) {
        view.alert();
        reset();
        return;
      }

      turnsTotal += 1;
      players.swap();
    };

    // display Xs and Os
    const handleClick = () => {
      const id = event.target.id;
      const target = document.getElementById(id);
      const currentPlayer = players.hasTurn();

      // add mark only if target cell/div empty
      if (!target.hasChildNodes()) {
        view.mark(target, currentPlayer.mark);
        board.mark(id, currentPlayer.mark);
        handleTurn();
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
      const textNode = document.createTextNode(mark.toUpperCase());
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

    return {
      play
    }
  }

  const newGame = Game();
  newGame.play();
})();

