import { useEffect, useState } from "react";
import { UserService } from "./Api/UserService";
import { CardsService } from "./Api/CardsService";
import { apiCredentials } from "./utils/consts";
import Card from "./Card";

function Main(props) {
   const [apiProfileState, setApiProfileState] = useState({});
   const [apiCardsState, setApiCardsState] = useState([]);
   const callbackSetState = props.props;
   const { setStatePopupProfile, setStatePopupAvatar, setStateCardState } =
      props.setters;
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
         <section className="profile">
            <div
               className="profile__avatar-case"
               onClick={() => callbackSetState(setStatePopupAvatar, true)}>
               <img src={avatar} className="profile__photo" alt="Ваш аватар" />
               <div className="profile__avatar-change"></div>
            </div>
            <div className="profile__info-case">
               <div className="profile__case">
                  <h1 className="profile__name">{name}</h1>
                  <button
                     type="button"
                     aria-label="Кнопка редактирования"
                     className="profile__edit-btn"
                     onClick={() =>
                        callbackSetState(setStatePopupProfile, true)
                     }></button>
               </div>
               <p className="profile__subtitle">{about}</p>
            </div>
            <button
               type="button"
               aria-label="Кнопка добавления фото"
               className="profile__add-btn"
               onClick={() =>
                  callbackSetState(setStateCardState, true)
               }></button>
         </section>
         <section className="elements">
            {apiCardsState.map((card) => (
               <Card
                  key={card._id}
                  cardData={card}
                  callbackSetState={callbackSetState}
                  setStateSelectedCard={props.setStateSelectedCard}
               />
            ))}
         </section>
      </main>
   );
}

export default Main;
