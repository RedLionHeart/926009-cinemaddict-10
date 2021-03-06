const filterNames = [
  `Watchlist`, `History`, `Favorites`
];

const generateFilters = () => {
  return filterNames.map((it) => ({
    name: it,
    count: Math.floor(Math.random() * 10),
  }));
};

export {generateFilters};
