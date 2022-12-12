const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const scaleImage = (scaleControlValue, imgPreview) => {
  let scaleValue;

  const applyChanges = () => {
    scaleControlValue.value = `${scaleValue}%`;
    imgPreview.style.transform = `scale(${scaleValue / 100})`;
  };

  const init = () => {
    scaleValue = MAX_SCALE_VALUE;
    applyChanges();
  };

  init();

  const increaseValue = () => {
    if (scaleValue !== MAX_SCALE_VALUE) {
      scaleValue += SCALE_STEP;
      applyChanges();
    }
  };

  const decreaseValue = () => {
    if (scaleValue !== MIN_SCALE_VALUE) {
      scaleValue -= SCALE_STEP;
      applyChanges();
    }
  };

  return {
    init,
    increaseValue,
    decreaseValue,
  };
};

export {
  scaleImage
};
