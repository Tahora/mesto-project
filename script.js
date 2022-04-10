//элементы popup
const formUserInfo=document.querySelector('[name="form-user-info"]');
const popupUserInfo=formUserInfo.closest('.popup');
const nameInput = formUserInfo.querySelector('.form-user-info__input_type_name');
const jobInput = formUserInfo.querySelector('.form-user-info__input_type_profession');

const formAddImage=document.querySelector('[name="form-add-image"]');
const popupAddImage=formAddImage.closest('.popup');
const imageNameInput = formAddImage.querySelector('.form-user-info__input_type_image-name');
const imageLinkInput = formAddImage.querySelector('.form-user-info__input_type_image-link');

const popupImage=document.querySelector('.popup__container_image').closest('.popup');
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


document.querySelector('.profile__edit-button').addEventListener('click', openPopUp); 
document.querySelector('.profile__add-button').addEventListener('click', openPopUp); 
Array.from(document.querySelectorAll('.popup__close')).forEach((item)=>{item.addEventListener('click', closePopUp)}); 
formUserInfo.addEventListener('submit', formSubmitHandler);
formAddImage.addEventListener('submit', formImageSubmitHandler);

ClearGallary();
InitGallary();

function openPopUp(evt)
{   
    if(evt.target.classList.contains('profile__edit-button'))
    {
        nameInput.value=profileName.textContent;
        jobInput.value=profileProfession.textContent;
        SetPopUpOpened(popupUserInfo);
    }
    else if(evt.target.classList.contains('profile__add-button'))
    {
        SetPopUpOpened(popupAddImage);
    }
    else if(evt.target.classList.contains('photo-grid__image'))
    {
        popupImageImg.src=evt.target.src;
        popupImageDescription.textContent=evt.target.parentElement.querySelector('.photo-grid__text').textContent;
        SetPopUpOpened(popupImage);
    }
}

function SetPopUpOpened(popup)
{
    popup.classList.add('popup_opened');
}

function closePopUp(evt)
{
    evt.target.closest('.popup').classList.remove('popup_opened'); 
  
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent=nameInput.value;
    profileProfession.textContent=jobInput.value;  
    closePopUp(evt);
}

function InitGallary()
{
    initialCards.forEach((item)=>{ AddImage(item.name, item.link);});
}

function formImageSubmitHandler (evt) {
    evt.preventDefault(); 
    AddImage(imageNameInput.value, imageLinkInput.value);
    closePopUp(evt);
}

function AddImage(imageName, imageLink)
{
    const imageElement = imageTemplate.querySelector('.photo-grid__item').cloneNode(true); 
    let img= imageElement.querySelector('.photo-grid__image');
    img.src = imageLink;     
    imageElement.querySelector('.photo-grid__text').textContent = imageName;
    imageElement.querySelector('.photo-grid__like').addEventListener('click', clickLikeHandler);
    imageElement.querySelector('.photo-grid__trash').addEventListener('click', clickTrashHandler);
    img.addEventListener('click', openPopUp);
    photoGrid.prepend(imageElement);
}

function clickTrashHandler(evt)
{
    evt.target.closest('.photo-grid__item').remove();
}

function clickLikeHandler(evt)
{
    evt.target.classList.toggle('photo-grid__like_active');
}

function ClearGallary()
{
    Array.from(photoGrid.children).forEach((item)=>{
        item.remove();
    })
}
  
