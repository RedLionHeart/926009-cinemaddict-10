import {createElement} from "../utils";

const getRatingTitle = (quantity) => {
  if (quantity < 1) {
    return ``;
  }
  if (quantity < 11) {
    return `Novice`;
  }
  if (quantity < 21) {
    return `Fan`;
  }
  return `Movie Buff`;
};

const createProfileTemplate = (watchedFilms) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${getRatingTitle(watchedFilms)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile {
  constructor(watchedFilms) {
    this._watchedFilms = watchedFilms;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
