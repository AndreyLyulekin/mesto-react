import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardsContext from "../contexts/CardsContext";

function Main(props) {
  const callbackSetState = props.props;
  const { setStatePopupProfile, setStatePopupAvatar, setStateCardState } = props.setters;

  return (
    <main>
      <CurrentUserContext.Consumer>
        {(CurrentUserContext) => (
          <>
            <section className="profile">
              <div className="profile__avatar-case" onClick={() => callbackSetState(setStatePopupAvatar, true)}>
                <img src={CurrentUserContext.avatar} className="profile__photo" alt="Ваш аватар" />
                <div className="profile__avatar-change"></div>
              </div>
              <div className="profile__info-case">
                <div className="profile__case">
                  <h1 className="profile__name">{CurrentUserContext.name}</h1>
                  <button
                    type="button"
                    aria-label="Кнопка редактирования"
                    className="profile__edit-btn"
                    onClick={() => callbackSetState(setStatePopupProfile, true)}></button>
                </div>
                <p className="profile__subtitle">{CurrentUserContext.about}</p>
              </div>
              <button
                type="button"
                aria-label="Кнопка добавления фото"
                className="profile__add-btn"
                onClick={() => callbackSetState(setStateCardState, true)}></button>
            </section>
            <CardsContext.Consumer>
              {(CardsContext) => (
                <section className="elements">
                  {CardsContext.map((card) => (
                    <Card
                      onCardLike={(card) => props.onCardLike(card)}
                      key={card._id}
                      cardData={card}
                      callbackSetState={callbackSetState}
                      setStateSelectedCard={props.setStateSelectedCard}
                      currentUserId={CurrentUserContext._id}
                    />
                  ))}
                </section>
              )}
            </CardsContext.Consumer>
          </>
        )}
      </CurrentUserContext.Consumer>
    </main>
  );
}

export default Main;
