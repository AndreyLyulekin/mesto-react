import avatar from '../images/avatar.jpg'
import ImagePopup from './ImagePopup'
import { createCustomEvent } from "../helpers/createCustomEvent";
import { eventNames } from "../helpers/eventNames";

function Main() {

        // const handleClickPopup_card_delete = () => createCustomEvent(eventNames.openPopup, "popup_card_delete");
        const handleClickPopup_profile = () => createCustomEvent(eventNames.openPopup, "popup_profile");
        const handleClickPopup_avatar = () => createCustomEvent(eventNames.openPopup, "popup_avatar");
        const handleClickPopup_card = () => createCustomEvent(eventNames.openPopup, "popup_card");

  return (
        <main>
            <ImagePopup />
            <section className="profile">
                <div className="profile__avatar-case">
                    <img src={avatar} className="profile__photo" alt="Ваш аватар"/>
                    <div className="profile__avatar-change" onClick={handleClickPopup_avatar}>
                    </div>
                </div>
                <div className="profile__info-case">
                    <div className="profile__case">
                        <h1 className="profile__name">Жак-Ив Кусто</h1>
                        <button 
                        type="button" 
                        aria-label="Кнопка редактирования" 
                        className="profile__edit-btn"
                        onClick={handleClickPopup_profile}></button>
                    </div>
                    <p className="profile__subtitle">Исследователь океана</p>
                </div>
                <button type="button" aria-label="Кнопка добавления фото" className="profile__add-btn" onClick={handleClickPopup_card}></button>
            </section>
            <section className="elements">
            </section>
        </main>
  );
}

export default Main;