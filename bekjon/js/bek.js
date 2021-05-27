function click_me() {
    var userDateOfBirth = prompt("What year were you born?");
    var sana = new Date().getFullYear();
    var result = (sana - userDateOfBirth) * 365;
    var h1 = document.createElement("h1");
    var text = document.createTextNode("You are" + ' ' + result + ' ' + "days old");
    h1.setAttribute("id", "matn");
    h1.appendChild(text);
    document.getElementById('natija').appendChild(h1);
}

function reset() {
    document.getElementById("matn").remove();
}

// Challenge2: CAT GENERATE

function catGenerate() {
    var image = document.createElement("img");
    var div = document.getElementById("catGen-box");
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// CHALLENGE4: ROCK, PAPER , SCISSORS

function rpsGame(yourchoice) {
    var humanChoice, botChoice;
    humanChoice = yourchoice.id;
    botChoice = rpsBotChoice(rpsRandom());
    console.log(humanChoice, botChoice);
    result = winner(humanChoice, botChoice);
    console.log(result);
    message = finalMessage(result);
    console.log(message);

    rpsFront(yourchoice.id, botChoice, message);
}

function rpsRandom() {
    return Math.floor(Math.random() * 3);
}

function rpsBotChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}


function winner(humanChoice, botChoice) {
    var rpsDatabase = {
        'rock': {
            'scissors': 1,
            'rock': 0.5,
            'paper': 0
        },
        'paper': {
            'rock': 1,
            'paper': 0.5,
            'scissors': 0
        },
        'scissors': {
            'paper': 1,
            'scissors': 0.5,
            'rock': 0
        }
    };

    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];
    return [yourScore, botScore];
}

function finalMessage() {
    if (result[0] === 1) {
        return {
            'message': 'You win!',
            'color': 'green'
        };
    } else if (result[0] === 0.5) {
        return {
            'message': 'You tied!',
            'color': 'yellow'
        };
    } else {
        return {
            'message': 'You lost!!',
            'color': 'red'
        };
    }
}

function rpsFront(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    };
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('h1');
    messageDiv.setAttribute('id', 'messageDiv');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1) ;'></img>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage.color + ";line-height:150px;'>" + finalMessage.message + "</h1>";

    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1) ;'></img>";

    document.getElementById('flexbox-container-3').appendChild(humanDiv);
    document.getElementById('flexbox-container-3').appendChild(messageDiv);
    document.getElementById('flexbox-container-3').appendChild(botDiv);
}


//Challenge4: Change the color of all buttons

var alButtons = document.getElementsByTagName('button');
var copyButtons = [];
for (var i = 0; i < alButtons.length; i++) {
    copyButtons.push(alButtons[i].classList[1]);
}

function buttonColorChange(yourChange) {
    if (yourChange.value === 'red') {
        buttonsRed();
    } else if (yourChange.value === 'green') {
        buttonsGreen();
    } else if (yourChange.value === 'reset') {
        buttonsReset();
    } else if (yourChange.value === 'random') {
        buttonsRandom();
    }
}

function buttonsRed() {
    for (var i = 0; i < alButtons.length; i++) {
        alButtons[i].classList.remove(alButtons[i].classList[1]);
        alButtons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (var i = 0; i < alButtons.length; i++) {
        alButtons[i].classList.remove(alButtons[i].classList[1]);
        console.log(alButtons[i].classList[1]);
        alButtons[i].classList.add('btn-success');
    }
}

function buttonsReset() {
    for (var i = 0; i < alButtons.length; i++) {
        alButtons[i].classList.remove(alButtons[i].classList[1]);
        alButtons[i].classList.add(copyButtons[i]);
    }
}

function buttonsRandom() {
    for (var i = 0; i < alButtons.length; i++) {
        var choices = ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning'];
        var randomnumber = Math.floor(Math.random() * 4);
        alButtons[i].classList.remove(alButtons[i].classList[1]);
        alButtons[i].classList.add(choices[randomnumber]);
    }
}

//Challenge5: BLACKJACK

var blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '.your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '.dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'],
    'mapCards': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'j': 10, 'q': 10, 'k': 10, 'a': [1, 11] },
    'wins' : 0,
    'losses' : 0,
    'draws': 0,
    'turnOvers': false,
    'isStand': false
};
// console.log(blackjackGame.wins,blackjackGame.losses,blackjackGame.draws);
var swish = new Audio('sounds/swish.mp3');
var winSound = new Audio('sounds/cash.mp3');
var lossSound = new Audio('sounds/aww.mp3');

