import {getRandomIntegerNumber, getRandomArrayItem} from "../utils";
import {FILMS_NAMES} from "../const";

const FilmsGenres = [
  `musical`,
  `horror`,
  `comedy`,
  `history`,
];

const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const description = `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula 
feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci 
ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget
 ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
 Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut 
 dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. 
 Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const DescriptionSentences = description.split(`.`);

const generateDescriptionCard = (text) => {
  return text
    .filter(()=> Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, 4));
};

const getFilmYear = () => {
  return getRandomIntegerNumber(1920, 2020);
};

const getRating = () => {
  return getRandomIntegerNumber(0, 10) + `.` + getRandomIntegerNumber(0, 10);
};

const getFilmDuration = () => {
  const hours = getRandomIntegerNumber(0, 3);
  const minutes = getRandomIntegerNumber(0, 60);

  return `${hours}h ${minutes}m`;
};

// Создаем карточку фильма.
const generateCard = () => {
  return {
    name: getRandomArrayItem(FILMS_NAMES),
    poster: getRandomArrayItem(Posters),
    description: new Set(generateDescriptionCard(DescriptionSentences)),
    year: getFilmYear(),
    rating: getRating(),
    duration: getFilmDuration(),
    genre: getRandomArrayItem(FilmsGenres),
    comments: getRandomIntegerNumber(0, 50),
  };
};

// Создаем массив объектов карточек.
const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {description, FilmsGenres, Posters, getRating, getFilmYear, generateDescriptionCard, getFilmDuration, generateCard, generateCards};
