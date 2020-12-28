import React from 'react'
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
    
        props.onUpdateAvatar( avatarRef.current.value);
    }

    return (
        <PopupWithForm
          name="setAvatar"
          title="Change profile picture"
          buttonText="Save"
          isOpen={props.isOpen}
		  onClose={props.onClose}
          onSubmit={handleSubmit}
          children={
            <>
              <label className="form__label">
                <input
                  ref={avatarRef}
                  type="url"
                  name="avatar"
                  className="form__item form__item_el_url"
                  placeholder="Image-link"
                  required
                />
                <span className="form__error"></span>
              </label>
            </>
          } 
        />
    )
}

export default EditAvatarPopup;