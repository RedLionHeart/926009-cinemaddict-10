import {getRandomIntegerNumber, getRandomArrayItem} from "../utils";
import {FILMS_NAMES, MONTH_NAMES} from "../const";
import {description, FilmsGenres, Posters, getRating, getFilmYear, getFilmDuration} from "./card";

const Names = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Dan Duryea`,
];

const Countries = [
  `USA`,
  `RUSSIA`,
  `INDIA`,
];

const getNames = (names) => {
  return names
    .filter(() => Math.random() > 0.5)
    .slice(0, 1);
};

const getReleaseDate = () => {
  const day = getRandomIntegerNumber(0, 30);
  const month = getRandomArrayItem(MONTH_NAMES);
  return `${day} ${month} ${getFilmYear()}`;
};

const getFilmsGenres = () => {
  return FilmsGenres.filter(()=> Math.random() > 0.5);
};

const generatePopup = () => {
  return {
    name: getRandomArrayItem(FILMS_NAMES),
    poster: getRandomArrayItem(Posters),
    originalName: getRandomArrayItem(FILMS_NAMES),
    rating: getRating(),
    director: getRandomArrayItem(Names),
    writers: getNames(Names),
    actors: getNames(Names),
    releaseDate: getReleaseDate(),
    duration: getFilmDuration(),
    country: getRandomArrayItem(Countries),
    genres: getFilmsGenres(),
    description,
  };
};
export {Names, generatePopup};
