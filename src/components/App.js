import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from '../utils/Api.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    api.getInitialData() 
    .then(([userData, initialCards]) => {
      setCurrentUser(userData);
      return initialCards;
    })
    .then((res) =>{
      setCards(
        res.map((card) => ({
          link: card.link,
          name: card.name,
          _id: card._id,
          owner: card.owner,
          likes: card.likes.length,
        }))
    );
  })
  .catch((err) => {
    console.log(err);
  });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImageOpen(!isImageOpen);
    setSelectedCard(card);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />

          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            selectedCard={selectedCard}
          />

          <Footer />
        </div>

        <ImagePopup
          card={selectedCard}
          isOpen={isImageOpen}
          onCardClick={handleCardClick}
        />

        <PopupWithForm
          name="setAvatar"
          title="Change profile picture"
          children={
            <>
              <label className="form__label">
                <input
                  type="url"
                  name="link"
                  className="form__item form__item_el_url"
                  placeholder="Image-link"
                  required
                />
                <span className="form__error"></span>
              </label>
            </>
          }
          buttonText="Save"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name="editProfile"
          title="Edit Profile"
          children={
            <>
              <fieldset className="form__input-container">
                <label className="form__label">
                  <input
                    id="profile-name"
                    type="text"
                    name="name"
                    className="form__item form__item_el_name"
                    placeholder="Name"
                    minLength="2"
                    maxLength="40"
                    required
                  />
                  <span id="profile-name-error" className="form__error"></span>
                </label>
                <label className="form__label">
                  <input
                    id="profile-text"
                    type="text"
                    name="title"
                    className="form__item form__item_el_occupation"
                    placeholder="Who are you"
                    minLength="2"
                    maxLength="200"
                    required
                  />
                  <span id="profile-text-error" className="form__error"></span>
                </label>
              </fieldset>
            </>
          }
          buttonText="Save"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="addCard"
          title="Add Place"
          children={
            <>
              <fieldset className="form__input-container">
                <label className="form__label">
                  <input
                    id="card-title"
                    type="text"
                    name="name"
                    className="form__item form__item_el_title"
                    placeholder="Title"
                    minLength="1"
                    maxLength="30"
                    required
                  />
                  <span id="card-title-error" className="form__error"></span>
                </label>
                <label className="form__label">
                  <input
                    id="card-url"
                    type="url"
                    name="link"
                    className="form__item form__item_el_url"
                    placeholder="Image-link"
                    required
                  />
                  <span id="card-url-error" className="form__error"></span>
                </label>
              </fieldset>
            </>
          }
          buttonText="Create"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="deleteCard"
          title="Are you sure?"
          buttonText="Yes"
          isOpen={
            false
          } /* place a variable here to change the state of delete card */
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
