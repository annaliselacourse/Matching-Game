function createNewCard() {
	const cardElement = document.createElement("div");
	cardElement.classList.add("card");
	cardElement.innerHTML = "<div class=\"card-down\"></div><div class=\"card-up\"></div>";
	return cardElement;

}
createNewCardTest();


function appendNewCard(parentElement) {
	const cardElement = createNewCard();
	parentElement.appendChild(cardElement);
	return cardElement;

}
appendNewCardTest();


function shuffleCardImageClasses() {
	let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
  	cardClasses = _.shuffle(cardClasses)
  	return cardClasses
}
 shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
	
    let cards = [];
  
    for (let i = 0; i < 12; i++) {
      let newCard = appendNewCard(parentElement);
      newCard.classList.add(shuffledImageClasses[i]);

      let cardObj = {index: i, element: newCard, imageClass: shuffledImageClasses[i]}
      cards.push(cardObj);
    }
	


  return cards;
	
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
	
if (cardObject1.imageClass == cardObject2.imageClass) {
  return true;
}
  return false;
	
}
doCardsMatchTest();


let counters = {};


function incrementCounter(counterName, parentElement) {
 
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
     
 
	counters[counterName] += 1;

 
  parentElement.innerText = counters[counterName];

}
incrementCounterTest();


let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
 
	incrementCounter("flips", document.getElementById("flip-count"));

	
	if (lastCardFlipped == null) {
    		lastCardFlipped = newlyFlippedCard;
    	return;
 	}

 
	if (lastCardFlipped.imageClass != newlyFlippedCard.imageClass) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }
  
 
	incrementCounter("matches", document.getElementById("match-count"));
  lastCardFlipped.element.classList.add("glow");
  newlyFlippedCard.element.classList.add("glow");

 
	let winAudio = new Audio('audio/win.wav');
  let matchAudio = new Audio('audio/match.wav');
  if (counters["matches"] == 6) {
    winAudio.play();
  }
  else {
    matchAudio.play();
  }

 
  lastCardFlipped = null;

}


function resetGame() {
	
cardContainer = document.getElementById("card-container");
	
	
while (cardContainer.firstChild) {
  cardContainer.removeChild(cardContainer.firstChild);
}
	
	
  document.getElementById("flip-count").innerText = 0;
  document.getElementById("match-count").innerText = 0;
	
	
  counters = {};
	
	
  lastCardFlipped = null;
	
	
  setUpGame();

}


setUpGame();
