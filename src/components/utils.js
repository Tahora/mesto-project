export function getFetchResult(res)
{
    if (res.ok){return  res.json();}
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function handleError(error)
{
    console.log(error); 
}