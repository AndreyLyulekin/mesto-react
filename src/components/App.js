import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import { UserService } from "../Api/UserService";
import { CardsService } from "../Api/CardsService";
import { apiCredentials } from "../utils/consts";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/CardsContext";
import LoaderContext from "../contexts/LoaderContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

const cardService = new CardsService(apiCredentials);
const userService = new UserService(apiCredentials);

function App() {
  const [popupProfileState, setStatePopupProfile] = useState(false);
  const [popupAvatarState, setStatePopupAvatar] = useState(false);
  const [selectedCardState, setStateCardState] = useState(false);
  const [popupSelectedCardState, setStateSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [apiCardsState, setApiCardsState] = useState([]);
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    idCard: "",
  });

  const callbackSetState = (setter, data) => {
    setter(data);
  };

  const callbacksState = {
    setStatePopupProfile,
    setStatePopupAvatar,
    setStateCardState,
    setStateSelectedCard,
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      setIsLoading({ isLoading: true, idCard: card._id });
      cardService
        .setLikeInActive(card._id)
        .then((newCard) => {
          setApiCardsState((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading({ isLoading: false, idCard: "" }));
    } else {
      setIsLoading({ isLoading: true, idCard: card._id });
      cardService
        .setLikeActive(card._id)
        .then((newCard) => {
          setApiCardsState((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading({ isLoading: false, idCard: "" }));
    }
  }
  function handleCardDelete(card) {
    cardService
      .deleteCard(card._id)
      .then((currentCard) => {
        if (currentCard.message !== "Пост удалён") return;

        setApiCardsState((state) => state.filter((cardToDelete) => card._id !== cardToDelete._id));
      })
      .catch((e) => console.log(e));
  }

  function handleSubmitUserInfo(e, name, description) {
    e.preventDefault();
    console.log("tut");
    userService
      .updateUserInfo({
        name,
        about: description,
      })
      .then(() => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: name,
          about: description,
        }));
        setStatePopupProfile(false);
      });
  }

  function handleSubmitUserAvatar(e, urlAvatarImg) {
    e.preventDefault();
    userService
      .changeAvatar({
        avatar: urlAvatarImg,
      })
      .then(() => {
        setCurrentUser((prevState) => ({
          ...prevState,
          avatar: urlAvatarImg,
        }));
        setStatePopupAvatar(false);
      });
  }
  function handleAddPlaceSubmit(e, newCardLink, newCardName) {
    e.preventDefault();
    cardService
      .addNewCard({
        link: newCardLink,
        name: newCardName,
      })
      .then((responseCard) => {
        setApiCardsState([responseCard, ...apiCardsState]);
        setStateCardState(false);
      });
  }
  useEffect(() => {
    Promise.all([userService.getCurrentUser(), cardService.getAllCards()])
      .then(([userInfoAnswer, cardsAnswer]) => {
        setCurrentUser({ ...userInfoAnswer });
        setApiCardsState([...cardsAnswer]);
      })
      .catch((e) => console.error(e?.reason || e?.message));
  }, []);

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          onUpdateUser={(e, name, description) => handleSubmitUserInfo(e, name, description)}
          isOpen={popupProfileState}
          onClose={setStatePopupProfile}
        />
        <EditAvatarPopup
          onUpdateAvatar={(e, urlAvatarImg) => handleSubmitUserAvatar(e, urlAvatarImg)}
          isOpen={popupAvatarState}
          onClose={setStatePopupAvatar}
        />
        <AddPlacePopup
          onAddPlace={(e, newCardLink, newCardName) => handleAddPlaceSubmit(e, newCardLink, newCardName)}
          isOpen={selectedCardState}
          onClose={setStateCardState}
        />
        <ImagePopup props={popupSelectedCardState} setStateSelectedCard={setStateSelectedCard} />
        <Header />
        <LoaderContext.Provider value={isLoading}>
          <CardsContext.Provider value={apiCardsState}>
            <Main
              onCardLike={(card) => handleCardLike(card)}
              onCardDelete={(card) => handleCardDelete(card)}
              props={callbackSetState}
              setters={callbacksState}
              setStateSelectedCard={setStateSelectedCard}
            />
          </CardsContext.Provider>
        </LoaderContext.Provider>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
