import React from "react";
import { useDispatch } from "react-redux";
import { setPlaying } from "../../store/reducers/playing";
import "./index.css";

const SongRow = ({ track }) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(setPlaying(track));

  return (
    <article className="song-row clickable" onClick={handleClick}>
      <img
        className="song-row__album"
        src={track?.album?.images[0]?.url}
        alt={track?.album?.name || "Album"}
      />

      <div className="song-row__info">
        <h1 className="song-row__track-name">{track?.name}</h1>

        <p className="song-row__track-text">
          {track?.artists?.map((artist) => artist.name).join(", ")}
          {track?.album?.name}
        </p>
      </div>
    </article>
  );
};

export default SongRow;
