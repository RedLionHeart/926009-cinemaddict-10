import {createProfileTemplate} from "./components/profile";
import {createMainNavigationTemplate} from "./components/navigation";
import {createFiltersTemplate} from "./components/filter";
import {createFilmsContainerTemplate} from "./components/films-container";
import {createFilmCardTemplate} from "./components/film-card";
import {createButtonShowMoreTemplate} from "./components/button-show-more";
import {createPopupTemplate} from "./components/popup";

const FilmsCount = {
  DEFAULT_FILMS_COUNT: 5,
  TOP_RATED_AND_MOST_COMMENTED_FILMS_COUNT: 2
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const bodyElement = document.querySelector(`body`);

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, `beforeend`, createProfileTemplate());
render(siteMainElement, `afterbegin`, createMainNavigationTemplate());
render(siteMainElement, `beforeend`, createFiltersTemplate());
render(siteMainElement, `beforeend`, createFilmsContainerTemplate());

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsUnusualListElement = siteMainElement.querySelectorAll(`.films-list--extra`);
const defaultFilmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

render(filmsListElement, `beforeend`, createButtonShowMoreTemplate());

new Array(FilmsCount.DEFAULT_FILMS_COUNT).fill(``).forEach(() => {
  render(defaultFilmsContainerElement, `afterbegin`, createFilmCardTemplate());
});

filmsUnusualListElement.forEach((block) => {
  const unusualFilmsContainer = block.querySelector(`.films-list__container`);
  new Array(FilmsCount.TOP_RATED_AND_MOST_COMMENTED_FILMS_COUNT)
    .fill(``)
    .forEach(() => {
      render(unusualFilmsContainer, `afterbegin`, createFilmCardTemplate());
    });
});

render(bodyElement, `beforeend`, createPopupTemplate());
