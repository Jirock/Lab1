// ==================== СПИСОК ЗВУКОВ ====================
// Массив относительных путей к аудиофайлам (формат mp3)
const soundList = [
    "resources/sound/s1.mp3",
    "resources/sound/s2.mp3",
    "resources/sound/s3.mp3",
    "resources/sound/s4.mp3",
    "resources/sound/s5.mp3",
    "resources/sound/s6.mp3",
];

// ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================
let isPlaying = false;      // флаг: проигрывается ли звук сейчас
let pendingPlay = false;    // флаг: есть ли запрос на воспроизведение после окончания текущего
let img = document.querySelector(".content_img"); // изображение Громилы
let screamer_counter = 0;   // счётчик кликов для пасхалки

// Скрываем блок пасхалки при загрузке страницы
document.querySelector(".easter_egg").style.display = "none";

// ==================== ФУНКЦИЯ ВОСПРОИЗВЕДЕНИЯ СЛУЧАЙНОГО ЗВУКА ====================
function playRandomSound() {
    // Выбираем случайный индекс от 0 до длины массива
    let rand = Math.floor(Math.random() * soundList.length);
    let sound = new Audio(soundList[rand]); // создаём аудио-объект
    screamer_counter++;                     // увеличиваем счётчик для активации пасхалки

    // ПАСХАЛКА: после 5 кликов – предупреждение
    if (screamer_counter == 5) {
        alert("Не бесите громилу");
    } 
    // ПАСХАЛКА: после 10 кликов – типо скример
    else if (screamer_counter == 10) {
        sound.pause();          // останавливаем текущий звук
        sound.currentTime = 0;  // сбрасываем время воспроизведения

        // Скрываем основной контент
        document.querySelector(".container").style.display = "none";
        let easter_egg = document.querySelector(".easter_egg");
        easter_egg.style.display = "flex";
        easter_egg.style.width = "100%";
        easter_egg.style.height = "100vh";
        easter_egg.style.backgroundImage = "url(resources/img/screamer1.jpg)";
        easter_egg.style.backgroundSize = "cover";

        alert("Типо пасхалка");
        sound = new Audio("resources/sound/egs1.mp3"); // страшный звук
        sound.play();
    }

    isPlaying = true; // отмечаем, что звук начал играть

    sound.play();     // запускаем воспроизведение
    // Обработчик окончания звука
    sound.onended = () => {
        isPlaying = false;                 // сбрасываем флаг
        if (pendingPlay) {                 // если есть отложенный запрос
            pendingPlay = false;           // сбрасываем отложенный флаг
            playRandomSound();             // вызываем функцию снова (здесь была ошибка: не хватало скобок)
        }
    };
}

// ==================== ФУНКЦИЯ ПЕРЕТАСКИВАНИЯ ИЗОБРАЖЕНИЯ ====================
function ActiveImg() {
    let isDragging = false;   // перетаскивание активно?
    let offsetX, offsetY;     // смещение курсора относительно левого верхнего угла изображения

    // Событие: нажатие кнопки мыши на изображении
    img.addEventListener('mousedown', (e) => {
        isDragging = true;
        // Вычисляем, где курсор находится внутри картинки
        offsetX = e.clientX - img.getBoundingClientRect().left;
        offsetY = e.clientY - img.getBoundingClientRect().top;
        img.style.cursor = 'grabbing'; // меняем курсор
        e.preventDefault();            // предотвращаем выделение текста и стандартное поведение
    });

    // Событие: движение мыши по всему документу
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;       // если не перетаскиваем – ничего не делаем

        // Вычисляем новые координаты верхнего левого угла
        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;

        img.style.position = 'absolute'; // позиционирование обязательно для перемещения
        img.style.left = left + 'px';
        img.style.top = top + 'px';
    });

    // Событие: отпускание кнопки мыши
    document.addEventListener('mouseup', () => {
        isDragging = false;
        img.style.cursor = 'grab';       // возвращаем курсор
    });
}

// ==================== ФУНКЦИЯ ПРИЦЕЛИВАНИЯ (СМЕНА ИЗОБРАЖЕНИЯ ПРИ НАВЕДЕНИИ) ====================
function Aiming() {
    let originalSrc; // переменная для хранения исходного src
    img.addEventListener('mouseenter', () => {
        originalSrc = img.src;               // запоминаем обычную картинку
        img.src = "resources/img/focus.png"; // ставим другую-картину
    });

    img.addEventListener('mouseleave', () => {
        img.src = originalSrc;               // восстанавливаем исходную картинку
    });
}

// ==================== ФУНКЦИЯ КЛОНИРОВАНИЯ ====================
function Cloning() {
    let duplicate = img.cloneNode();          // поверхностное клонирование (без дочерних элементов)
    duplicate.style.position = "absolute";
    duplicate.style.width = "100px";
    duplicate.style.height = "100px";
    // Ожидаем загрузки изображения, чтобы получить его реальные размеры
    duplicate.onload = () => {
        let maxX = window.innerWidth - duplicate.width;
        let maxY = window.innerHeight - duplicate.height;
        // Клонирование с случайным позиционированием
        let randX = Math.random() * Math.max(0, maxX);
        let randY = Math.random() * Math.max(0, maxY);
        duplicate.style.left = randX + 'px';
        duplicate.style.top = randY + 'px';
    };
    document.body.appendChild(duplicate);
}

// ==================== ОБРАБОТЧИК КЛИКА ПО ИЗОБРАЖЕНИЮ (ЗВУК) ====================
img.addEventListener('click', function () {
    if (isPlaying) {
        pendingPlay = true;   // если звук уже играет – ставим в очередь
    } else {
        playRandomSound();    // иначе сразу воспроизводим
    }
});

// ==================== ОБРАБОТЧИКИ КНОПОК УПРАВЛЕНИЯ ====================
let allButtons = document.querySelectorAll(".buttons button");
allButtons.forEach(button => {
    button.addEventListener('click', function () {
        switch (button.className) {
            case "btn-move":
                img.src = "resources/img/charger_moving.gif"; // анимированный GIF движения
                break;
            case "btn-stop":
                img.src = "resources/img/charger_stopped.png"; // статичное изображение
                break;
            case "btn-reset":
                location.reload(); // полная перезагрузка страницы
                break;
            case "btn-wide":
                img.style.width = "100%";
                img.style.height = "300px";
                break;
            case "btn-tiny":
                img.style.width = "100px";
                img.style.height = "100px";
                break;
            case "btn-old-size":
                img.style.width = "400px";
                img.style.height = "400px";
                break;
            case "btn-moving":
                ActiveImg(); // активируем перетаскивание (вызывается каждый раз при клике)
                break;
            case "btn-hover":
                Aiming();    // активируем эффект наведения
                break;
            case "btn-cloning":
                Cloning();
                break;
        }
    });
});