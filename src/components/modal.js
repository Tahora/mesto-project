// работа модальных окон

import { resetFormErrors, setButtonState, defaultValidationClasses } from './validate.js' ;
import { renderCard } from './card.js' ;
import { getUserInfo, setProfileInfo, addImage, updateAvatar} from './api.js' ;
import { handleError } from './utils.js' ;


//элементы popup
const popupUserInfo=document.querySelector('.popup_type_edit-profile');
export const formUserInfo=popupUserInfo.querySelector('[name="form"]');
const nameInput = formUserInfo.querySelector('.form__input_type_name');
const jobInput = formUserInfo.querySelector('.form__input_type_profession');

const popupAddImage=document.querySelector('.popup_type_add-image');
export const formAddImage=popupAddImage.querySelector('[name="form-add-image"]');
const imageNameInput = formAddImage.querySelector('.form__input_type_image-name');
const imageLinkInput = formAddImage.querySelector('.form__input_type_image-link');

const popupUpdateAvatar=document.querySelector('.popup_type_update-avatar');
export const formUpdateAvatar=popupUpdateAvatar.querySelector('[name="form-update-avatar"]');
const avatarLinkInput = formUpdateAvatar.querySelector('.form__input_type_avatar-link');

const popupImage=document.querySelector('.popup_type_view-image');
const popupImageImg=popupImage.querySelector('.image-popup__image');
const popupImageDescription=popupImage.querySelector('.image-popup__description');
//элементы информации профиля
const profileName=document.querySelector('.profile__name');
const profileProfession=document.querySelector('.profile__profession');
const profileImg=document.querySelector('.profile__avatar');



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

function resetButtonSbmitValue(buttonElement)
{
    buttonElement.value="Сохранить";
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
    const buttonSubmit=evt.target.querySelector('.form__submit');
    showSubmitInProgress(buttonSubmit);
    setProfileInfo(nameInput.value, jobInput.value)
    .then(result => {
        initProfileInfo(result);
        closePopUp(evt.target.closest('.popup'));
    })
    .finally(resetButtonSbmitValue(buttonSubmit));
}


export function handleImageFormSubmit (evt) {
    evt.preventDefault(); 
    const buttonSubmit=evt.target.querySelector('.form__submit');
    showSubmitInProgress(buttonSubmit);
    addImage(imageNameInput.value, imageLinkInput.value)
    .then(result => {
        renderImage(result);
        closePopUp(evt.target.closest('.popup'));
    })
    .catch((err)=>handleError(err))
    .finally(resetButtonSbmitValue(buttonSubmit));
}

export function initProfile(profileObj)
{
    initProfileInfo(profileObj);  
    initProfileAvatar(profileObj);
}

function initProfileAvatar(profileObj)
{
    profileImg.src=profileObj.avatar; 
    profileImg.alt=profileObj.name;
}

function initProfileInfo(profileObj)
{
    profileName.textContent=profileObj.name;
    profileProfession.textContent=profileObj.about;  
}

function renderImage(imajeObj)
{
    renderCard(imajeObj.name, imajeObj.link, imajeObj.likes, imajeObj.owner._id,  imajeObj._id);
}

export function openPopUpUpdateAvatar(evt)
{ 
    setFormInitialState(popupUpdateAvatar);
    setPopUpOpenState(popupUpdateAvatar);
}

export function handleAvatarFormSubmit(evt) {
    evt.preventDefault(); 
    const buttonSubmit=evt.target.querySelector('.form__submit');
    showSubmitInProgress(buttonSubmit);
    updateAvatar(avatarLinkInput.value)
    .then(result => {
        profileImg.src=result.avatar; 
        profileImg.alt=result.name;
        closePopUp(evt.target.closest('.popup'));
    })
    .catch((err)=>handleError(err))
    .finally(resetButtonSbmitValue(buttonSubmit));
}

function showSubmitInProgress(buttonSubmit)
{
    buttonSubmit.value="Сохранение...";
}