import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  const handleButtonClick = (e) => {
    onUpdateAvatar(e, inputRef.current.value);
  };
  return (
    <PopupWithForm
      title="Обновить аватар"
      divClassName="popup_avatar"
      containerClassName="popup__container-profile"
      isOpen={isOpen}
      callbackSetState={onClose}>
      {isOpen && (
        <form name="profile-edit" className="popup__form" onSubmit={(e) => handleButtonClick(e)}>
          <input
            ref={inputRef}
            name="avatar"
            placeholder="Ссылка на аватар"
            className="popup__input popup__input_type_name"
            type="url"
            pattern="^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&amp;%@!\-\/])*)?"
            required=""
          />
          <span id="errorMessage-avatar" className="popup__input-error"></span>
          <button type="submit" className="popup__btn">
            Сохранить
          </button>
        </form>
      )}
    </PopupWithForm>
  );
}
// popup__btn-inactive
