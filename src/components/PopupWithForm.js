import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_visible" : ""
      }`}
      onClick={props.onClose}
    >
      <div className="modal__content">
        <button className="modal__closeBtn" onClick={props.onClose}></button>
        <form
          action="#"
          className={`form form__type_${props.name}`}
          name={props.name}
          noValidate
        >
          <div className="form__content">
            <h3 className="form__heading">{props.title}</h3>
            {props.children}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
