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
    api.getUserInfo() 
    .then((userData) => {
      setCurrentUser(userData);
    }).catch((err) => {console.log(err)});
  }, []);
    
    
    
    
    useEffect(() =>{
      if(!currentUser) return;
      api.getInitialCards()
      .then((res) => {
        console.log('res', res);
        setCards(
            res.map((card) => ({
              name: card.name,
              link: card.link,
              likes: card.likes,
              _id: card._id,
              owner: card.owner
            }))
          )
      })
      .catch((err) => {
        console.log(err);
      });
      }, [currentUser]);

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

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Send a request to the API and getting the updated card data
    api.changeLikeStatus(card._id, !isLiked).then((newCard) => {
        // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Update the state
      setCards(newCards);
    });
}


function handleCardDelete(card) {
  api.deleteCard(card._id)
  .then(() =>{
    const arrayCopy = cards.filter((c) => c._id !== card._id);
    setCards(arrayCopy);

  })
  .catch(err => console.log(err))
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
            onCardDelete={(card) => {handleCardDelete(card)}} 
            onCardLike={(card) => {handleCardLike(card)}}
            handleCardLike={handleCardLike} 
            handleCardDelete={handleCardDelete}
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
