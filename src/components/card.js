// функции для работы с карточками проекта

import { openPopUpViewImage } from './modal.js' ;

// галлерея
const imageTemplate = document.querySelector('#photo-grid__item').content;
const photoGrid = document.querySelector('.photo-grid');



export function initGallary(cardsObj)
{
  cardsObj.forEach((item)=>{  renderCard(item.name, item.link, item.likes);});
}


export function renderCard(imageName, imageLink, likesArr)
{
    photoGrid.prepend(createCard(imageName, imageLink, likesArr));
}

function createCard(imageName, imageLink, likesArr)
{
    const imageElement = imageTemplate.querySelector('.photo-grid__item').cloneNode(true); 
    const img= imageElement.querySelector('.photo-grid__image');
    const likes= imageElement.querySelector('.photo-grid__likes-count');
    img.src = imageLink;    
    img.alt= imageName;
    likes.textContent=likesArr.length;
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

