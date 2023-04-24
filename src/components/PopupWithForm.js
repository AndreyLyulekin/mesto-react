import { createCustomEvent } from "../helpers/createCustomEvent";
import { eventNames } from "../helpers/eventNames";

function PopupWithForm(props) {
    console.log(props)
    const handleClearPopup = () => createCustomEvent(eventNames.clearPopups);
    
  return (
<>
{/* <div className="popup popup_card-delete popup_opened">
    <div className="popup__container popup__container-profile">
        <h2 className="popup__title">{props.title}</h2>
        Вы уверены?
        <button type="button" className="popup__exit popup__exit-profile" aria-label="Закрыть попап" onClick={handleClearPopup}></button>
    </div>         
</div> */}
<div className={`popup ${props.divClassName} ${props.openPopup.isAnyOpened && 'popup_opened'}` } onClick={handleClearPopup}>
    <div className={`popup__container ${props.containerClassName}`}>
        <h2 className="popup__title">{props.title}</h2>
        <button type="button" className="popup__exit popup__exit-profile" aria-label="Закрыть попап" onClick={handleClearPopup}></button>
        {props.children}
    </div>
</div>
</>
)}
export default PopupWithForm;