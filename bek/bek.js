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


