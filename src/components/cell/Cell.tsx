import "./CellStyles.scss";
import { CellType, PlayerType } from "../../constants";

interface CellProps {
  cell: CellType;
  rowIndex: number;
  colIndex: number;
}

const Cell: React.FC<CellProps> = ({ cell, rowIndex, colIndex }) => {
  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      className={`cell ${
        cell === PlayerType.R
          ? "cell-red"
          : cell === PlayerType.Y
          ? "cell-yellow"
          : ""
      }`}
    />
  );
};

export default Cell;
