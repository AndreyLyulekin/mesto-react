import ImagePopup from "./ImagePopup";
import { createCustomEvent } from "../helpers/createCustomEvent";
import { eventNames } from "../helpers/eventNames";
import { useEffect, useState } from "react";
import { UserService } from "./Api/UserService";
import { CardsService } from "./Api/CardsService";
import { apiCredentials } from "./utils/consts";
import Template from "../helpers/templates";

function Main(props) {
   // const handleClickPopup_card_delete = () => createCustomEvent(eventNames.openPopup, "popup_card_delete");
   const handleClickPopup_profile = () =>
      createCustomEvent(eventNames.openPopup, "popup_profile");
   const handleClickPopup_avatar = () =>
      createCustomEvent(eventNames.openPopup, "popup_avatar");
   const handleClickPopup_card = () =>
      createCustomEvent(eventNames.openPopup, "popup_card");

   const [apiProfileState, setApiProfileState] = useState({});
   const [apiCardsState, setApiCardsState] = useState([]);

   useEffect(() => {
      const cardService = new CardsService(apiCredentials);
      const userService = new UserService(apiCredentials);
      Promise.all([userService.getCurrentUser(), cardService.getAllCards()])
         .then(([userInfoAnswer, cardsAnswer]) => {
            setApiProfileState({ ...userInfoAnswer });
            setApiCardsState([...cardsAnswer]);
         })
         .catch((e) => console.error(e?.reason || e?.message));
   }, []);

   const { name, about, avatar } = apiProfileState;

   return (
      <main>
         <ImagePopup></ImagePopup>
         <section className="profile">
            <div className="profile__avatar-case">
               <img src={avatar} className="profile__photo" alt="Ваш аватар" />
               <div
                  className="profile__avatar-change"
                  onClick={handleClickPopup_avatar}></div>
            </div>
            <div className="profile__info-case">
               <div className="profile__case">
                  <h1 className="profile__name">{name}</h1>
                  <button
                     type="button"
                     aria-label="Кнопка редактирования"
                     className="profile__edit-btn"
                     onClick={handleClickPopup_profile}></button>
               </div>
               <p className="profile__subtitle">{about}</p>
            </div>
            <button
               type="button"
               aria-label="Кнопка добавления фото"
               className="profile__add-btn"
               onClick={handleClickPopup_card}></button>
         </section>
         <section className="elements">
            {apiCardsState.map((card) => (
               <Template key={card._id} props={card} />
            ))}
         </section>
      </main>
   );
}

export default Main;
