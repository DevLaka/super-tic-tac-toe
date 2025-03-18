import "./App.scss";
import { useState } from "react";
import PlayerDetails from "./components/PlayerDetails/PlayerDetails";
import { PlayerType, type CellType } from "./constants";
import CircleDownIcon from "./assets/circle-down.svg";
import Cell from "./components/cell/Cell";

const ROWS = 6;
const COLS = 7;

// Utility function to create an empty board
const createEmptyBoard = (): CellType[][] =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

function App() {
  const [board, setBoard] = useState<CellType[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(PlayerType.R);
  const [winner, setWinner] = useState<PlayerType | null>(null);

  // When a column button is clicked, drop the token into the next available slot
  const handleColumnClick = (col: number) => {
    if (winner) return; // Stop if the game is already won

    // Make a copy of the board so we can update it
    const newBoard = board.map((row) => row.slice());
    // Start from the bottom of the column and look for an empty cell
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        // Check if the current move wins the game
        if (checkForWinner(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          // Switch player turns
          setCurrentPlayer(
            currentPlayer === PlayerType.R ? PlayerType.Y : PlayerType.R
          );
        }
        setBoard(newBoard);
        return;
      }
    }
  };

  // Function to check for a winning line of four tokens starting from the last placed token
  const checkForWinner = (
    board: CellType[][],
    row: number,
    col: number,
    player: PlayerType
  ): boolean => {
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal down-right
      { dr: 1, dc: -1 }, // Diagonal down-left
    ];

    for (const { dr, dc } of directions) {
      let count = 1;

      // Check in the positive direction (up to 3 steps)
      for (let i = 1; i < 4; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player)
          break;
        count++;
      }

      // Check in the negative direction (up to 3 steps)
      for (let i = 1; i < 4; i++) {
        const r = row - i * dr;
        const c = col - i * dc;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player)
          break;
        count++;
      }

      if (count >= 4) return true;
    }

    return false;
  };

  return (
    <div className="app-container">
      <h1>
        {"Super Tic Tac Toe".split("").map((char, index) => (
          <span key={index} className="colored-letter">
            {char}
          </span>
        ))}
      </h1>
      <div className="player-details-section">
        <PlayerDetails
          player={PlayerType.R}
          currentPlayer={currentPlayer}
          winner={winner}
        />
        <PlayerDetails
          player={PlayerType.Y}
          currentPlayer={currentPlayer}
          winner={winner}
        />
      </div>
      {/* Render column buttons */}
      <div className={`column-buttons-section ${winner ? "dim-content" : ""}`}>
        {Array.from({ length: COLS }).map((_, col) => (
          <button
            key={col}
            onClick={() => handleColumnClick(col)}
            className="column-button"
          >
            <img src={CircleDownIcon} alt="drop-token" />
          </button>
        ))}
      </div>
      {/* Render the game board */}
      <div className={`board-container ${winner ? "dim-content" : ""}`}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <Cell cell={cell} rowIndex={rowIndex} colIndex={colIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
