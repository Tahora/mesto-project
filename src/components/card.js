// функции для работы с карточками проекта

import { openPopUpViewImage } from './modal.js' ;

// галлерея
const imageTemplate = document.querySelector('#photo-grid__item').content;
const photoGrid = document.querySelector('.photo-grid');

export function renderCard(imageName, imageLink)
{
    photoGrid.prepend(createCard(imageName, imageLink));
}

function createCard(imageName, imageLink)
{
    const imageElement = imageTemplate.querySelector('.photo-grid__item').cloneNode(true); 
    const img= imageElement.querySelector('.photo-grid__image');
    img.src = imageLink;    
    img.alt= imageName;
    imageElement.querySelector('.photo-grid__text').textContent = imageName;
    imageElement.querySelector('.photo-grid__like').addEventListener('click', clickLikeHandler);
    imageElement.querySelector('.photo-grid__trash').addEventListener('click', clickTrashHandler);
    img.addEventListener('click', () => openPopUpViewImage(imageName,  imageLink));
    return imageElement;
}

function clickTrashHandler(evt)
{
    evt.target.closest('.photo-grid__item').remove();
}

function clickLikeHandler(evt)
{
    evt.target.classList.toggle('photo-grid__like_active');
}