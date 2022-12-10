import './util.js';
// import {createImages} from './data.js';
import {createThumbnails} from './thumbnails.js';
import {setUserFormSubmit, closeUploadFileForm} from './form.js';
import {getData} from './api.js';
import './big-pictures.js';
import {showError, showSuccess} from './alerts.js';
// import {showAlert} from './util';

// createThumbnails(createImages());
getData(createThumbnails);

setUserFormSubmit(() => {
  closeUploadFileForm();
  showSuccess();
}, () => {
  closeUploadFileForm(null, false);
  showError();
});
// showSuccess();
// createThumbnails();
