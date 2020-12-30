import React, {useContext} from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
            />
            <button
              aria-label="Edit-Avatar"
              type="button"
              className="profile__avatar-overlay"
              onClick={props.onEditAvatar}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__heading">{currentUser.name}</h1>
            <button
              aria-label="Edit"
              type="button"
              className="profile__editBtn"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
          <button
            aria-label="Add"
            type="button"
            className="profile__addBtn"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>

      <section className="elements section">
        <ul className="elements__container">
          {props.cards.map((card, index) => {
            return (
              <Card
                key={index}
                id={card._id}
                card={card}
                src={card.link}
                name={card.name}
                likes={card.likes.length}
                owner={card.owner}
                currrentUserId={currentUser._id}
                onCardClick={props.onCardClick}
                onCardDelete={(card) => props.handleCardDelete(card)} 
							  onCardLike={() => {props.handleCardLike(card)}}
              />
            );
          })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
