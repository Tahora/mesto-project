// инициализация JS-кода, добавление слушателей и др.

import '../styles/index.css';



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];


import { openPopUpEditProfile,  
         openPopUpAddImage, 
         closePopUp, 
         formSubmitHandler, 
         formImageSubmitHandler,
         formUserInfo,
         formAddImage} from './modal.js' ;
document.querySelector('.profile__edit-button').addEventListener('click', openPopUpEditProfile); 
document.querySelector('.profile__add-button').addEventListener('click', openPopUpAddImage); 
Array.from(document.querySelectorAll('.popup__close')).forEach((item)=>{item.addEventListener('click', closePopUp);}); 
Array.from(document.querySelectorAll('.popup')).forEach((item)=>
  {  
     item.addEventListener('click',  
       function(evt) {
        if (evt.target === item) {  closePopUp(evt); } });
    item.addEventListener('keydown', 
       function(evt) {
          if (evt.key === "Escape") {  closePopUp(evt); } });
  }); 
formUserInfo.addEventListener('submit', formSubmitHandler);
formAddImage.addEventListener('submit', formImageSubmitHandler);




/* галлерея */
import { renderCard } from './card.js' ;

function initGallary()
{
    initialCards.forEach((item)=>{  renderCard(item.name, item.link);});
}
initGallary();


/* валидация */
import { defaultValidationClasses, enableValidation } from './validate.js' ;
let p=defaultValidationClasses; //тут можно изменить дефолтные классы для валидации
enableValidation(p);

