// Функция для сохранения данных в куки
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Функция для получения значения куки по имени
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function() {    
    document.getElementById("orderForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;

        // Проверяем, есть ли сохраненные значения в куки
        let savedName = getCookie("name");
        let savedPhone = getCookie("phone");
        if (savedName === name && savedPhone === phone) {
            // Перенаправляем на другую страницу
            window.location.href = "error.html";
        }

        
        // Получаем данные из формы
        let formData = {
            "stream_code": document.getElementById("stream_code").value,
            "client": {
                "name": name,
                "phone": phone
            },
            "sub1": document.getElementById("sub1").value
        };

        // Создаем новый запрос
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://order.drcash.sh/v1/order");

        // Устанавливаем заголовки
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer NWJLZGEWOWETNTGZMS00MZK4LWFIZJUTNJVMOTG0NJQXOTI3");

        // Обработка ответа
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Success:', xhr.responseText);
                window.location.href = "thank.html";
            } else {
                console.log('Error:', xhr.responseText);
                window.location.href = "error.html";
            }
        };

        // Сохраняем данные в куки на 30 дней
        setCookie("name", name, 30);
        setCookie("phone", phone, 30);

        // Отправляем запрос
        xhr.send(JSON.stringify(formData));
    });
});
