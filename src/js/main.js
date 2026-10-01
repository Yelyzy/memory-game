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
  const CardElement = document.createElement("button");
  CardElement.classList.add("card-button");
  CardElement.type = "button";
  CardElement.dataset.image = imageUrl;

  const image = document.createElement("img");
  image.classList.add("card-image");
  image.src = imageUrl;
  image.alt = "";

  CardElement.append(image);

  CardElement.addEventListener("click", () => {
    // Если все карты уже показаны, ничего не делаем
    if (isShowingAllCards) {
      return;
    }

    // Первая карта: открываем её и сохраняем выбор
    if (firstChoice === null) {
      CardElement.classList.add("flipped");
      firstChoice = CardElement;
    }
    // Вторая карта: открываем её и сохраняем второй выбор
    else if (secondChoice === null) {
      CardElement.classList.add("flipped");
      secondChoice = CardElement;

      if (firstChoice.dataset.image === secondChoice.dataset.image) {
        firstChoice = null;
        secondChoice = null;
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
      // Ничего не делаем: игра ждёт, пока пользователь обработает выбор.
    }
  });

  board.appendChild(CardElement);
});

// -----------------------------------------------------------------------------
// 6. Получаем список всех карточек после их создания
// -----------------------------------------------------------------------------
const cards = document.querySelectorAll(".card");

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
  }, 2000);
});
