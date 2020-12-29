import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from '../utils/Api.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

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
  api.getInitialCards()
  .then((res) => {
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
  }, []);

  function handleUpdateUser({name, about}) {
      api.editUserInfo({name, about})
      .then(() => {
        setCurrentUser({
          name,
          about,
          avatar: currentUser.avatar
        });
      })
      .then(() => isEditProfilePopupOpen(false))
      .catch((err) => console.log(err));
  }
  
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({ avatar })
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar,
        });
      })
      .then(() => setEditAvatarPopupOpen(false))
      .catch((err) => console.log(err));
  }
  
  function handleAddPlaceSubmit({link, name}) {
      api.addCard({ link, name })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => setAddPlacePopupOpen(false))
      .catch((err) => console.log(err));
  }

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

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
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
