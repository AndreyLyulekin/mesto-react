import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { eventNames } from "../helpers/eventNames";
import { useEffect, useState } from "react";
import { forms } from "../helpers/forms";
import ImagePopup from "./ImagePopup";

const defaultState = {
   popup_card_delete: false,
   popup_profile: false,
   popup_avatar: false,
   popup_card: false,
   selectedCard: false,
};

function App() {
   const [state, setState] = useState(defaultState);

   useEffect(() => {
      const clearPopups = () => {
         setState(defaultState);
      };
      const setPopup = (e) => {
         setState({ ...defaultState, [e.detail]: true });
      };

      document.addEventListener(eventNames.openPopup, setPopup);
      document.addEventListener(eventNames.clearPopups, clearPopups);

      return () => {
         document.removeEventListener(eventNames.openPopup, setPopup);
         document.removeEventListener(eventNames.clearPopups, clearPopups);
      };
   }, []);

   return (
      <div className="root">
         <PopupWithForm
            title="Редактировать профиль"
            divClassName="popup_profile"
            containerClassName="popup__container-profile"
            isOpened={state.popup_profile}>
            {forms.popup_profile}
         </PopupWithForm>
         <PopupWithForm
            title="Обновить аватар"
            divClassName="popup_avatar"
            containerClassName="popup__container-profile"
            isOpened={state.popup_avatar}>
            {forms.profile_edit}
         </PopupWithForm>
         <PopupWithForm
            title="Новое место"
            divClassName="popup_card"
            containerClassName="popup__container-card"
            isOpened={state.popup_card}>
            {forms.card_form}
         </PopupWithForm>
         <ImagePopup></ImagePopup>
         <Header />
         <Main />
         <Footer />
      </div>
   );
}

export default App;
