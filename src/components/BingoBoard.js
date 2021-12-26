import { useEffect, useState } from "react";

const BingoBoard = ({ board, index, currNum, tick, gameWon, setGameWon }) => {
  const [tickBox, setTickBox] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const checkWin = () => {
    for (let i = 0; i < 5; i++) {
      let flag = true;
      for (let j = 0; j < 5; j++) {
        if (tickBox[i][j] !== 1) {
          flag = false;
        }
      }
      if (flag) {
        return true;
      }
    }
    for (let i = 0; i < 5; i++) {
      let flag = true;
      for (let j = 0; j < 5; j++) {
        if (tickBox[j][i] !== 1) {
          flag = false;
        }
      }
      if (flag) {
        return true;
      }
    }
    let flag = true;
    for (let j = 0; j < 5; j++) {
      if (tickBox[j][j] !== 1) {
        flag = false;
      }
    }
    if (flag) return true;
    flag = true;
    for (let j = 0; j < 5; j++) {
      if (tickBox[j][4 - j] !== 1) {
        flag = false;
      } else {
        if (index == 0) {
          console.log(board[j][4 - j], index, flag);
        }
      }
    }
    if (flag) {
      return true;
    }
    return false;
  };
  const handleClick = (i, j) => {
    if (board[i][j] === currNum) {
      setTickBox(
        tickBox.map((valX, x) => {
          return valX.map((valY, y) => {
            if (x === i) {
              if (y === j) {
                valY = 1;
                tick(index);
              }
            }
            return valY;
          });
        })
      );
    }
  };

  useEffect(() => {
    let didWin = checkWin();
    // console.log(didWin, index);
    if (didWin) {
      setGameWon(index);
    }
  });

  return (
    <div className="board-container">
      <h3>Board Number {index + 1}</h3>
      <div className="board-grid">
        {board.map((row, i) => {
          return (
            <div className="board-row" key={`row ${i}`}>
              {row.map((cell, j) => {
                return (
                  <button
                    className={`board-cell ${
                      tickBox[i][j] ? "cell-marked" : ""
                    } ${board[i][j] === currNum ? "cell-active" : ""}`}
                    key={j + i * row.length}
                    onClick={() => handleClick(i, j)}
                    disabled={!(board[i][j] === currNum) || gameWon !== null}
                  >
                    {tickBox[i][j] ? <del>{cell}</del> : cell}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BingoBoard;
