import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const showSuccess = () => {
  const success = successTemplate.cloneNode(true);

  const removeListeners = (handler) => {
    document.removeEventListener('click', handler);
    document.removeEventListener('keydown', handler);
    document.querySelector('.success').remove();
  };

  const closeModal = (e) => {
    if (isEscapeKey(e)) {
      removeListeners(closeModal);
    } else if (e.type === 'click') {
      const successInner = e.target.closest('.success__inner');
      const successButton = e.target.closest('.success__button');

      if ((successInner && successButton) || (!successInner && !successButton)) {
        removeListeners(closeModal);
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(success);
};

const showError = () => {
  const error = errorTemplate.cloneNode(true);

  const removeListeners = (handler) => {
    document.removeEventListener('click', handler);
    document.removeEventListener('keydown', handler);
    document.querySelector('.error').remove();
  };

  const closeModal = (e) => {
    if (isEscapeKey(e)) {
      removeListeners(closeModal);
    } else if (e.type === 'click') {
      const errorInner = e.target.closest('.error__inner');
      const errorButton = e.target.closest('.error__button');

      if ((errorInner && errorButton) || (!errorInner && !errorButton)) {
        removeListeners(closeModal);
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(error);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  showSuccess,
  showError,
  showAlert
};
