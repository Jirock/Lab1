// ==================== Глобальные переменные ====================
let counter = 0;              // текущее значение счётчика
let shape1_size = 50;         // начальный размер фигуры .shape1 (в пикселях)

// Получаем все кнопки на странице (используем NodeList)
let allButtons = document.querySelectorAll("button");

// ==================== Обработка двойного клика ====================
// Получаем элемент с классом "btn-double" (первый в коллекции)
let doubleClickBtn = document.getElementsByClassName("btn-double")[0];
// Вешаем событие двойного клика (dblclick)
doubleClickBtn.addEventListener('dblclick', function(){
    // Находим фигуру .shape5 и делаем её углы прямыми (borderRadius = 0)
    document.getElementsByClassName("shape5")[0].style.borderRadius = "0px";
});

// ==================== Обработка наведения мыши ====================
// Получаем фигуру .shape4
let squareToCircle = document.getElementsByClassName("shape4")[0];
// При входе мыши в элемент (mouseenter)
squareToCircle.addEventListener('mouseenter', function(){
    squareToCircle.style.backgroundColor = "red";      // меняем цвет на красный
    squareToCircle.style.border = "2px #fff solid";    // добавляем белую рамку
});
// При уходе мыши с элемента (mouseout)
squareToCircle.addEventListener('mouseout', function(){
    squareToCircle.style.backgroundColor = "rgb(19, 116, 7)"; // восстанавливаем зелёный
    squareToCircle.style.border = "0px";                      // убираем рамку
});

// ==================== Обработка кликов на всех кнопках ====================
// Перебираем все кнопки (forEach доступен для NodeList)
allButtons.forEach(button => {
    // Добавляем обработчик события click для каждой кнопки
    button.addEventListener('click', function() {
        // Определяем действие по классу кнопки (используем switch)
        switch(button.className){
            // --- Кнопка счётчика ---
            case "btn-counter":
                counter++;      // увеличиваем счётчик
                // Обновляем текст в элементе с классом "counter"
                document.getElementsByClassName("counter")[0].textContent = counter;
                break;
            
            // --- Кнопка увеличения размера фигуры .shape1 ---
            case "btn-increase":
                if(shape1_size == 200){            // если достигли максимума (200px)
                    shape1_size = 50;               // сбрасываем до 50px
                } else {
                    shape1_size += 10;              // иначе увеличиваем на 10px
                }
                // Применяем новый размер к .shape1 (и ширина, и высота)
                document.getElementsByClassName("shape1")[0].style.width = shape1_size + "px";
                document.getElementsByClassName("shape1")[0].style.height = shape1_size + "px";
                break;
            
            // --- Кнопка обмена цветами между .shape2 и .shape3 ---
            case "btn-change-color":
                // Сохраняем текущий цвет .shape2
                let shape2_color = document.getElementsByClassName("shape2")[0].style.backgroundColor;
                // Присваиваем .shape2 цвет от .shape3
                document.getElementsByClassName("shape2")[0].style.backgroundColor = 
                    document.getElementsByClassName("shape3")[0].style.backgroundColor;
                // Присваиваем .shape3 сохранённый цвет .shape2
                document.getElementsByClassName("shape3")[0].style.backgroundColor = shape2_color;
                break;
            
            // --- Кнопка для скругления углов .shape5 (обычный клик) ---
            case "btn-double":
                // Делаем углы закруглёнными (50px)
                document.getElementsByClassName("shape5")[0].style.borderRadius = "50px";
                break;
            
            // --- Кнопка изменения заголовка страницы ---
            case "btn-title":
                alert("Заголовок изменен! посмотрите наверх");
                // Изменяем текст внутри тега <title>
                document.querySelector("title").textContent = "АААА ООО УУ ЫЫЫ";
                break;
            
            // --- Кнопка добавления фонового изображения ---
            case "btn-add-img":
                // Устанавливаем фоновое изображение (путь к файлу относительный)
                document.querySelector("body").style.backgroundImage = "url(resources/img/bg.png)";
                // Растягиваем фон на весь экран
                document.querySelector("body").style.backgroundSize = "cover";
                break;
            
            // --- Кнопка удаления фонового изображения ---
            case "btn-remove-img":
                // Убираем фоновое изображение (null)
                document.querySelector("body").style.backgroundImage = null;
                break;
        }
    });
});