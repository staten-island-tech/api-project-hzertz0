let cards = [];       // holds the deck
let currentIndex = 0; // tracks current card
let slapCard = 1;     
let slapRequired = false;
const cardValues = {
  "ACE": 1,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13
};

function getCardValue(card) {

  if (cardValues[card.value]) {
    return cardValues[card.value]; 
  }
  return Number(card.value); 
}

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

    cards = drawData.cards; // save all cards in the deck
    showCard();             // show first card
  } catch (error) {
    console.error(error);
  }
}

function showCard() {
  if (currentIndex >= cards.length) {
    console.log("You win!")
    return;
  }
  const card = cards[currentIndex];

  document.querySelector(".container").innerHTML = `
    <img src="${card.image}" class="mx-auto" />
  `;
  countCard();
  slapCard++;  
}

document.getElementById("nextCard").addEventListener("click", () => {
  if (slapRequired === false){
    currentIndex++;
    showCard();}
  
  if (slapRequired === true){
    console.log("fail")
  }
});

getData();

function countCard() {
  document.querySelector(".slapCount").innerHTML = `
    <p>Current Count: ${slapCard}</p>
    `
  if (!cards[currentIndex]) return;

  const cardValue = getCardValue(cards[currentIndex]); 
  
  if (slapCard === cardValue || cards[currentIndex].value === "JACK") {
    slapRequired = true;
    console.log("Slap")}

  if (slapCard === 13) {
    slapCard = 0;}
}

document.getElementById("slapCard").addEventListener("click", () => {
  if (slapRequired === true){
    console.log("test");
    slapRequired = false;
  }

  if (slapRequired === false){
    console.log("fail");
  }
});
