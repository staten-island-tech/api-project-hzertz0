let cards = [];             // holds the deck
let currentIndex = 0;       // tracks current card
let slapCard = 1;           
let slapRequired = false;   
let slapTimer = null;       
const SLAP_TIME = 2000;     
let pile = [];              // cards currently drawn
let takenCards = [];        // cards the player has won

const cardValues = {
  "ACE": 1,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13
};

// converts face cards into numbers
function getCardValue(card) { 
  return cardValues[card.value] ?? Number(card.value);
}

async function getData() { 
  try {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const deckData = await response.json();
    const deckId = deckData.deck_id;
    const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
    const drawData = await drawResponse.json();

    cards = drawData.cards; 
    showCard();
  } catch (error) {
    console.error(error);
  }
}

// display current card
function showCard() { 
  if (takenCards.length === 52) {
    updateStats();
    addStatusMessage("YOU WIN! All 52 cards collected!", "win");
  }

  const card = cards[currentIndex]; 
  pile.push(card); // add to middle pile

  document.querySelector(".container").innerHTML = `
    <img src="${card.image}" class="mx-auto" />
  `;
  countCard();
  slapCard++;
}

// update the counters
function updateStats() { 
  document.querySelector(".slapCount").innerHTML = `
    <p>Current Count: ${slapCard}</p>
    <p>Cards Taken: ${takenCards.length}</p>
    <p>Cards in Pile: ${pile.length}</p>
  `;
}

function addStatusMessage(message, type = "info") {
  const statusBox = document.getElementById("statusBox");

  let colorClass = "text-gray-700";
  if (type === "penalty") colorClass = "text-red-600";
  if (type === "success") colorClass = "text-green-600";
  if (type === "win") colorClass = "text-yellow-600 font-bold text-lg";

  statusBox.innerHTML = `<p class="${colorClass}">${message}</p>`;
}

// check for slap conditions
function countCard() {
  if (!cards[currentIndex]) return;

  const cardValue = getCardValue(cards[currentIndex]);

  if (slapCard === cardValue || cards[currentIndex].value === "JACK"){
    slapRequired = true;

    slapTimer = setTimeout(() => { // too slow
      addStatusMessage("Too slow! You missed the slap.", "penalty");
      applyPenalty();
    }, SLAP_TIME);
  }

  if (slapCard === 14){
    slapCard = 1;}

  updateStats();
}

// apply penalty (pile back to deck)
function applyPenalty() {
  addStatusMessage("Penalty applied! Pile returned to deck.", "penalty");
  cards = cards.concat(pile);
  pile = [];

  slapRequired = false;
  clearTimeout(slapTimer);
  slapTimer = null;

  updateStats();
}

// click next card
document.getElementById("nextCard").addEventListener("click", () => { 
  if (slapRequired) { // tried to draw during slap
    addStatusMessage("You tried to draw during a slap!", "penalty");
    applyPenalty();
    return;
  }

  currentIndex++;
  showCard();
});

// click slap
document.getElementById("slapCard").addEventListener("click", () => {
  if (!slapRequired) { // slapped when not required
    addStatusMessage("Bad slap! No slap was required.", "penalty");
    applyPenalty();
    return;
  }

  takenCards = takenCards.concat(pile);
  pile = [];

  addStatusMessage("Successful slap! You won the pile.", "success");

  slapRequired = false;
  clearTimeout(slapTimer);
  slapTimer = null;

  if (takenCards.length === 52) {
    addStatusMessage("YOU WIN! All 52 cards collected!", "win");
  }
  updateStats();
});
getData();
