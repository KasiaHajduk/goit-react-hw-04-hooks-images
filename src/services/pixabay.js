const KEY = '24803522-b54cf9c0fe000d87c5b473725';

const fetchImages = (name, page) => {
  return fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${name}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};

const api = {
  fetchImages,
};

export default api;
