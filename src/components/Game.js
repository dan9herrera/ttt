import React from "react";
import Board from "./Board";

class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.state.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      winner: calculateWinner(squares),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winner: calculateWinner(this.state.history[step].squares.slice()),
    });
  }

  renderHistory(history) {
    return (
      <ol>
        {this.state.history.map((_, move) => {
          const desc = move ? "Go to move #" + move : "Go to game start";
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        })}
      </ol>
    );
  }

  render() {
    const { history, stepNumber, winner, xIsNext } = this.state;
    const { squares } = history[stepNumber];

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      if (stepNumber < 9) {
        status = "Next player: " + (xIsNext ? "X" : "O");
      } else {
        status = "Draw!";
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(index) => this.handleClick(index)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {this.renderHistory()}
        </div>
      </div>
    );
  }
}

export default Game;

// =====================================

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

function calculateWinner(squares) {
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
