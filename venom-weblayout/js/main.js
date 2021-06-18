const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");

menuButton.addEventListener("click", () => {
    menu.classList.add("is-open");
    menuButtonClose.classList.add("is-active");
});

menuButtonClose.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButtonClose.classList.remove("is-active");
});


// Отправка формы
const orderTrigger = document.querySelector('.order-trigger');
const hideForm = document.querySelector('.hide-form');
const orderTicket = document.querySelector('.order-ticket');
const orderTicketForm = document.querySelector('.order-ticket__form');

const orderTicketFormWrapper = document.querySelector('.order-ticket__form-wrapper');
const orderTicketPreloaderWrapper = document.querySelector('.order-ticket__preloader-wrapper');
const orderTicketThanksWrapper = document.querySelector('.order-ticket__thanks-wrapper');
const orderTicketThanksName = document.querySelector('.order-ticket__thanks-name');

// Форма появляется через 1 сек после загрузки страницы
setTimeout(() => {
    const heightForm = orderTicket.offsetHeight;

    hideForm.style.bottom = -heightForm + 'px';
}, 1000);

const sendData = (data, callback, callBefore) => {

    if (callBefore) callBefore();

    fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data),
    }).then(response => { // ответ от сервера
        // преобразуем в объект
        return response.json()
    }).then(callback)
}

const showPreloader = () => {
    orderTicketFormWrapper.style.display = 'none';
    orderTicketPreloaderWrapper.style.display = 'block';
}

const showThankYou = (data) => {
     orderTicketFormWrapper.style.display = 'none';
    orderTicketPreloaderWrapper.style.display = 'none';
    orderTicketThanksWrapper.style.display = 'block';
    orderTicketThanksName.textContent = data.name;
}

// Открытие/закрытие формы
orderTrigger.addEventListener('click', () => {
    hideForm.classList.toggle('hide-form-active');
});

// Когда заполнены поля, лейблы остаются вверху
orderTicketForm.addEventListener('change', (e) => {
    const target = e.target;
    const label = target.labels[0];

    if (label && target.value) {
        label.classList.add('order-ticket__label-focus');
    } else {
        label.classList.remove('order-ticket__label-focus');
    }
});

// Submit
orderTicketForm.addEventListener('submit', (e) => {    
    e.preventDefault();

    const formData = new FormData(orderTicketForm);
    const data = {};

    // Деструктуризация elem. В name попадает elem[0], в value elem[1]
    for (const [name, value] of formData) {
        data[name] = value;
    }
    
    sendData(data, showThankYou, showPreloader);
});
