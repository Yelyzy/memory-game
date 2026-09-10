const board = document.querySelector("#board");

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

let firstChoice = null;
let secondChoice = null;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

shuffleArray(emojis);

emojis.forEach((emoji) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.emoji = emoji;

  cardElement.addEventListener("click", () => {
    if (firstChoice === null) {
      cardElement.classList.add("flipped");
      firstChoice = cardElement;
    } else if (secondChoice === null) {
      cardElement.classList.add("flipped");
      secondChoice = cardElement;
    } else {
      // on ne fait rien
    }
  });

  board.appendChild(cardElement);
});
