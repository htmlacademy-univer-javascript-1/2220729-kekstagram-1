import {thumbnailClickHandler} from './big-pictures.js';

const template = document.querySelector('#picture').content;
const documentFragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

const createThumbnails = (data) => {
  data.forEach((image, index) => {
    const picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = image.url;
    picture.querySelector('.picture__likes').textContent = image.likes;
    picture.querySelector('.picture__comments').textContent = image.comments.length;
    picture.querySelector('.picture').dataset.index = index;
    documentFragment.append(picture);
  });
  pictures.append(documentFragment);

  thumbnailClickHandler(data);
};

export {createThumbnails};
