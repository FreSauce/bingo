import { useEffect, useState } from "react";
import BingoBoard from "./BingoBoard";

const boards = [
  [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ],
  [
    [3, 15, 0, 2, 22],
    [9, 18, 13, 17, 5],
    [19, 8, 7, 25, 23],
    [20, 11, 10, 24, 4],
    [14, 21, 16, 12, 6],
  ],
  [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ],
];

const nums = [
  0, 4, 14, 10, 1, 7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15,
  25, 12, 22, 18, 20, 8, 19, 3, 26, 1,
];

const initTicks = () => {
  let ticks = new Array(boards.length).fill(0);
  for (let i = 0; i < boards.length; i++) {
    let flag = false;
    for (let j = 0; j < 5; j++) {
      if (boards[i][j].includes(nums[0])) {
        flag = true;
      }
    }
    if (!flag) {
      ticks[i] = 1;
    }
  }
  return ticks;
};

const BingoGame = () => {
  const [currNum, setCurrNum] = useState(0);
  const [ticked, setTicked] = useState(initTicks);
  const [gameWon, setGameWon] = useState(null);

  const fixTicks = () => {
    let ticks = new Array(boards.length).fill(0);
    console.log(ticked);
    for (let i = 0; i < boards.length; i++) {
      let flag = false;
      for (let j = 0; j < 5; j++) {
        if (boards[i][j].includes(nums[currNum + 1])) {
          console.log(i, j);
          flag = true;
        }
      }
      if (!flag) {
        ticks[i] = 1;
      }
    }
    console.log(ticks);
    setTicked(ticks);
  };

  // console.log(ticked);
  const tick = (boardIndex) => {
    setTicked(
      ticked.map((el, index) => {
        if (index === boardIndex) {
          el = 1;
        }
        return el;
      })
    );
  };
  useEffect(() => {
    let flag = true;
    for (let i = 0; i < ticked.length; i++) {
      if (ticked[i] !== 1) {
        // console.log(i);
        flag = false;
      }
    }
    if (flag) {
      setCurrNum(currNum + 1);
      // setTicked(new Array(boards.length).fill(0));
      fixTicks();
    }
  }, [ticked]);

  return (
    <>
      {gameWon === null ? (
        <h1>Current Number is {nums[currNum]}</h1>
      ) : (
        <h1>Board number {gameWon + 1} won the game</h1>
      )}
      <div className="game-container">
        {boards.map((board, index) => (
          <BingoBoard
            board={board}
            index={index}
            key={index}
            tick={tick}
            currNum={nums[currNum]}
            gameWon={gameWon}
            setGameWon={setGameWon}
          />
        ))}
      </div>
    </>
  );
};

export default BingoGame;
