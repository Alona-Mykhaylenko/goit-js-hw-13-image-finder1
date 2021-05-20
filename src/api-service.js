const URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q';

const fetchByInput = (inputValue, pageNumber) =>
  fetch(
    `${URL}=${inputValue}&page=${pageNumber}&per_page=12&key=21692451-3e70a23032844ea22d5e1eb16`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка!`);
  });

export { fetchByInput };

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
