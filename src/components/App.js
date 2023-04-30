import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import { forms } from "../helpers/forms";
import ImagePopup from "./ImagePopup";

function App() {
   const [popupProfileState, setStatePopupProfile] = useState(false);
   const [popupAvatarState, setStatePopupAvatar] = useState(false);
   const [selectedCardState, setStateCardState] = useState(false);
   const [popupSelectedCardState, setStateSelectedCard] = useState(false);
   const callbackSetState = (setter, data) => {
      setter(data);
   };
   const mainModalsArr = [
      {
         title: "Редактировать профиль",
         divClassName: "popup_profile",
         containerClassName: "popup__container-profile",
         state: popupProfileState,
         callbackSetState: setStatePopupProfile,
         children: forms.popup_profile,
      },
      {
         title: "Обновить аватар",
         divClassName: "popup_avatar",
         containerClassName: "popup__container-profile",
         state: popupAvatarState,
         callbackSetState: setStatePopupAvatar,
         children: forms.profile_edit,
      },
      {
         title: "Новое место",
         divClassName: "popup_card",
         containerClassName: "popup__container-card",
         state: selectedCardState,
         callbackSetState: setStateCardState,
         children: forms.card_form,
      },
   ];
   const callbacksState = {
      setStatePopupProfile,
      setStatePopupAvatar,
      setStateCardState,
      setStateSelectedCard,
   };
   return (
      <div className="root">
         {mainModalsArr.map((modalConfig) => (
            <PopupWithForm
               key={modalConfig.title}
               title={modalConfig.title}
               divClassName={modalConfig.divClassName}
               containerClassName={modalConfig.containerClassName}
               callbackSetState={modalConfig.callbackSetState}
               state={modalConfig.state}
               children={modalConfig.children}
               props={callbacksState}
            />
         ))}
         <ImagePopup
            props={popupSelectedCardState}
            setStateSelectedCard={setStateSelectedCard}
         />
         <Header />
         <Main
            props={callbackSetState}
            setters={callbacksState}
            setStateSelectedCard={setStateSelectedCard}
         />
         <Footer />
      </div>
   );
}

export default App;
