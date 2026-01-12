let cards = [];             // holds the deck
let currentIndex = 0;       // tracks current card
let slapCard = 1;           
let slapRequired = false;
let slapTimer = null;
const SLAP_TIME = 1000;     

const cardValues = {
  "ACE": 1,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13};

function getCardValue(card) { 
  if (cardValues[card.value]) {
    return cardValues[card.value];
  }
  return Number(card.value);
}

async function getData() { // get deck
  try {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const deckData = await response.json();
    const deckId = deckData.deck_id;
    const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
    const drawData = await drawResponse.json();

    cards = drawData.cards; // save deck
    showCard();
  } catch (error) {
    console.error(error);
  }
}

function showCard() {
  if (currentIndex >= cards.length) { // win condition
    console.log("You win!");
    return;
  }

  const card = cards[currentIndex]; // display card
  document.querySelector(".container").innerHTML = `
    <img src="${card.image}" class="mx-auto" />`;
  countCard();
  slapCard++;
}

function countCard() {
  document.querySelector(".slapCount").innerHTML = `
    <p>Current Count: ${slapCard}</p>
  `;

  if (!cards[currentIndex]) return;

  const cardValue = getCardValue(cards[currentIndex]); 

  if (slapCard === cardValue || cards[currentIndex].value === "JACK") {
    slapRequired = true;

    // start slap timer
    slapTimer = setTimeout(() => {
      if (slapRequired) {
        console.log("Too slow");
        slapRequired = false;
      }
    }, SLAP_TIME);
  }

  if (slapCard === 13) {
    slapCard = 0;
  }
}

document.getElementById("nextCard").addEventListener("click", () => {
  if (slapRequired) {
    console.log("fail, can't draw");
    return;}

  currentIndex++;
  showCard();
});

document.getElementById("slapCard").addEventListener("click", () => {
  if (!slapRequired) {
    console.log("fail, can't slap");
    return;}

  console.log("success ");

  slapRequired = false;
  clearTimeout(slapTimer);
  slapTimer = null;
});

getData();


/*PLAN:
win: get all 52 cards
penalty: if you try to flip while its a matched card, then the currently drawn cards get thrown back into the shuffle pile
slap: if you slap in time, then you hold onto the cards currently drawn
features:
add a "cards left" tracker
add a "cards taken" tracker
add a clear way to see that the penatly is applied
add a timer for slapping (1 second)
*/