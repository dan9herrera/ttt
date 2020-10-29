import Square from "./Square";

const Board = (props) => (
  <>
    {props.squares.map((value, index) => {
      return (
        <Square
          key={index}
          value={value}
          onClick={() => props.onClick(index)}
        />
      );
    })}
  </>
);

export default Board;
