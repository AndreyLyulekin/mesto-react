function PopupWithForm(props) {
   const {
      title,
      divClassName,
      containerClassName,
      callbackSetState,
      state,
      children,
   } = props;

   const handleOverlayClick = (e) => {
      if (e.target?.className?.includes(divClassName)) {
         callbackSetState(false);
      }
   };

   const handleCloseButtonClick = () => {
      callbackSetState(false);
   };
   return (
      <>
         <div
            className={`popup ${divClassName} ${state && "popup_opened"}`}
            onClick={handleOverlayClick}>
            <div className={`popup__container ${containerClassName}`}>
               <h2 className="popup__title">{title}</h2>
               {children}
               <button
                  type="button"
                  className="popup__exit popup__exit-profile"
                  aria-label="Закрыть попап"
                  onClick={handleCloseButtonClick}></button>
            </div>
         </div>
      </>
   );
}
export default PopupWithForm;
