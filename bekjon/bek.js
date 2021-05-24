function click_me(){
    let userDateOfBirth = prompt("What year were you born?")
    var sana = new Date().getFullYear();
    let result = (sana - userDateOfBirth)*365;
    let h1 = document.createElement("h1");
    let text = document.createTextNode("You are" + ' ' + result + ' ' + "days old");
    h1.setAttribute("id", "matn");
    h1.appendChild(text);
    document.getElementById('natija').appendChild(h1);
}

function reset(){
    document.getElementById("matn").remove();
}

// Challenge2: CAT GENERATE

function catGenerate(){
    var image = document.createElement("img");
    var div = document.getElementById("catGen-box");
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// CHALLENGE4: ROCK, PAPER , SCISSORS

function rpsGame(yourchoice) {
    var humanChoice, botChoice;
    humanChoice = yourchoice.id;
    botChoice = rpsBotChoice(rpsRandom())
    console.log(humanChoice, botChoice)
    result = winner(humanChoice, botChoice)
    console.log(result)
    message = finalMessage(result);
    console.log(message)

    rpsFront(yourchoice.id, botChoice, message)
}

function rpsRandom() {
    return Math.floor(Math.random()*3)
}

function rpsBotChoice(number) {
    return ['rock', 'paper', 'scissors'][number]
}


function winner(humanChoice, botChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };

    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];
    return [yourScore, botScore];
}

function finalMessage() {
    if (result[0] === 1) {
        return {'message': 'You win!', 'color': 'green'};
    } else if (result[0] === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'}
    } else{
        return {'message': 'You lost!!', 'color': 'red'}
    }
}

function rpsFront(humanImageChoice, botImageChoice, finalMessage) {   var imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src,
}
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('h1');
    messageDiv.setAttribute('id', 'messageDiv');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1) ;'></img>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + ";line-height:150px;'>" + finalMessage['message'] + "</h1>";

    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1) ;'></img>";

    document.getElementById('flexbox-container-3').appendChild(humanDiv);
    document.getElementById('flexbox-container-3').appendChild(messageDiv);
    document.getElementById('flexbox-container-3').appendChild(botDiv);
}
