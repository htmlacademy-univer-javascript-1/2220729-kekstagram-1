const generateOptions = (min, max, start, step) => ({
  range: { min, max },
  start,
  step,
  connect: 'lower'
});

const sliderOptions = {
  'none': generateOptions(0, 100, 100, 1),
  'chrome': generateOptions(0, 1, 1, 0.1),
  'sepia': generateOptions(0, 1, 1, 0.1),
  'marvin': generateOptions(0, 100, 100, 1),
  'phobos': generateOptions(0, 3, 3, 0.1),
  'heat': generateOptions(0, 3, 3, 0.1)
};

const sliderStyles = {
  'none': () => 'none',
  'chrome': (value) => `grayscale(${value})`,
  'sepia': (value) => `sepia(${value})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value}px)`,
  'heat': (value) => `brightness(${value})`
};

const makeSlider = (filter, levelSlider, levelValue) => {
  let currentFilter = filter;

  const hiddenIfFilterIsNone = () => {
    if (currentFilter === 'none') {
      levelSlider.classList.add('hidden');
    } else {
      levelSlider.classList.remove('hidden');
    }
  };

  hiddenIfFilterIsNone();

  const setCurrentFilter = (value) => {
    currentFilter = value;

    hiddenIfFilterIsNone();
  };

  const getOptions = () => sliderOptions[currentFilter];
  const getStyles = () => sliderStyles[currentFilter](levelValue.value);
  const getCurrentFilter = () => currentFilter;

  return {
    getOptions,
    getStyles,
    setCurrentFilter,
    getCurrentFilter,
  };
};

export {
  makeSlider
};
