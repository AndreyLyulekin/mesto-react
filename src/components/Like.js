import React, { useEffect } from "react";
import LoaderContext from "../contexts/LoaderContext";
import { useContext } from "react";

export default function Like(props) {
  const { likes } = props.props;
  const pending = useContext(LoaderContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const isLiked = likes.some((i) => i._id === props.currentUserId);
  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_active"}`;
  const handleLikeClick = (card) => {
    props.onCardLike(card);
  };

  useEffect(() => {
    setIsLoading(pending.isLoading && pending.idCard === props.currentCardId);
  }, [pending, props.currentCardId]);

  return (
    <div id="element__like-section" className="element__like-section">
      {!isLoading ? (
        <button
          onClick={() => handleLikeClick(props.props)}
          className={cardLikeButtonClassName}
          aria-label="Кнопка лайка"
          type="button"
        />
      ) : (
        <span className="loader"></span>
      )}
      <p className="element__likesCount">{likes.length}</p>
    </div>
  );
}
