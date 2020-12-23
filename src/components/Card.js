import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Checking if you are the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__removeBtn_visible' : 'card__removeBtn_type_hidden'}`
  );

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
        className={cardDeleteButtonClassName}
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

export default Card;
