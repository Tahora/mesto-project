// функции для работы с карточками проекта

import { openPopUpViewImage } from './modal.js' ;
import { deleteImage, likeImage ,dislikeImage } from './api.js' ;
import {getFetchResult } from './utils.js' ;

// галлерея
const imageTemplate = document.querySelector('#photo-grid__item').content;
const photoGrid = document.querySelector('.photo-grid');



export function initGallary(cardsObj)
{
    // let t=JSON.stringify(cardsObj.map((i)=>{return {url:i.link,  name:i.name, id:i._id, avatar: i.owner.avatar,  ownerName: i.owner.name , ownerAbout:i.owner.about , ownerId:i.owner._id}}));
    //console.log(t.replaceAll('","name"','"><br>"name"').replaceAll('","ownerName"','"><br>"ownerName"').replaceAll('"url":','<img width="200px" src=').replaceAll('"avatar":','<br><img width="70px" src=').replaceAll('},{','<br><br><br><br>').replaceAll('"name":','').replaceAll(',','  ').replaceAll('{','').replaceAll('[','').replaceAll('}','').replaceAll(']','')    );
    cardsObj.forEach((item)=>{  renderCard(item.name, item.link, item.likes, item.owner._id,  item._id);});
}


export function renderCard(imageName, imageLink, likesArr, ownerId,  imgId)
{
    photoGrid.prepend(createCard(imageName, imageLink, likesArr,ownerId,  imgId));
}

function createCard(imageName, imageLink, likesArr,ownerId, imgId)
{
    const imageElement = imageTemplate.querySelector('.photo-grid__item').cloneNode(true); 
    const img= imageElement.querySelector('.photo-grid__image');
    const likes= imageElement.querySelector('.photo-grid__likes-count');
    const like=imageElement.querySelector('.photo-grid__like');
    img.src = imageLink;    
    img.alt= imageName;
    imageElement.querySelector('.photo-grid__text').textContent = imageName;
    imageElement.imgId=imgId;
    setLikesState(likesArr, likes, like);
    like.addEventListener('click', clickLikeHandler);
    if(ownerId!=document.currentUserId)
    {
        imageElement.querySelector('.photo-grid__trash').remove();
    }
    else
    {
        imageElement.querySelector('.photo-grid__trash').addEventListener('click', clickTrashHandler);
    }    
    img.addEventListener('click', () => openPopUpViewImage(imageName,  imageLink));
    return imageElement;
}

function clickTrashHandler(evt)
{
    const imgItem=evt.target.closest('.photo-grid__item');
    deleteImage(imgItem.imgId)
    .then(    (res) => { 
        if (res.ok){imgItem.remove(); return;}
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function isLikedMe(likesArray)
{    
    return (likesArray.length>0) && (likesArray.find((item=>{return item._id===document.currentUserId}))!== undefined );
}

function setLikesState(likesArray, likesCountElement, likeElement)
{
    likeElement.isLikedMe=isLikedMe(likesArray);
    likesCountElement.textContent=likesArray.length;
    if(likeElement.isLikedMe) 
    {likeElement.classList.add('photo-grid__like_active');}
    else
    {likeElement.classList.remove('photo-grid__like_active');}
}

function refreshLikes( likeElement, likesArray)
{   
    const likesCountElement=likeElement.closest('.photo-grid__item').querySelector('.photo-grid__likes-count');
    setLikesState(likesArray, likesCountElement, likeElement);
}

function clickLikeHandler(evt)
{
    const imgId=evt.target.closest('.photo-grid__item').imgId;
    if(evt.target.isLikedMe)
    {
        dislikeImage(imgId)
        .then(    res => getFetchResult(res))
        .then((result)=>refreshLikes( evt.target, result.likes));
    }
    else
    {
        likeImage(imgId)
        .then(   res => getFetchResult(res))
            .then((result)=>refreshLikes( evt.target, result.likes));

    }

}