var YOU = blackjackGame.you;
var DEALER = blackjackGame.dealer;

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);



function blackjackHit() {
    if (blackjackGame.isStand === false) {
        card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function showCard(rasm, activePlayer) {
    if (activePlayer.score <= 21) {
        var cardImage = document.createElement('img');
        cardImage.src = `\images/${rasm}.png`;
        cardImage.setAttribute('id', 'cardImage');
        document.querySelector(activePlayer.div).appendChild(cardImage);
        swish.play();
    }
}

function randomCard() {
    var indexnumber = Math.floor(Math.random() * 13);
    return blackjackGame.cards[indexnumber];
}



function blackjackDeal() {

    if (blackjackGame.turnOvers === true) {
        blackjackGame.isStand = false;
        var yourImages = document.querySelector('.your-box').querySelectorAll('img');
        var dealerImages = document.querySelector('.dealer-box').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }  
        YOU.score = 0;
        DEALER.score = 0;
        document.querySelector(YOU.scoreSpan).textContent = 0;
        document.querySelector(YOU.scoreSpan).style.color = '#fff';
        document.querySelector(DEALER.scoreSpan).textContent = 0;
        document.querySelector(DEALER.scoreSpan).style.color = '#fff';

        document.querySelector('#blackjack-result').style.color = '#000';
        document.querySelector('#blackjack-result').textContent = "Let's play";
        blackjackGame.turnOvers = false;
    }
}



function updateScore(card, activePlayer) {
    if (card === 'a') {
        if ((activePlayer.score + blackjackGame.mapCards[card][1]) <= 21) {
            activePlayer.score += blackjackGame.mapCards[card][1];
        } else {
            activePlayer.score += blackjackGame.mapCards[card][0];
        }
    } else {
        activePlayer.score += blackjackGame.mapCards[card];
    }
}

function showScore(activePlayer) {
    if (activePlayer.score > 21) {
        document.querySelector(activePlayer.scoreSpan).textContent = 'BUST!';
        document.querySelector(activePlayer.scoreSpan).style.color = 'red';
    } else {
        document.querySelector(activePlayer.scoreSpan).textContent = activePlayer.score;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
    blackjackGame.isStand = true;
    while(DEALER.score < 16 && blackjackGame.isStand === true) {
        card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    } if(DEALER.score >= 16 && blackjackGame.isStand === true) {
        blackjackGame.turnOvers = true;
        var winner = computeWinner();
        Score(winner);
      }
}
function computeWinner() {
    var winner;
    if(YOU.score <= 21) {
        if(YOU.score > DEALER.score || DEALER.score > 21) {
            blackjackGame.wins++;
            console.log('You win');
            winner = YOU;
        }else if(YOU.score < DEALER.score) {
            blackjackGame.losses++;
            console.log('You lost');
            winner = DEALER;
        }else if(YOU.score === DEALER.score) {
            blackjackGame.draws++;
            console.log('You drew');
        }
    } else if(YOU.score > 21 && DEALER.score <= 21) {
        blackjackGame.losses++;
        console.log('You lost');
        winner = DEALER;
    }else if(YOU.score > 21 && DEALER.score > 21) {
        blackjackGame.draws++;
        console.log('You drew');
    }
    console.log('Winner is: ', winner);
    return winner;
}

function Score(winner) {
    var message, messageColor;
    if(winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame.wins;
        message = 'You win';
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame.losses;
        message = 'You lose';
        messageColor = 'red';
        lossSound.play();
    } else {
        document.querySelector('#draws').textContent = blackjackGame.draws;
        message = 'You drew';
        messageColor = '#000';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}
