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
         handleProfileFormSubmit, 
         handleImageFormSubmit,
         formUserInfo,
         formAddImage} from './modal.js' ;
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
import { renderCard } from './card.js' ;

function initGallary()
{
    initialCards.forEach((item)=>{  renderCard(item.name, item.link);});
}
initGallary();


/* валидация */
import { defaultValidationClasses, enableValidation } from './validate.js' ;
enableValidation(defaultValidationClasses);

