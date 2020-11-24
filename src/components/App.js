import React, { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

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
    setSelectedCard(false);
  }
  function handleCardClick(card) {
    setIsImageOpen(!isImageOpen);
    setSelectedCard(card);
    console.log(card);
  }

  return (
    <div className="App">
      <div className="page">
        <Header />

        <Main
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
            <button type="submit" className="form__btn">
              Save
            </button>
          </>
        }
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
            <button type="submit" className="form__btn">
              Save
            </button>
          </>
        }
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
            <button type="submit" className="form__btn">
              Create
            </button>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="deleteCard"
        title="Are you sure?"
        children={
          <button type="submit" className="form__btn">
            Yes
          </button>
        }
        isOpen={
          false
        } /* place a variable here to change the state of delete card */
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
