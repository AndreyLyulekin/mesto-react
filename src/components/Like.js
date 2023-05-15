import React from "react";
import LoaderContext from "../contexts/LoaderContext";
import { useContext } from "react";

export default function Like(props) {
  const { likes } = props.props;
  const isLiked = likes.some((i) => i._id === props.currentUserId);
  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_active"}`;

  const handleLikeClick = (card) => {
    props.onCardLike(card);
  };
  const pending = useContext(LoaderContext);
  return (
    <div id="element__like-section" className="element__like-section">
      {!pending && (
        <button
          onClick={() => handleLikeClick(props.props)}
          className={cardLikeButtonClassName}
          aria-label="Кнопка лайка"
          type="button"></button>
      )}
      {pending && <span class="loader"></span>}
      <p className="element__likesCount">{likes.length}</p>
    </div>
  );
}
