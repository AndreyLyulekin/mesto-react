import { Api } from "./Api";

export class CardsService extends Api {
  constructor(apiCredentials) {
    super(apiCredentials);
  }

  getAllCards() {
    return super.get("/cards");
  }

  addNewCard(cardData) {
    return super.post("/cards", cardData);
  }

  deleteCard(cardId) {
    return super.delete(`/cards/${cardId}`);
  }

  setLikeActive(cardId) {
    if (!cardId) {
      console.warn("[cardId] is lost somewhere!");
    }
    return super.put(`/cards/${cardId}/likes`);
  }
  setLikeInActive(cardId) {
    if (!cardId) {
      console.warn("[cardId] is lost somewhere!");
    }
    return super.delete(`/cards/${cardId}/likes`);
  }
}
