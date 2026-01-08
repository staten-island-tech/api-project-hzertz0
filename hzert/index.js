let cards = [];       // holds the deck
let currentIndex = 0; // tracks current card

async function getData() {
  try {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" // fetch new deck
    );
    const deckData = await response.json();
    const deckId = deckData.deck_id;

    const drawResponse = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52` // get whole deck
    );
    const drawData = await drawResponse.json();

    cards = drawData.cards; // save all cards in the deckid
    showCard();             // show first card
  } catch (error) {
    console.error(error);
  }
}

function showCard() {
  if (currentIndex >= cards.length) {
    console.log("Out of cards")
    return;
  }

  const card = cards[currentIndex]; // save and display current card
  const container = document.querySelector(".container");

  container.innerHTML = `
      <img src="${card.image}" class="mx-auto" />
  `;
}

document.getElementById("nextCard").addEventListener("click", () => {
  currentIndex++;
  showCard();
});

getData();
