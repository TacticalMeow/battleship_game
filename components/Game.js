import Board from "./Board";
import React, { useState } from "react";
import { AVAILABLE_SHIPS } from "./Ships";
import Button from "@mui/material/Button";

function Game(props) {
  // const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
  // const [placedShips, setPlacedShips] = useState([]);
  const [gameState, setGameState] = useState("placement");
  const [shipSelected, setShipSelected] = useState({
    name: "",
    value: "",
    length: "",
    placed: null,
  });
  const [rotation,setRotation] = useState("right");
  const [availableShips, setAvailableShips] = useState(AVAILABLE_SHIPS);
  
  const boardSize = +props.boardSize + 1;
  
  let startingBoard = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      startingBoard.push("0");
    }
  }
  //board maintains the state of all squares
  const [board, setBoard] = useState(
    startingBoard);
  
  
  const handleClick = (boardType, i, j) => {
    if (boardType == "userBoard") {
      if (board[i*boardSize+j] == "0") {
        if (shipSelected.placed == null) {
          if (j + shipSelected.length <= boardSize) {
            let m = j;
            let newBoard = board.slice();
            for (let k = 0; k < shipSelected.length; k++) {
              newBoard[(i*boardSize+m+k)] = "x";
            }
            console.log(rotation);
            setBoard(newBoard);
          }
          console.log(`square ${[i, j]} was clicked`);
        }
      }
    } else {
      console.log(boardType);
      console.log(`square ${[i, j]} was clicked`);
    }
  };
  const handleClickShip = (event) => {
    for (let i of availableShips) {
      if (i.name == event.target.name) {
        setShipSelected({
          name: i.name,
          value: i.value,
          length: i.length,
          placed: i.placed,
        });
      }
    }
    event.preventDefault();
  };

  return (
    <>
    <button

onClick={()=> {
if(rotation=="right")
{
 setRotation("down");
}
else
{
  setRotation("right");
}
}}
name={"rotation"}
>
  rotate here
</button>
      <Board
        onClick={(boardType, i, j) =>
          handleClick(boardType, i, j)
        }
        boardSize={boardSize}
        value="0"
        boardState={board}
      />
      {gameState == "placement" &&
        availableShips.map((ship) => {
          return (
            <div className="shipsAvailable" key={ship.name}>
              <Button
                key={ship.name}
                className="place-center"
                variant="outlined"
                color="success"
                onClick={handleClickShip}
                name={ship.name}
              >
                {ship.name} length: {ship.length}
              </Button>
            </div>
          );
        })}
    </>
  );
}
export default Game;