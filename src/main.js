import {createProfileTemplate} from "./components/profile";
import {createMainNavigationTemplate} from "./components/navigation";
import {createFiltersTemplate} from "./components/filter";
import {createFilmsContainerTemplate} from "./components/films-container";
import {createFilmCardTemplate} from "./components/film-card";
import {createButtonShowMoreTemplate} from "./components/button-show-more";
import {createPopupTemplate} from "./components/popup";
import {render} from "./utils";
import {generateFilters} from "./mock/menu";
import {generateCards} from "./mock/card";
import {generatePopup} from "./mock/popup";
import {generateCommentsMarkup} from "./mock/comment";
import {createCommentTemplate} from "./components/comment-popup";
import {createFooterStatistic} from "./components/footer-statistic";


export const FilmCount = {
  ALL: 15,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const COMMENTS_COUNT = 4;

const siteMain = document.querySelector(`.main`);
const siteHeader = document.querySelector(`.header`);
const body = document.querySelector(`body`);
const filters = generateFilters();


render(siteHeader, `beforeend`, createProfileTemplate());
render(siteMain, `afterbegin`, createMainNavigationTemplate(filters));
render(siteMain, `beforeend`, createFiltersTemplate());
render(siteMain, `beforeend`, createFilmsContainerTemplate());

const filmsList = siteMain.querySelector(`.films-list`);
const filmsUnusualList = siteMain.querySelectorAll(`.films-list--extra .films-list__container`);

const defaultFilmsContainer = filmsList.querySelector(`.films-list__container`);
const footerStatistic = body.querySelector(`.footer__statistics`);
const cards = generateCards(FilmCount.ALL);
const popup = generatePopup();
const comments = generateCommentsMarkup(COMMENTS_COUNT);

render(filmsList, `beforeend`, createButtonShowMoreTemplate());

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
cards.slice(0, showingCardsCount)
  .forEach((card) => render(defaultFilmsContainer, `afterbegin`, createFilmCardTemplate(card)));

const showMoreButton = filmsList.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => render(defaultFilmsContainer, `beforeend`, createFilmCardTemplate(card)));

  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
});

render(body, `beforeend`, createPopupTemplate(popup));
const commentsContainer = body.querySelector(`.film-details__comments-list`);
comments.forEach((comment) => render(commentsContainer, `afterbegin`, createCommentTemplate(comment)));

render(footerStatistic, `afterbegin`, createFooterStatistic());

const topRatedFilms = cards.slice().sort((a, b) => b.rating - a.rating).slice(0, 2);
const mostCommented = cards.slice().sort((a, b) => b.comments - a.comments).slice(0, 2);

topRatedFilms.forEach((card) =>{
  if (card.rating !== undefined) {
    render(filmsUnusualList[0], `beforeend`, createFilmCardTemplate(card));
  }
}
);
mostCommented.forEach((card) =>{
  if (card.comments !== undefined) {
    render(filmsUnusualList[1], `beforeend`, createFilmCardTemplate((card)));
  }
}
);
