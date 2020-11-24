import React, { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";
import ImagePopup from "./ImagePopup.js";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialData()
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.description);
        setUserAvatar(userData.avatar);
        console.log(initialCards);
        return initialCards;
      })
      .then((res) => {
        setCards(
          res.map((card) => ({
            link: card.link,
            name: card.name,
            _id: card._id,
            likes: card.likes.length,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img
              src={userAvatar}
              alt="A profile of Jacques Cousteau"
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
            <h1 className="profile__heading">{userName}</h1>
            <button
              aria-label="Edit"
              type="button"
              className="profile__editBtn"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__occupation">{userDescription}</p>
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
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                src={card.link}
                name={card.name}
                likes={card.likes}
                card={card}
                onCardClick={props.onCardClick}
              />
            );
          })}
        </ul>
      </section>

      <ImagePopup
        card={props.selectedCard}
        isOpen={props.isImageOpen}
        onClose={props.onClose}
      />
    </main>
  );
}

export default Main;
