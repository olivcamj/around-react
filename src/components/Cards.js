import React from "react";

function Cards(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li key={props.card} className="card">
      <div
        className="card__img"
        style={{ backgroundImage: `url(${props.src})` }}
        onClick={handleClick}
      ></div>
      <button
        aria-label="Remove"
        type="button"
        className="card__removeBtn"
      ></button>
      <div className="card__description">
        <h2 className="card__text">{props.name}</h2>
        <div className="card__likeSection">
          <button aria-label="Heart" className="card__heart-icon"></button>
          <h3 className="card__likeCount">{props.likes}</h3>
        </div>
      </div>
    </li>
  );
}

export default Cards;
