import React from "react";
import Like from "./Like";

export default function Card(props) {
  const { name, link, owner } = props.cardData;
  const callbackSetState = props.callbackSetState;
  const setStateSelectedCard = props.setStateSelectedCard;
  const handleClickSelectedCard = (e, link, name) => {
    if (e.target?.className?.includes("element__image")) {
      const data = {
        link: link,
        name: name,
        isOpened: true,
      };
      callbackSetState(setStateSelectedCard, data);
    }
  };

  const isOwn = owner._id === props.currentUserId;

  const handleDeleteClick = (card) => {
    props.onCardDelete(card);
  };

  return (
    <div onClick={(e) => handleClickSelectedCard(e, link, name)}>
      <div className="element">
        {isOwn && (
          <button
            onClick={() => handleDeleteClick(props.cardData)}
            type="button"
            aria-label="Кнопка удалить карточку"
            className="element__trash"></button>
        )}
        <img className="element__image" alt="Место" src={link} />
        <div className="element__case">
          <h2 className="element__title">{name}</h2>
          <Like
            currentUserId={props.currentUserId}
            currentCardId={props.cardData._id}
            props={props.cardData}
            onCardLike={(card) => props.onCardLike(card)}
          />
        </div>
      </div>
    </div>
  );
}
