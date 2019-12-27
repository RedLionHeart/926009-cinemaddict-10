import {RenderPosition, render} from "./utils";
import {generateFilters} from "./mock/menu";
import {generateCards} from "./mock/card";
import {generatePopup} from "./mock/popup";
import {generateCommentsMarkup} from "./mock/comment";
import ProfileComponent from "./components/profile.js";
import NavigationComponent from "./components/navigation.js";
import FilterComponent from "./components/filter.js";
import FilmsContainerComponent from "./components/films-container";
import FilmCardComponent from "./components/film-card";
import ButtonShowMoreComponent from "./components/button-show-more";
import FooterStatisticComponent from "./components/footer-statistic";
import CommentPopupComponent from "./components/comment-popup";
import PopupComponent from "./components/popup";

const FilmCount = {
  ALL: 15,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
  SHOWING_CARDS_ON_START: 5,
  SHOWING_CARDS_BY_BUTTON: 5,
};

const COMMENTS_COUNT = 4;

const siteMain = document.querySelector(`.main`);
const siteHeader = document.querySelector(`.header`);
const body = document.querySelector(`body`);
const filters = generateFilters();
const cards = generateCards(FilmCount.ALL);
let watchedFilmsCount = 0;
cards.forEach((card) => {
  if (card.alreadyWatched) {
    watchedFilmsCount++;
  }
});

render(siteHeader, new ProfileComponent(watchedFilmsCount).getElement(), RenderPosition.BEFOREEND);
render(siteMain, new NavigationComponent(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMain, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

const filmsList = siteMain.querySelector(`.films-list`);
const topRatedFilmsList = siteMain.querySelector(`.top-rated .films-list__container`);
const mostCommentedFilmsList = siteMain.querySelector(`.most-commented .films-list__container`);
const defaultFilmsContainer = filmsList.querySelector(`.films-list__container`);
const footerStatistic = body.querySelector(`.footer__statistics`);

const popup = generatePopup();
const comments = generateCommentsMarkup(COMMENTS_COUNT);

render(filmsList, new ButtonShowMoreComponent().getElement(), RenderPosition.BEFOREEND);

// Обработчик клика по элементам карточки фильма.
const cardElementClickHandler = () => {
  const popupComponent = new PopupComponent(popup);
  const closePopupButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  const commentsContainer = popupComponent.getElement().querySelector(`.film-details__comments-list`);

  render(body, popupComponent.getElement(), RenderPosition.BEFOREEND);

  comments.forEach((comment) =>
    render(commentsContainer, new CommentPopupComponent(comment).getElement(), RenderPosition.AFTERBEGIN));

  closePopupButton.addEventListener(`click`, () => {
    popupComponent.getElement().remove();
  });
};

// Функция отрисовывает карточку фильма и показывает попап при клике на его элементы.
const renderCard = (card, container) => {
  const cardComponent = new FilmCardComponent(card);
  const titleCard = cardComponent.getElement().querySelector(`.film-card__title`);
  const posterCard = cardComponent.getElement().querySelector(`.film-card__poster`);
  const commentsCard = cardComponent.getElement().querySelector(`.film-card__comments`);

  titleCard.addEventListener(`click`, cardElementClickHandler);
  posterCard.addEventListener(`click`, cardElementClickHandler);
  commentsCard.addEventListener(`click`, cardElementClickHandler);

  render(container, cardComponent.getElement(), RenderPosition.AFTERBEGIN);
};

let showingCardsCount = FilmCount.SHOWING_CARDS_ON_START;
cards.slice(0, showingCardsCount)
  .forEach((card) =>{
    renderCard(card, defaultFilmsContainer);
  });

const showMoreButton = filmsList.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + FilmCount.SHOWING_CARDS_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) =>
      renderCard(card, defaultFilmsContainer));

  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
});

render(footerStatistic, new FooterStatisticComponent(FilmCount.ALL).getElement(), RenderPosition.AFTERBEGIN);

const topRatedFilms = cards.slice().sort((a, b) =>
  parseFloat(b.rating) - parseFloat(a.rating)).slice(0, FilmCount.TOP_RATED);
const mostCommented = cards.slice().sort((a, b) =>
  parseFloat(b.comments) - parseFloat(a.comments)).slice(0, FilmCount.MOST_COMMENTED);

topRatedFilms.forEach((card) =>{
  if (card.rating !== undefined) {
    renderCard(card, topRatedFilmsList);
  }
});
mostCommented.forEach((card) =>{
  if (card.comments !== undefined) {
    renderCard(card, mostCommentedFilmsList);
  }
});
