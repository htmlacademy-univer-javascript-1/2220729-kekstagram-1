import {debounce} from './util.js';
import {createThumbnails} from './thumbnails.js';
import {setUserFormSubmit, closeUploadFileForm} from './form.js';
import {getData} from './api.js';
import {thumbnailClickHandler} from './big-pictures.js';
import {showError, showSuccess, showAlert} from './alerts.js';
import {setFilter, showFilters, TIMEOUT_DELAY} from './filters.js';

getData((data) => {
  createThumbnails(data);
  showFilters();
  setFilter(debounce((filterData) => createThumbnails(filterData(data)), TIMEOUT_DELAY));
  thumbnailClickHandler(data);
}, (errorMessage) => {
  showAlert(errorMessage);
});

setUserFormSubmit(() => {
  closeUploadFileForm();
  showSuccess();
}, () => {
  closeUploadFileForm(null, false);
  showError();
});
