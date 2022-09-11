const getRandomInt = (min, max) => {
  if (min < 0) {
    throw new Error('Минимальное значение должно быть больше либо равно нулю.');
  }

  if (min >= max) {
    throw new Error('Максимальное значение должно быть больше, чем минимальное значение.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkMaxLength = (str, maxLength) => str.length <= maxLength;
