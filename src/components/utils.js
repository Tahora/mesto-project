// утилитарные функции, используемые в работе нескольких функций
const serverConnection=
{
    URLs:{
        userInfo:'https://nomoreparties.co/v1/plus-cohort-12/users/me ',
        cards:'https://nomoreparties.co/v1/plus-cohort-12/cards'
    },
    token:'fc8812bc-e13c-4f21-8ead-2be16b19fd54'
};

function getData(url, token)
{
    return fetch(url,
    {headers: {authorization: token}})
}

export function getCardsJson()
{
    return getData(serverConnection.URLs.cards, serverConnection.token)
}

export function getUserInfo()
{
    return getData(serverConnection.URLs.userInfo, serverConnection.token);
}

export function setProfileInfo (userName, userAbout)
{
    return fetch(serverConnection.URLs.userInfo, {
        method: 'PATCH',
        headers: {
            authorization: serverConnection.token,
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: userName,
            about: userAbout})
        }); 
}

export function addImage (imgName, imgLink)
{
    return fetch(serverConnection.URLs.cards, {
        method: 'POST',
        headers: {
            authorization: serverConnection.token,
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: imgName,
            link: imgLink})
        }); 
}

