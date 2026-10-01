// -----------------------------------------------------------------------------
// 1. Подключение основных элементов интерфейса
// -----------------------------------------------------------------------------
const board = document.querySelector("#board");
const revealButton = document.querySelector("#reveal-button");

// -----------------------------------------------------------------------------
// 2. Создание массива карточек с парами эмодзи
// -----------------------------------------------------------------------------
const emojis = [
  "💍",
  "🐚",
  "❄️",
  "🦀",
  "🪼",
  "🥥",
  "🐤",
  "🍄",
  "🦋",
  "🌵",
  "🌸",
  "🐝",
  "💍",
  "🐚",
  "❄️",
  "🦀",
  "🪼",
  "🥥",
  "🐤",
  "🍄",
  "🦋",
  "🌵",
  "🌸",
  "🐝",
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
shuffleArray(emojis);

// -----------------------------------------------------------------------------
// 5. Создаём DOM-элементы для каждой карты и вешаем обработчики клика
// -----------------------------------------------------------------------------
emojis.forEach((emoji) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.emoji = emoji;

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
    }
    // Если уже выбраны две карты, ждём следующего хода
    else {
      // Ничего не делаем: игра ждёт, пока пользователь обработает выбор.
    }
  });

  board.appendChild(cardElement);
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
