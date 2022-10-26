import {isEscapeKey, TAGS_REGEX} from './util.js';

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
pristine.addValidator(textHashtags, (value) => {
  if (value === '') {
    return true;
  }

  const hashTagsArray = value.toLowerCase().split(' ');
  const hashTagsSet = new Set(hashTagsArray);

  if (hashTagsSet.size !== hashTagsArray.length) {
    return false;
  }

  if (hashTagsArray.length > 5) {
    return false;
  }

  return hashTagsArray.every((hashtag) => TAGS_REGEX.test(hashtag));
}, 'Введите корректные хештеги');

const fieldStopPropagation = (e) => {
  if (isEscapeKey(e)) {
    e.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', fieldStopPropagation);
textDescription.addEventListener('keydown', fieldStopPropagation);

const closeUploadFileForm = (e) => {
  if (isEscapeKey(e)) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadFileForm);
  }
};

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeUploadFileForm);
});

uploadCancel.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeUploadFileForm);
});

imgUploadForm.addEventListener('submit', (e) => {
  if (!pristine.validate()) {
    e.preventDefault();
  }
});
