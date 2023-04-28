import { createCustomEvent } from "../helpers/createCustomEvent";
import { eventNames } from "../helpers/eventNames";

function PopupWithForm(props) {
   const { isOpened, divClassName, containerClassName, title, children } =
      props;
   const handleOverlayClick = (e) => {
      if (e.target?.className?.includes(props.divClassName)) {
         createCustomEvent(eventNames.clearPopups);
      }
   };
   const handleCloseButtonClick = () => {
      createCustomEvent(eventNames.clearPopups);
   };

   return (
      <>
         <div
            className={`popup ${divClassName} ${isOpened && "popup_opened"}`}
            onClick={handleOverlayClick}>
            <div className={`popup__container ${containerClassName}`}>
               <h2 className="popup__title">{title}</h2>
               <button
                  type="button"
                  className="popup__exit popup__exit-profile"
                  aria-label="Закрыть попап"
                  onClick={handleCloseButtonClick}></button>
               {children}
            </div>
         </div>
      </>
   );
}
export default PopupWithForm;
