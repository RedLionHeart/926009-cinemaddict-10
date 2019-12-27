import {createElement} from "../utils";

const createFilterMarkup = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createMainNavigationTemplate = (filters) => {
  const filtersMarkup = filters.map(createFilterMarkup).join(`\n`);

  return (
    `<section class="main__filter filter container">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersMarkup}
    </section>`
  );
};

export default class MainNavigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
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
