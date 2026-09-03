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

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(emojis);

emojis.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;

  card.addEventListener("click", () => {
    card.classList.add("flipped");
  });

  board.appendChild(card);
});

/** 1. retourne les cartes (rendre l'emoji invisible)
 * -la carte de base ne doit pas afficher l'emoji
 * quand on clic sur la carte, l'emoji doit s'afficher
 */
