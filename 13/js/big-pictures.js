import {isEscapeKey} from './util.js';

const MAX_COMMENT_NUMBER = 5;

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
const commentTemplate = document.querySelector('#comment').content;
const documentFragment = document.createDocumentFragment();

const closeModal = (e) => {
  if (isEscapeKey(e) || e.type === 'click') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeModal);
    bigPictureCancel.removeEventListener('click', closeModal);
  }
};

const drawComments = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    const commentNode = commentTemplate.cloneNode(true);
    commentNode.querySelector('.social__picture').src = comment.avatar;
    commentNode.querySelector('.social__picture').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;
    documentFragment.append(commentNode);
  });

  socialComments.append(documentFragment);
};

const showCommentsCount = (image, commentsNumber) => {
  drawComments(image.comments.slice(0, commentsNumber));
  socialCommentCount.innerHTML = `${commentsNumber > commentsCount.textContent ? commentsCount.textContent : commentsNumber} из `;
  socialCommentCount.append(commentsCount);
  socialCommentCount.innerHTML += ' комментариев';
  if (commentsNumber > commentsCount.textContent) {
    commentsLoader.classList.add('hidden');
  }
};

const openModal = (image) => {
  let commentsNumber = MAX_COMMENT_NUMBER;
  bigPictureImg.src = image.url;
  bigPictureImg.alt = image.description;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments.length;
  socialCaption.textContent = image.description;

  commentsLoader.classList.remove('hidden');
  showCommentsCount(image, commentsNumber);

  // TODO: переделать так, чтобы здесь не плодились обработчики
  commentsLoader.addEventListener('click', () => {
    commentsNumber += MAX_COMMENT_NUMBER;
    showCommentsCount(image, commentsNumber);
  });

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeModal);
  bigPictureCancel.addEventListener('click', closeModal);
};

const thumbnailClickHandler = (data) => {
  pictures.addEventListener('click', (e) => {
    const picture = e.target.closest('.picture');

    if (picture) {
      openModal(data.find((photo) => photo.id === Number(picture.dataset.index)));
    }
  });
};

export {thumbnailClickHandler, closeModal};
