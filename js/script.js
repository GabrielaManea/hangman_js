//tema:
//spatii intre linii
//afisare tabel cu isoric din localStorage
//salvati elementele din TODO in localStorage 
//la deschiderea todo-ului, elementele salvate se vor afisa in TODO. 

const listaCuvinte = [
    "ABECEDAR",
    "CEAS",
    "AMBIDEXTRU",
    "TERMONUCLEAR",
    "PROGRAMATOR",
    "CLAUN",
    "CORONAVIRUS",
    "PROFESOR"
];

let randomIndex;
let cuvantSelectat;
let cuvantAscuns;
let nrIncercari = 10;
let currentHistory = localStorage.getItem("history");

generateAlphabetLetters();
attachEventHandler();
newGame();

function generateWord() {
    randomIndex = Math.floor(Math.random() * listaCuvinte.length);
    cuvantSelectat = listaCuvinte[randomIndex];
    cuvantAscuns = `${cuvantSelectat[0]}${"_".repeat(cuvantSelectat.length - 2)}${cuvantSelectat[cuvantSelectat.length - 1]}`;
    
}

function newGame() {
    nrIncercari = 10;
    toggleLetterButtons(false);
   
    generateWord();

    const $wordContainer = document.querySelector(".word-container");
    const $wordElement = document.createElement("h3");
    $wordElement.innerHTML = cuvantAscuns;
    $wordContainer.innerHTML = "";
    $wordContainer.appendChild($wordElement);
}

function attachEventHandler() {
    const $newGameBtn = document.querySelector("#new-game");
    $newGameBtn.addEventListener("click", newGame);
}

function generateAlphabetLetters() {
    const $lettersContainer = document.querySelector(".letters-container");
    for (let i = 65; i <= 90; i++) {
        const $btn = document.createElement("button");
        $btn.innerHTML = String.fromCharCode(i);
        const letter = String.fromCharCode(i);;
        $btn.addEventListener("click", () => {onLetterClick(letter);});
        $lettersContainer.appendChild($btn);
    }
}

function onLetterClick(letter) {
    const cuvantAscunsArr = cuvantAscuns.split("");
    let foundLetterNr = 0;
    for(let i = 1; i < cuvantSelectat.length-1; i++) {
        if(cuvantSelectat[i] === letter) {
            cuvantAscunsArr[i] = letter;
            foundLetterNr++;
        }
    }

    const won = checkIfWon();

    if(foundLetterNr === 0 && !won) {
        nrIncercari = nrIncercari - 1;
        const $nrIncercari = document.querySelector("#nr-incercari");
        $nrIncercari.innerHTML = nrIncercari;
    }

    cuvantAscuns = cuvantAscunsArr.join("");

    const $wordElement = document.querySelector(".word-container > h3");
    $wordElement.innerHTML = cuvantAscuns;
}

function checkIfWon() {
    if(nrIncercari > 0 && !cuvantAscuns.includes("_")) {
        alert("CASTIGATOR! i a yo");
        toggleLetterButtons(true);
        saveToLocalStorage("winner");
    } else if(nrIncercari <= 0 && cuvantAscuns.includes("_")) {
        nrIncercari = 0;
        toggleLetterButtons(true);
        alert("NECASTIGATOR");
        saveToLocalStorage("looser");
    }
}

function toggleLetterButtons(isDisabled = false) {
    const $letterButtons = document.querySelectorAll(".letters-container > button");

    $letterButtons.forEach(($btn) => {
        $btn.disabled = isDisabled;
    })
}

function saveToLocalStorage(status) {
    const date = new Date().toDateString();
    if(currentHistory !== null && Array.isArray(currentHistory)) {
        currentHistory.push({
            date: date,
            status: status
        });
        localStorage.setItem("history", JSON.stringify(currentHistory));
        return;
    }

    currentHistory = [{
        date: date,
        status: status
    }];
    localStorage.setItem("history", JSON.stringify(currentHistory));
}

