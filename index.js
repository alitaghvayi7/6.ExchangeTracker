const apiKey = 'https://v6.exchangerate-api.com/v6/fb53a42799ddfaa4e682b923/latest/USD';
const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('#amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('#amount-two');
const swapButton = document.querySelector("#swap");
const loader = document.querySelector('.loader');
const mainContainer = document.querySelector('.main-container');

let swipper;
let isSending = false;

currencyOne.addEventListener('change', currencyChangeHandler);
swapButton.addEventListener('click', swap);
amountOne.addEventListener('change', chnageAmount);


function handlerElements() {
    if(isSending){
        mainContainer.style.display = "none";
        loader.style.display="block";
        return;
    }

    mainContainer.style.display = "flex";
    loader.style.display="none";
    return;
}

async function currencyChangeHandler() {
    const valueOne = currencyOne.value;
    const valueTwo = currencyTwo.value;
    let response = await getCurrnciesFromAPI(valueOne);
    response = response['conversion_rates'];
    amountTwo.value = response[valueTwo];
    swipper = response[valueTwo];
    chnageAmount();
}

async function swap() {
    const valOne = currencyOne.value;
    const amoOne = amountOne.value;
    currencyOne.value = currencyTwo.value;
    amountOne.valueOne = amountTwo.value;
    currencyTwo.value = valOne;
    amountTwo.value = amoOne;
    await currencyChangeHandler();
}

async function getCurrnciesFromAPI(currency) {
    isSending = !isSending;
    handlerElements()
    const result = await fetch(`https://v6.exchangerate-api.com/v6/fb53a42799ddfaa4e682b923/latest/${currency}`);
    const response = await result.json();
    isSending = !isSending;
    handlerElements();
    return response;
}

function chnageAmount() {
    const count = Number(amountOne.value);
    amountTwo.value = count * swipper;
}