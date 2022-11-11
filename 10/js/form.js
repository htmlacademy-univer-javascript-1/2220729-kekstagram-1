import {isEscapeKey} from './util.js';
import {checkIfHashtagsRepeated, checkMaxHashtagsCount, checkIfHashtagCorrect, MAX_TAGS_NUMBER} from './validators.js';
import {SmartSlider} from './slider.js';

const SCALE_STEP = 25;
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

let scaleValue = 100;
scaleControlValue.value = `${scaleValue}%`;

pristine.addValidator(textHashtags, checkIfHashtagsRepeated, 'Хештеги регистронезависимы и не должны повторяться');
pristine.addValidator(textHashtags, checkMaxHashtagsCount, `Максимальное число хештегов - ${MAX_TAGS_NUMBER}`);
pristine.addValidator(textHashtags, checkIfHashtagCorrect, 'Один из введённых вами хештегов некорректен');

const closeUploadFileForm = (e) => {
  if ((isEscapeKey(e) && document.activeElement !== textHashtags && document.activeElement !== textDescription) || e.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadFileForm);
    uploadCancel.removeEventListener('click', closeUploadFileForm);
    imgUploadForm.reset();
  }
};

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeUploadFileForm);
  uploadCancel.addEventListener('click', closeUploadFileForm);
});

imgUploadForm.addEventListener('submit', (e) => {
  if (!pristine.validate()) {
    e.preventDefault();
  }
});

scaleControlSmaller.addEventListener('click', () => {
  if (scaleValue !== 25) {
    scaleValue -= SCALE_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (scaleValue !== 100) {
    scaleValue += SCALE_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  }
});

const smartSlider = SmartSlider('none', effectLevelSlider, effectLevelValue);

noUiSlider.create(effectLevelSlider, smartSlider.getOptions());

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgPreview.style.filter = smartSlider.getStyles();
});

effectsRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', (e) => {
    imgUploadPreview.classList.remove(`effects__preview--${smartSlider.getCurrentFilter()}`);
    smartSlider.setCurrentFilter(e.target.value);
    imgUploadPreview.classList.add(`effects__preview--${smartSlider.getCurrentFilter()}`);
    effectLevelSlider.noUiSlider.updateOptions(smartSlider.getOptions());
    imgPreview.style.filter = smartSlider.getStyles();
  });
});
