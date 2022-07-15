// инициализация JS-кода, добавление слушателей и др.

import '../styles/index.css';
import { defaultValidationClasses, enableValidation } from './validate.js' ;
import { renderCard} from './card.js' ;
import {getCardsJson, getUserInfo} from './api.js' ;
import { handleError } from './utils.js' ;

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

function initGallary(cardsObj)
{
    // let t=JSON.stringify(cardsObj.map((i)=>{return {url:i.link,  name:i.name, id:i._id, avatar: i.owner.avatar,  ownerName: i.owner.name , ownerAbout:i.owner.about , ownerId:i.owner._id}}));
    //console.log(t.replaceAll('","name"','"><br>"name"').replaceAll('","ownerName"','"><br>"ownerName"').replaceAll('"url":','<img width="200px" src=').replaceAll('"avatar":','<br><img width="70px" src=').replaceAll('},{','<br><br><br><br>').replaceAll('"name":','').replaceAll(',','  ').replaceAll('{','').replaceAll('[','').replaceAll('}','').replaceAll(']','')    );
    cardsObj.forEach((item)=>{  renderCard(item.name, item.link, item.likes, item.owner._id,  item._id);});
}

export let currentUserId;
const cardsPromise=getCardsJson();
const userInfoPromise=getUserInfo();
const promises = [cardsPromise, userInfoPromise];
Promise.all(promises) 
.then(([result0, result1]) => {
  currentUserId=result1._id;
  initProfile(result1);
  initGallary(result0.reverse(), result1);
})
.catch((err)=>handleError(err));


/* валидация */

enableValidation(defaultValidationClasses);

