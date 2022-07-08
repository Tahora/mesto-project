// инициализация JS-кода, добавление слушателей и др.

import '../styles/index.css';

import { openPopUpEditProfile,  
         openPopUpAddImage, 
         closePopUp, 
         formSubmitHandler, 
         formImageSubmitHandler,
         formUserInfo,
         formAddImage,
         initProfile} from './modal.js' ;
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
import { initGallary} from './card.js' ;
import {getCardsJson, getUserInfo} from './utils.js' ;

 getCardsJson()
.then(res => res.json())
.then(result => initGallary(result));



getUserInfo()
.then(res => res.json())
.then(result => initProfile(result));


/* валидация */
import { defaultValidationClasses, enableValidation } from './validate.js' ;
let p=defaultValidationClasses; //тут можно изменить дефолтные классы для валидации
enableValidation(p);

