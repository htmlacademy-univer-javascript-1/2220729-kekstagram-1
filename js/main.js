const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.abs(min));
  const upper = Math.floor(Math.abs(max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkMaxLength = (str, maxLength) => str.length <= maxLength;
