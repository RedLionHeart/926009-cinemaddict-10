import {getRandomIntegerNumber} from "../utils";
import {getRankUser} from "../mock/rank";

const randomQuantityViewedFilms = getRandomIntegerNumber(0, 60);

export const createProfileTemplate = () => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${getRankUser(randomQuantityViewedFilms)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
