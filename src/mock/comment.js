import {getRandomArrayItem, getRandomIntegerNumber, castTimeFormat} from "../utils";
import {Names} from "./popup";

const Comments = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const Emoji = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`,
];

const getRandomCommentDate = () => {
  const year = 2019;
  const month = getRandomIntegerNumber(0, 13);
  const day = getRandomIntegerNumber(0, 31);
  const time = getRandomIntegerNumber(0, 25) + `:` + castTimeFormat(getRandomIntegerNumber(0, 60));
  return `${year}/${month}/${day} ${time}`;
};

const CommentsDate = [
  `today`,
  `2 days ago`,
  getRandomCommentDate(),
];

const generateComment = () => {
  return {
    comment: getRandomArrayItem(Comments),
    emoji: getRandomArrayItem(Emoji),
    author: getRandomArrayItem(Names),
    date: getRandomArrayItem(CommentsDate),
  };
};

export const generateCommentsMarkup = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
