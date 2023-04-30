import React from "react";

export default function Card(props) {
   const { name, link, likes } = props.cardData;
   const callbackSetState = props.callbackSetState;
   const setStateSelectedCard = props.setStateSelectedCard;
   const handleClickSelectedCard = (e, link, name) => {
      const data = {
         link: link,
         name: name,
         isOpened: true,
      };
      callbackSetState(setStateSelectedCard, data);
   };
   return (
      <div
         id="card-template"
         onClick={(e) => handleClickSelectedCard(e, link, name)}>
         <div className="element">
            <button
               type="button"
               aria-label="Кнопка удалить карточку"
               className="element__trash"></button>
            <img className="element__image" alt="Место" src={link} />
            <div className="element__case">
               <h2 className="element__title">{name}</h2>
               <div
                  id="element__like-section"
                  className="element__like-section">
                  <button
                     className="element__like"
                     aria-label="Кнопка лайка"
                     type="button"></button>
                  <p className="element__likesCount">{likes.length}</p>
               </div>
            </div>
         </div>
      </div>
   );
}
