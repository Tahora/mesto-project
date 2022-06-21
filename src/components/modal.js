// работа модальных окон

import { resetFormErrors } from './validate.js' ;

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



export function openPopUpEditProfile(evt)
{   
    nameInput.value=profileName.textContent;
    jobInput.value=profileProfession.textContent;
    setPopUpOpened(popupUserInfo);
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
    profileName.textContent=nameInput.value;
    profileProfession.textContent=jobInput.value;  
    closePopUp(evt);
}


export function formImageSubmitHandler (evt) {
    evt.preventDefault(); 
    renderCard(imageNameInput.value, imageLinkInput.value);
    closePopUp(evt);
}