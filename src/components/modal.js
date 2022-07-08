// работа модальных окон

import { resetFormErrors } from './validate.js' ;
import { renderCard } from './card.js' ;

//элементы popup
const popupUserInfo=document.querySelector('.popup_type_edit-profile');
export const formUserInfo=popupUserInfo.querySelector('[name="form"]');
const nameInput = formUserInfo.querySelector('.form__input_type_name');
const jobInput = formUserInfo.querySelector('.form__input_type_profession');

const popupAddImage=document.querySelector('.popup_type_add-image');
export const formAddImage=popupAddImage.querySelector('[name="form-add-image"]');
const imageNameInput = formAddImage.querySelector('.form__input_type_image-name');
const imageLinkInput = formAddImage.querySelector('.form__input_type_image-link');

const popupImage=document.querySelector('.popup_type_view-image');
const popupImageImg=popupImage.querySelector('.image-popup__image');
const popupImageDescription=popupImage.querySelector('.image-popup__description');
//элементы информации профиля
const profileName=document.querySelector('.profile__name');
const profileProfession=document.querySelector('.profile__profession');
const profileImg=document.querySelector('.profile__avatar');

import {getCardsJson, getUserInfo, setProfileInfo, addImage} from './utils.js' ;

export function openPopUpEditProfile(evt)
{   
    getUserInfo()
    .then(res => res.json())
    .then(result => {
        nameInput.value=result.name;
        jobInput.value=result.about;
        setPopUpOpened(popupUserInfo);
    });
}

export function openPopUpAddImage(evt)
{ 
    imageNameInput.value='';
    imageLinkInput.value='';
    setPopUpOpened(popupAddImage);
}

export function openPopUpViewImage(imageName, imageLink)
{ 
    popupImageImg.src=imageLink;
    popupImageImg.alt=imageName;
    popupImageDescription.textContent=imageName;
    setPopUpOpened(popupImage);
}

function setPopUpOpened(popup)
{
    popup.classList.add('popup_opened');
}

export function closePopUp(evt)
{ 
    const closedPopUp=evt.target.closest('.popup');
    setPopUpClosed( closedPopUp); 
    resetFormErrors( closedPopUp)  ; 
}



function setPopUpClosed(popup)
{
    popup.classList.remove('popup_opened'); 
}


export function formSubmitHandler (evt) {
    evt.preventDefault(); 
    setProfileInfo(nameInput.value, jobInput.value)
    .then(res => res.json())
    .then(result => {
        initProfile(result);
        closePopUp(evt);
    });
}


export function formImageSubmitHandler (evt) {
    evt.preventDefault(); 
    addImage(imageNameInput.value, imageLinkInput.value)
    .then(res => res.json())
    .then(result => {
        renderImage(result);
        closePopUp(evt);
    });
}

export function initProfile(profileObj)
{
    profileName.textContent=profileObj.name;
    profileProfession.textContent=profileObj.about;  
    profileImg.src=profileObj.avatar;
}

function renderImage(imajeObj)
{
    renderCard(imajeObj.name, imajeObj.link, imajeObj.likes.length);
}
