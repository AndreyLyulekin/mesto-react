import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { forms } from "../helpers/forms";
import ImagePopup from "./ImagePopup";
import { UserService } from "./Api/UserService";
import { CardsService } from "./Api/CardsService";
import { apiCredentials } from "./utils/consts";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/CardsContext";
import LoaderContext from "../contexts/LoaderContext";

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

  const [currentUser, setCurrentUser] = useState({});
  const [apiCardsState, setApiCardsState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cardService = new CardsService(apiCredentials);
  const userService = new UserService(apiCredentials);
  useEffect(() => {
    Promise.all([userService.getCurrentUser(), cardService.getAllCards()])
      .then(([userInfoAnswer, cardsAnswer]) => {
        setCurrentUser({ ...userInfoAnswer });
        setApiCardsState([...cardsAnswer]);
      })
      .catch((e) => console.error(e?.reason || e?.message));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      setIsLoading(true);
      cardService
        .setLikeInActive(card._id)
        .then((newCard) => {
          setApiCardsState((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      cardService
        .setLikeActive(card._id)
        .then((newCard) => {
          setApiCardsState((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    }
  }
  function handleCardDelete(card) {
    cardService
      .deleteCard(card._id)
      .then((currentCard) => {
        setApiCardsState((state) => state.filter((c) => (c._id === card._id ? currentCard : c)));
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }

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
      <ImagePopup props={popupSelectedCardState} setStateSelectedCard={setStateSelectedCard} />
      <Header />
      <LoaderContext.Provider value={isLoading}>
        <CardsContext.Provider value={apiCardsState}>
          <CurrentUserContext.Provider value={currentUser}>
            <Main
              onCardLike={(card) => handleCardLike(card)}
              props={callbackSetState}
              setters={callbacksState}
              setStateSelectedCard={setStateSelectedCard}
            />
          </CurrentUserContext.Provider>
        </CardsContext.Provider>
      </LoaderContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
