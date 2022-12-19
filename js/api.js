const getData = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError('Не удалось загрузить данные с сервера. Попробуйте обновить страницу.');
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onError('Не удалось загрузить данные с сервера. Попробуйте обновить страницу.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз.');
    });
};


export {
  getData,
  sendData
};
