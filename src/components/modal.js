// работа модальных окон

import { resetFormErrors, setButtonState, defaultValidationClasses } from './validate.js' ;
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



export function openPopUpEditProfile(evt)
{   
    setFormInitialState(popupUserInfo);
    nameInput.value=profileName.textContent;
    jobInput.value=profileProfession.textContent;    
    setPopUpOpenState(popupUserInfo);
}

export function openPopUpAddImage(evt)
{ 
    setFormInitialState(popupAddImage);
    setPopUpOpenState(popupAddImage);
}

export function openPopUpViewImage(imageName, imageLink)
{ 
    popupImageImg.src=imageLink;
    popupImageImg.alt=imageName;
    popupImageDescription.textContent=imageName;
    setPopUpOpenState(popupImage);
}

function setFormInitialState(popup)
{
    resetForm(popup);
    resetFormErrors( popup,  defaultValidationClasses); 
    setButtonState(popup,  defaultValidationClasses); 
}

function setPopUpOpenState(popup)
{
    setPopUpOpened(popup);
    document.addEventListener('keydown', closeByEscape); 
}

function setPopUpOpened(popup)
{
    popup.classList.add('popup_opened');
}

export function closePopUp(popup)
{ 
    setPopUpCloseState( popup);     
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      setPopUpCloseState(openedPopup);
    }
  }

function resetForm(popup)
{
    popup.querySelector('.form').reset();
}

function setPopUpCloseState(popup)
{
    setPopUpClosed(popup);
    document.removeEventListener('keydown', closeByEscape);   
}

function setPopUpClosed(popup)
{
    popup.classList.remove('popup_opened'); 
}


export function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent=nameInput.value;
    profileProfession.textContent=jobInput.value;  
    closePopUp(evt.target.closest('.popup'));
}


export function handleImageFormSubmit (evt) {
    evt.preventDefault(); 
    renderCard(imageNameInput.value, imageLinkInput.value);
    closePopUp(evt.target.closest('.popup'));
}