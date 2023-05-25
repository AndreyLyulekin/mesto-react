import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setNamePopupProfile] = useState("");
  const [description, setDescriptionPopupProfile] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setNamePopupProfile(currentUser.name);
    setDescriptionPopupProfile(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      divClassName="popup_profile"
      containerClassName="popup__container-profile"
      isOpen={isOpen}
      callbackSetState={onClose}>
      {isOpen && (
        <form onSubmit={(e) => onUpdateUser(e, name, description)} name="profile-edit" className="popup__form">
          <input
            name="userName"
            type="text"
            placeholder="Ваше имя"
            className="popup__input popup__input_type_name"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={(e) => setNamePopupProfile(e.target.value)}
          />
          <span id="errorMessage-userName" className="popup__input-error"></span>
          <input
            name="userJob"
            type="text"
            placeholder="Ваша работа"
            className="popup__input popup__input_type_job"
            minLength="2"
            maxLength="200"
            required
            value={description}
            onChange={(e) => setDescriptionPopupProfile(e.target.value)}
          />
          <span id="errorMessage-userJob" className="popup__input-error"></span>
          <button type="submit" className="popup__btn">
            Сохранить
          </button>
        </form>
      )}
    </PopupWithForm>
  );
}
// popup__btn-inactive
