// 1. Получаем ссылки на элементы DOM
const button = document.getElementById('fetch-button');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

// 2. Функция для получения данных из API
async function getDogs() {
    try {
        loader.style.display = 'block';
        gallery.innerHTML = ''; 
        
        // Делаем запрос к API
        const response = await fetch('https://dog.ceo/api/breeds/image/random/20');
        
        // Проверяем, что ответ успешный 
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        // Парсим JSON из ответа
        const data = await response.json();
        
        // Вызываем функцию для отображения картинок
        renderDogs(data.message);

    } catch (error) {
        // Показываем ошибку пользователю
        alert('Упс! Не удалось загрузить песиков: ' + error.message);
    } finally {
        // Скрываем индикатор загрузки
        loader.style.display = 'none';
    }
}

// 3. Функция для отображения картинок на странице
function renderDogs(dogUrls) {
    dogUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('gallery__img'); 
        gallery.appendChild(img); 
    });
}

// 4. Добавляем обработчик события на кнопку
button.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение
    getDogs();
});