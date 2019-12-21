const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export {render, getRandomArrayItem, getRandomIntegerNumber, castTimeFormat};
