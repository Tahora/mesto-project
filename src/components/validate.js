// функциональность валидации форм
export const defaultValidationClasses={
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_state_error',
    errorClass: 'form__input-error_active'
}

//переменная с текущими заданными классами, используемыми для валидации
// по умолчанию содержит дефолтные классы
let _validationClasses= defaultValidationClasses;

function showInputError(formElement, inputElement, errorMessage) 
           {      // Находим элемент ошибки внутри самой функции
                   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
                   // Остальной код такой же
                    inputElement.classList.add(_validationClasses.inputErrorClass);
                    errorElement.textContent = errorMessage;
                    errorElement.classList.add(_validationClasses.errorClass);
            }
          

function hideInputError (formElement, inputElement)
            {
                    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
                    inputElement.classList.remove(_validationClasses.inputErrorClass);
                    errorElement.classList.remove(_validationClasses.errorClass);
                    errorElement.textContent = ''; 
                }



function isValid  (formElement, inputElement) 
{  if (!inputElement.validity.valid) 
   {
    showInputError(formElement, inputElement, inputElement.validationMessage); 
   } 
    else 
   {
    hideInputError(formElement, inputElement);
   } 
 }


function setEventListeners(formElement) 
{
    const inputList = Array.from(formElement.querySelectorAll(_validationClasses.inputSelector));
    const buttonElement = formElement.querySelector(_validationClasses.submitButtonSelector); 
    toggleButtonState(inputList, buttonElement); // заблокируем кнопку с самого начала
    // Обойдём все элементы полученной коллекции
    inputList.forEach( (inputElement) =>
       {    // каждому полю добавим обработчик события input
             inputElement.addEventListener('input',   () =>
                           {   isValid(formElement, inputElement) ;
                               toggleButtonState(inputList, buttonElement);
                           });
        });    
}

export function  enableValidation(validationClasses)
{
  _validationClasses = validationClasses;
  const formList = Array.from(document.querySelectorAll(_validationClasses.formSelector)); 
  formList.forEach(   (formElement) =>
  {   formElement.addEventListener('submit', (evt) =>{evt.preventDefault(); }); 
      setEventListeners(formElement);
  });
  const popUpList = Array.from(document.querySelectorAll(_validationClasses.inputSelector));
} 

 function hasInvalidInput(inputList)
 {
    return inputList.some((inputElement) =>{return !inputElement.validity.valid;}) 
 }


 function toggleButtonState(inputList, buttonElement)
{      
   if (hasInvalidInput(inputList)) //есть хотя бы один невалидный инпут
   {  
       buttonElement.classList.add(_validationClasses.inactiveButtonClass); 
   }
   else
   {
       buttonElement.classList.remove(_validationClasses.inactiveButtonClass); 
    } 
}



export function resetFormErrors(popUpElement)
{
    const formElement=popUpElement.querySelector( _validationClasses.formSelector);
    const inputItems = Array.from(formElement.querySelectorAll(_validationClasses.inputSelector));
    inputItems.forEach(   (inputItem) =>
    {   
         hideInputError(formElement, inputItem);
    });
    
}