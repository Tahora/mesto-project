// функциональность валидации форм
export const defaultValidationClasses={
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_state_error',
    errorClass: 'form__input-error_active'
}



function showInputError(formElement, inputElement, errorMessage, validationClasses)
{      // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationClasses.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationClasses.errorClass);
}
          

function hideInputError (formElement, inputElement, validationClasses)
{
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationClasses.inputErrorClass);
    errorElement.classList.remove(validationClasses.errorClass);
}



function isValid  (formElement, inputElement, validationClasses) 
{  if (!inputElement.validity.valid) 
   {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationClasses); 
   } 
    else 
   {
    hideInputError(formElement, inputElement, validationClasses);
   } 
 }


function setEventListeners(formElement, validationClasses) 
{
    const inputList = Array.from(formElement.querySelectorAll(validationClasses.inputSelector));
    const buttonElement = formElement.querySelector(validationClasses.submitButtonSelector); 
   // toggleButtonState(inputList, buttonElement); // заблокируем кнопку с самого начала
    // Обойдём все элементы полученной коллекции
    inputList.forEach( (inputElement) =>
       {    // каждому полю добавим обработчик события input
             inputElement.addEventListener('input',   () =>
                           {   isValid(formElement, inputElement, validationClasses) ;
                               toggleButtonState(inputList, buttonElement, validationClasses);
                           });
        });    
}

export function  enableValidation(validationClasses)
{
  const formList = Array.from(document.querySelectorAll(validationClasses.formSelector)); 
  formList.forEach(   (formElement) =>
  {   formElement.addEventListener('submit', (evt) =>{evt.preventDefault(); }); 
      setEventListeners(formElement, validationClasses);
  });
} 

 function hasInvalidInput(inputList)
 {
    return inputList.some((inputElement) =>{return !inputElement.validity.valid;}) 
 }


export function setButtonState(popupElement, validationClasses) 
{
    const inputList = Array.from(popupElement.querySelectorAll(validationClasses.inputSelector));
    const buttonElement = popupElement.querySelector(validationClasses.submitButtonSelector); 
    toggleButtonState(inputList, buttonElement, validationClasses);
}

function toggleButtonState(inputList, buttonElement, validationClasses)
{      
   if (hasInvalidInput(inputList)) //есть хотя бы один невалидный инпут
   {  
       buttonElement.classList.add(validationClasses.inactiveButtonClass); 
       buttonElement.disabled = true;
   }
   else
   {
       buttonElement.classList.remove(validationClasses.inactiveButtonClass); 
       buttonElement.disabled = false;
    } 
}



export function resetFormErrors(popUpElement, validationClasses)
{
    const formElement=popUpElement.querySelector( validationClasses.formSelector);
    const inputItems = Array.from(formElement.querySelectorAll(validationClasses.inputSelector));
    inputItems.forEach(   (inputItem) =>
    {   
         hideInputError(formElement, inputItem, validationClasses);
    });
    
}