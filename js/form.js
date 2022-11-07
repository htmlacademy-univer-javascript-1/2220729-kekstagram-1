import {isEscapeKey} from './util.js';

const TAG_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/i;
const MAX_TAGS_NUMBER = 5;

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
  if (value !== '') {
    const hashTagsArray = value.toLowerCase().split(' ');
    const hashTagsSet = new Set(hashTagsArray);

    if (hashTagsSet.size !== hashTagsArray.length) {
      return false;
    }
  }
  return true;
}, 'Хештеги регистронезависимы и не должны повторяться');

pristine.addValidator(textHashtags, (value) => {
  if (value !== '') {
    const hashTagsArray = value.toLowerCase().split(' ');

    if (hashTagsArray.length > MAX_TAGS_NUMBER) {
      return false;
    }
  }
  return true;
}, `Максимальное число хештегов - ${MAX_TAGS_NUMBER}`);

pristine.addValidator(textHashtags, (value) => {
  if (value === '') {
    return true;
  }

  const hashTagsArray = value.toLowerCase().split(' ');
  return hashTagsArray.every((hashtag) => TAG_REGEX.test(hashtag));
}, 'Один из введённых вами хештегов некорректен');

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
