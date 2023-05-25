import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const newCardName = useRef();
  const newCardLink = useRef();

  const handleButtonClick = (e) => {
    onAddPlace(e, newCardLink.current.value, newCardName.current.value);
  };
  return (
    <PopupWithForm
      title="Новое место"
      divClassName="popup_card"
      containerClassName="popup__container-card"
      isOpen={isOpen}
      callbackSetState={onClose}>
      {isOpen && (
        <form name="card-form" className="popup__form" onSubmit={(e) => handleButtonClick(e)}>
          <input
            name="cardName"
            type="text"
            placeholder="Введите название"
            className="popup__input popup__input_card_title"
            minLength="2"
            maxLength="30"
            required
            ref={newCardName}
          />
          <span id="errorMessage-cardName" className="popup__input-error"></span>
          <input
            name="urlCard"
            placeholder="Вставьте ссылку на картину"
            className="popup__input popup__input_card_link"
            type="url"
            pattern="^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?"
            required
            ref={newCardLink}
          />
          <span id="errorMessage-urlCard" className="popup__input-error"></span>
          <button type="submit" className="popup__btn">
            Создать
          </button>
        </form>
      )}
    </PopupWithForm>
  );
}
// popup__btn-inactive
