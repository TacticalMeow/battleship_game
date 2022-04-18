import React, { useEffect } from "react";

export default function Square(props) {
  let sizeInRow = 100 / props.boardSize;
  let iPoint = props.position[0];
  let jPoint = props.position[1];
  const handleClick = () => {
    props.onClick();
  };

  if (jPoint == 0 && iPoint != 0) {
    return (
      <button
        className="flex-item place-center"
        style={{ flex: `1 0 ${sizeInRow}%` }}
      >
        {iPoint}
      </button>
    );
  } else if (jPoint != 0 && iPoint == 0) {
    return (
      <button
        className="flex-item place-center"
        style={{ flex: `1 0 ${sizeInRow}%` }}
      >
        {(jPoint + 9).toString(36).toUpperCase()}
      </button>
    );
  } else {
    return (
      <button
        className="flex-item"
        style={{ flex: `1 0 ${sizeInRow}%` }}
        value={props.board[iPoint*props.boardSize+jPoint]}
        onClick={handleClick}
      >
        {props.board[iPoint*props.boardSize+jPoint]}
      </button>
    );
  }
}