//элементы popup
const popupUserInfo=document.querySelector('.popup_type_edit-profile');
const formUserInfo=popupUserInfo.querySelector('[name="form-user-info"]');
const nameInput = formUserInfo.querySelector('.form-user-info__input_type_name');
const jobInput = formUserInfo.querySelector('.form-user-info__input_type_profession');

const popupAddImage=document.querySelector('.popup_type_add-image');
const formAddImage=popupAddImage.querySelector('[name="form-add-image"]');
const imageNameInput = formAddImage.querySelector('.form-user-info__input_type_image-name');
const imageLinkInput = formAddImage.querySelector('.form-user-info__input_type_image-link');

const popupImage=document.querySelector('.popup_type_view-image');
const popupImageImg=popupImage.querySelector('.image-popup__image');
const popupImageDescription=popupImage.querySelector('.image-popup__description');
//элементы информации профиля
const profileName=document.querySelector('.profile__name');
const profileProfession=document.querySelector('.profile__profession');
// галлерея
const imageTemplate = document.querySelector('#photo-grid__item').content;
const photoGrid = document.querySelector('.photo-grid');

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


document.querySelector('.profile__edit-button').addEventListener('click', openPopUpEditProfile); 
document.querySelector('.profile__add-button').addEventListener('click', openPopUpAddImage); 
Array.from(document.querySelectorAll('.popup__close')).forEach((item)=>{item.addEventListener('click', closePopUp)}); 
formUserInfo.addEventListener('submit', formSubmitHandler);
formAddImage.addEventListener('submit', formImageSubmitHandler);


initGallary();

function openPopUpEditProfile(evt)
{   
    nameInput.value=profileName.textContent;
    jobInput.value=profileProfession.textContent;
    setPopUpOpened(popupUserInfo);
}

function openPopUpAddImage(evt)
{ 
    setPopUpOpened(popupAddImage);
}

function openPopUpViewImage(imageName, imageLink)
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

function closePopUp(evt)
{
    setPopUpClosed(evt.target.closest('.popup')); 
}

function setPopUpClosed(popup)
{
    popup.classList.remove('popup_opened'); 
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent=nameInput.value;
    profileProfession.textContent=jobInput.value;  
    closePopUp(evt);
}

function initGallary()
{
    initialCards.forEach((item)=>{  renderCard(item.name, item.link);});
}

function formImageSubmitHandler (evt) {
    evt.preventDefault(); 
    renderCard(imageNameInput.value, imageLinkInput.value);
    closePopUp(evt);
}

function renderCard(imageName, imageLink)
{
    photoGrid.prepend(createCard(imageName, imageLink));
}

function createCard(imageName, imageLink)
{
    const imageElement = imageTemplate.querySelector('.photo-grid__item').cloneNode(true); 
    const img= imageElement.querySelector('.photo-grid__image');
    img.src = imageLink;    
    img.alt= imageName;
    imageElement.querySelector('.photo-grid__text').textContent = imageName;
    imageElement.querySelector('.photo-grid__like').addEventListener('click', clickLikeHandler);
    imageElement.querySelector('.photo-grid__trash').addEventListener('click', clickTrashHandler);
    img.addEventListener('click', () => openPopUpViewImage(imageName,  imageLink));
    return imageElement;
}

function clickTrashHandler(evt)
{
    evt.target.closest('.photo-grid__item').remove();
}

function clickLikeHandler(evt)
{
    evt.target.classList.toggle('photo-grid__like_active');
}


