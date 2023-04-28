import { eventNames } from "../helpers/eventNames";
import { useEffect, useState } from "react";
import { createCustomEvent } from "../helpers/createCustomEvent";

function ImagePopup() {
   const defaultCardState = {
      link: "#",
      name: false,
      isOpened: false,
   };

   const handleOverlayClick = (e) => {
      if (e.target?.className?.includes("popup_scale-image")) {
         createCustomEvent(eventNames.clearSelectedCard, defaultCardState);
      }
   };
   const handleCloseButtonClick = () => {
      createCustomEvent(eventNames.clearSelectedCard, defaultCardState);
   };
   const [state, setState] = useState(defaultCardState);

   useEffect(() => {
      const setCardDataPopup = (e) => {
         setState({
            link: e.detail.link,
            name: e.detail.name,
            isOpened: e.detail.isOpened,
         });
      };

      const clearDataCardPopup = () => {
         setState((prevState) => {
            let stateForClose = Object.assign(prevState, {
               isOpened: false,
            });
            return { ...stateForClose };
         });
      };

      document.addEventListener(eventNames.selectedCard, setCardDataPopup);
      document.addEventListener(
         eventNames.clearSelectedCard,
         clearDataCardPopup
      );

      return () => {
         document.removeEventListener(
            eventNames.selectedCard,
            setCardDataPopup
         );

         document.removeEventListener(
            eventNames.clearSelectedCard,
            clearDataCardPopup
         );
      };
   }, []);
   const { link, name, isOpened } = state;
   return (
      <div
         className={`popup popup_scale-image ${isOpened && "popup_opened"}`}
         onClick={handleOverlayClick}>
         <div className="popup__content-image">
            <img src={link} alt="Место" className="popup__image" />
            <figcaption className="popup__subtitle">{name}</figcaption>
            <button
               type="button"
               className="popup__exit popup__exit-img"
               aria-label="Закрыть попап"
               onClick={handleCloseButtonClick}></button>
         </div>
      </div>
   );
}
export default ImagePopup;
