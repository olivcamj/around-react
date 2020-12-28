import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Checking if you are the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `card__removeBtn   ${
    isOwn ? "card__removeBtn" : "card__removeBtn_type_hidden"
  }`;

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `card__heart-icon ${
    isLiked ? "card__heart-icon_active" : "card__heart-icon"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
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
        onClick={handleCardDelete}
      ></button>
      <div className="card__description">
        <h2 className="card__text">{props.name}</h2>
        <div className="card__likeSection">
          <button
            aria-label="Heart"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <h3 className="card__likeCount">{props.likes}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
