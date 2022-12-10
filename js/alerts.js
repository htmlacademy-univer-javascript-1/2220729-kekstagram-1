import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const showSuccess = () => {
  const success = successTemplate.cloneNode(true);

  const closeModal = (e) => {
    if (isEscapeKey(e)) {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.success').remove();
    } else if (e.type === 'click') {
      const successInner = e.target.closest('.success__inner');
      const successButton = e.target.closest('.success__button');

      if ((successInner && successButton) || (!successInner && !successButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.success').remove();
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(success);
};

const showError = () => {
  const error = errorTemplate.cloneNode(true);

  const closeModal = (e) => {
    if (isEscapeKey(e)) {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.error').remove();
    } else if (e.type === 'click') {
      const errorInner = e.target.closest('.error__inner');
      const errorButton = e.target.closest('.error__button');

      if ((errorInner && errorButton) || (!errorInner && !errorButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.error').remove();
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(error);
};

export {
  showSuccess,
  showError
};
