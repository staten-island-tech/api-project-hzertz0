/*async function getData() {
  try {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const deckData = await response.json();
    const deckId = deckData.deck_id;

    const drawResponse = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
    );
    const drawData = await drawResponse.json();

    drawData.cards.forEach((card, index) => {
        document.querySelector(".container").insertAdjacentHTML(    
            "afterbegin",
            `<div class="card"">
            <img src="${card.image}" />
            <h2>${card.value} of ${card.suit}</h2>
            </div>`
  );
    });
  } catch (error) {
    console.error(error);
  }
}

getData();*/

let cards = [];       // holds the deck
let currentIndex = 0; // tracks current card

async function getData() {
  try {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const deckData = await response.json();
    const deckId = deckData.deck_id;

    const drawResponse = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
    );
    const drawData = await drawResponse.json();

    cards = drawData.cards; // save cards
    showCard();             // show first card
  } catch (error) {
    console.error(error);
  }
}

function showCard() {
  if (currentIndex >= cards.length) {
    alert("No more cards!");
    return;
  }

  const card = cards[currentIndex];
  const container = document.querySelector(".container");

  container.innerHTML = `
    <div class="card">
      <img src="${card.image}" />
      <h2>${card.value} of ${card.suit}</h2>
    </div>
  `;
}

document.getElementById("nextCard").addEventListener("click", () => {
  currentIndex++;
  showCard();
});

getData();
