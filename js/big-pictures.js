import {isEscapeKey} from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const onModalEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

const openModal = (e, data) => {
  const picture = e.target.closest('.picture');

  if (picture) {
    const image = data[picture.dataset.index];

    bigPicture.classList.remove('hidden');
    bigPictureImg.src = image.url;
    bigPictureImg.alt = image.description;
    likesCount.textContent = image.likes;
    commentsCount.textContent = image.comments.length;
    socialComments.innerHTML = '';
    image.comments.forEach((comment) => {
      socialComments.insertAdjacentHTML('beforeend', `
          <li class="social__comment">
            <img
                class="social__picture"
                src="${comment.avatar}"
                alt="${comment.name}"
                width="35" height="35">
            <p class="social__text">${comment.message}</p>
          </li>
        `);
    });
    socialCaption.textContent = image.description;
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onModalEscKeydown);
  }
};

const thumbnailClickHandler = (data) => {
  pictures.addEventListener('click', (e) => openModal(e, data));
  bigPictureCancel.addEventListener('click', closeModal);
};

export {thumbnailClickHandler};
