// Import Statements allow us to import the necessary dependancies
import './App.css';
import { useState } from 'react';

// Component for rendering each individual square
// this component receives two props: 
  // 'value'- the current value of the square
  // 'onSquareClick'- the function to handle the click event
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Check if any of the winning combinations exist in the squares array
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner (X or O)
    }
  }
  return null; // Return null if there is no winner
}


// Component for rendering the Tic Tac Toe board
// this component receives three props:
  // 'xIsNext'- a boolean indicating whose turn it is
  // 'squares'- an array representing the current state of the board
  // 'onPlay'- a function to handle a play on the board


function Board({ xIsNext, squares, onPlay }) {
  // Function to handle a click on a square
  function handleClick(i) {
    // Check if there is already a winner or if the square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice(); // Create a copy of the squares array
    // Set the value of the clicked square based on whose turn it is
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares); // Call the onPlay function to update the game state
  }

  const winner = calculateWinner(squares); // Check if there is a winner
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Render the board
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

// Main game component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // State to keep track of game history
  const [currentMove, setCurrentMove] = useState(0); // State to keep track of current move
  const xIsNext = currentMove % 2 === 0; // Determine whose turn it is based on the current move
  const currentSquares = history[currentMove]; // Get the squares for the current move

  // Function to handle a play (updating game state)
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Create a new history array with the new move
    setHistory(nextHistory); // Update the history state
    setCurrentMove(nextHistory.length - 1); // Update the current move
  }

  // Function to jump to a specific move in the history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // Update the current move
  }

  // Generate a list of moves for the game
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the game
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


