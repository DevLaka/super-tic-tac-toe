import { PlayerType } from "../../constants";
import "./PlayerDetails.scss";

interface PlayerDetailsProps {
  player: PlayerType;
  currentPlayer: PlayerType;
  winner: PlayerType | null;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  player,
  currentPlayer,
  winner,
}) => {
  return (
    <div className="player-details-container">
      <div
        className={`player-id ${
          player === currentPlayer ? "selected-player-id" : ""
        }`}
      >
        <div
          className={`${
            player === PlayerType.R
              ? "player-avatar-red"
              : "player-avatar-yellow"
          }`}
        ></div>
        <div className="player-avatar-text">
          {player === PlayerType.R ? "Red" : "Yellow"}{" "}
        </div>
      </div>
      <div className="winner-indicator">
        {winner
          ? winner === player
            ? "Winner!"
            : ""
          : player === currentPlayer
          ? "Your Turn"
          : ""}
      </div>
    </div>
  );
};

export default PlayerDetails;
