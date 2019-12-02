
var cards = document.getElementsByClassName("card");
cards = [...cards];
console.log(cards)

cards.forEach(card => card.addEventListener('click', flipCard))
//when someone clicks on a card, the card they clicked on flips

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let match = 0; 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('visible');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    //checks to see if cards are the same
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
    }
    if (!isMatch) {
        unFlipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    match = match + 1; 
    if (match == 6) {
        modal();
    }
    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('visible');
        secondCard.classList.remove('visible');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

function modal() {
    var win = document.getElementsByClassName("overlay");
    win[0].classList.add('visible');
    win[0].classList.remove('hidden');
};

//cards shuffle
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

document.getElementById("start").addEventListener("click", restart);

function restart() {
    window.location.reload();
    //the start button resets the board
}

let newGame = document.getElementById("new")
newGame.addEventListener("click", restartGame);

function restartGame() {
    newGame.classList.remove('visible');
    newGame.classList.add('hidden');
    window.location.reload();
    //the new button resets the board and returns to the main screen
}