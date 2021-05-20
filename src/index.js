import './sass/main.scss';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { fetchByInput } from './api-service.js';
import cardTpl from './templates/cardTpl.hbs';
import * as basicLightbox from 'basiclightbox';

const galleryRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more-btn');

searchFormRef.addEventListener('submit', getImages);
loadMoreBtnRef.addEventListener('click', getMoreImages);

let inputValue = null;
let pageNumber = 1;
function getImages(event) {
  event.preventDefault();
  loadMoreBtnRef.classList.add('hidden');
  clearGallery();

  console.log('hufyuh');

  inputValue = event.currentTarget.elements.query.value;

  if (!inputValue) return;

  pageNumber = 1;
  fetchByInput(inputValue, pageNumber).then(({ hits }) => {
    if (hits.length > 0) {
      addCardsMarkup(hits);
      loadMoreBtnRef.classList.remove('hidden');
    } else {
      alert({
        text: 'No images found. Try another search word!',
      });
    }
  });
}

function clearGallery() {
  galleryRef.innerHTML = '';
}

function addCardsMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function getMoreImages(event) {
  pageNumber += 1;
  fetchByInput(inputValue, pageNumber).then(({ hits }) => {
    addCardsMarkup(hits);
    scroll();
  });
}

function scroll() {
  const pageHeight = document.documentElement.scrollHeight;
  console.log(pageHeight);
  setTimeout(() => {
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth',
    });
  }, 500);
}
