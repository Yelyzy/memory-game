// -----------------------------------------------------------------------------
// 1. Подключение основных элементов интерфейса
// -----------------------------------------------------------------------------
const board = document.querySelector("#board");
const revealButton = document.querySelector("#reveal-button");

// -----------------------------------------------------------------------------
// 2. Создание массива карточек с парами эмодзи
// -----------------------------------------------------------------------------
const cardsImages = [
  new URL("../image/image-1.jpg", import.meta.url).href,
  new URL("../image/image-2.jpg", import.meta.url).href,
  new URL("../image/image-3.jpg", import.meta.url).href,
  new URL("../image/image-4.jpg", import.meta.url).href,
  new URL("../image/image-5.jpg", import.meta.url).href,
  new URL("../image/image-6.jpg", import.meta.url).href,
  new URL("../image/image-1.jpg", import.meta.url).href,
  new URL("../image/image-2.jpg", import.meta.url).href,
  new URL("../image/image-3.jpg", import.meta.url).href,
  new URL("../image/image-4.jpg", import.meta.url).href,
  new URL("../image/image-5.jpg", import.meta.url).href,
  new URL("../image/image-6.jpg", import.meta.url).href,
];

// -----------------------------------------------------------------------------
// 3. Состояние игры: первая и вторая выбранные карты
// -----------------------------------------------------------------------------
let firstChoice = null;
let secondChoice = null;
let isShowingAllCards = false;

// Количество пар, которые нужно найти в игре.
let matchedPairs = cardsImages.length / 2;

// -----------------------------------------------------------------------------
// 4. Функция перемешивания массива карт
// -----------------------------------------------------------------------------
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Перемешиваем набор карт перед отрисовкой поля
shuffleArray(cardsImages);

// -----------------------------------------------------------------------------
// 5. Создаём DOM-элементы для каждой карты и вешаем обработчики клика
// -----------------------------------------------------------------------------
cardsImages.forEach((imageUrl) => {
  const cardElement = document.createElement("button");
  cardElement.classList.add("card-button");
  cardElement.type = "button";
  cardElement.dataset.image = imageUrl;

  const image = document.createElement("img");
  image.classList.add("card-image");
  image.src = imageUrl;
  image.alt = "";

  cardElement.append(image);

  cardElement.addEventListener("click", () => {
    // Если все карты уже показаны, ничего не делаем
    if (isShowingAllCards) {
      return;
    }

    // Первая карта: открываем её и сохраняем выбор
    if (firstChoice === null) {
      cardElement.classList.add("flipped");
      firstChoice = cardElement;
    }
    // Вторая карта: открываем её и сохраняем второй выбор
    else if (secondChoice === null) {
      cardElement.classList.add("flipped");
      secondChoice = cardElement;
      // Если обе карты уже выбраны, проверяем совпадение.
      if (firstChoice.dataset.image === secondChoice.dataset.image) {
        // Совпавшие карты оставляем открытыми и очищаем выбранные карты.
        firstChoice = null;
        secondChoice = null;
        matchedPairs = matchedPairs - 1; // Уменьшаем количество пар, которые еще осталось найти.
        // Если все пары найдены, выводим сообщение о победе.
        if (matchedPairs === 0) {
          setTimeout(() => {
            window.alert("Congratulations! You've matched all pairs!");
          }, 1000);
        }
      } else {
        setTimeout(() => {
          firstChoice.classList.remove("flipped");
          secondChoice.classList.remove("flipped");
          firstChoice = null;
          secondChoice = null;
        }, 1000);
      }
    }
    // Если уже выбраны две карты, ждём следующего хода
    else {
      console.log("Please wait until the cards are flipped back.");
    }
  });

  board.appendChild(cardElement);
});

// -----------------------------------------------------------------------------
// 6. Получаем список всех карточек после их создания
// -----------------------------------------------------------------------------
const cards = document.querySelectorAll(".card-button");

// -----------------------------------------------------------------------------
// 7. Кнопка "Показать карты": открывает все карты на несколько секунд
// -----------------------------------------------------------------------------
revealButton.addEventListener("click", () => {
  if (isShowingAllCards) {
    return;
  }

  isShowingAllCards = true;
  revealButton.disabled = true;
  cards.forEach((card) => card.classList.add("flipped"));

  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flipped"));
    isShowingAllCards = false;
    revealButton.disabled = false;
  }, 700);
});
