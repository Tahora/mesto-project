// инициализация JS-кода, добавление слушателей и др.

import '../styles/index.css';

import { openPopUpEditProfile,  
         openPopUpAddImage, 
         closePopUp, 
         handleProfileFormSubmit, 
         handleImageFormSubmit,
         handleAvatarFormSubmit,
         formUserInfo,
         formAddImage,
         formUpdateAvatar,
         initProfile,
         openPopUpUpdateAvatar} from './modal.js' ;
document.querySelector('.profile__edit-button').addEventListener('click', openPopUpEditProfile); 
document.querySelector('.profile__add-button').addEventListener('click', openPopUpAddImage); 
document.querySelector('.profile__avatar-wrapper').addEventListener('click', openPopUpUpdateAvatar); 
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopUp(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopUp(popup)
        }
    })
});


formUserInfo.addEventListener('submit', handleProfileFormSubmit);
formAddImage.addEventListener('submit', handleImageFormSubmit);
formUpdateAvatar.addEventListener('submit', handleAvatarFormSubmit);




/* галлерея */
import { initGallary} from './card.js' ;
import {getCardsJson, getUserInfo} from './api.js' ;

const cardsPromise=getCardsJson();
const userInfoPromise=getUserInfo();
const promises = [cardsPromise, userInfoPromise];
Promise.all(promises) 
.then((res) =>{
  if (res[0].ok && res[1].ok) {return Promise.all([res[0].json(),res[1].json()]);}
  return Promise.reject(`Ошибка: cardsPromise ${res[0].status}, userInfoPromise ${res[1].status}`);
})
.then(([result0, result1]) => {
  document.currentUserId=result1._id;
  initProfile(result1);
  initGallary(result0, result1);
})
.catch((err) => {   
  console.log(err); 
});


/* валидация */
import { defaultValidationClasses, enableValidation } from './validate.js' ;
enableValidation(defaultValidationClasses);

