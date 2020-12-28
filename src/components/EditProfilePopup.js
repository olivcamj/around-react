import React from 'react'

function EditProfilePopup(props) {


    return (
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
        />
)}

export default EditProfilePopup;