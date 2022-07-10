// инициализация JS-кода, добавление слушателей и др.

import '../styles/index.css';

import { openPopUpEditProfile,  
         openPopUpAddImage, 
         closePopUp, 
         handleProfileFormSubmit, 
         handleImageFormSubmit,
         formUserInfo,
         formAddImage,
         initProfile} from './modal.js' ;
document.querySelector('.profile__edit-button').addEventListener('click', openPopUpEditProfile); 
document.querySelector('.profile__add-button').addEventListener('click', openPopUpAddImage); 
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
enableValidation(defaultValidationClasses);

