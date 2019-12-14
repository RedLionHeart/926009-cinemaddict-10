export const getRankUser = (quantity) => {
  if (quantity === 0) {
    return ``;
  } else if (quantity >= 1 && quantity <= 10) {
    return `Novice`;
  } else if (quantity >= 11 && quantity <= 20) {
    return `Fan`;
  }
  return `Movie Buff`;
};

