'use strict'
let getHole = index => document.getElementById(`hole${index}`);
let deadMole = document.getElementById('dead');
let lostMole = document.getElementById('lost');
let wings = parseInt(deadMole.textContent);
let losts = parseInt(lostMole.textContent);

function checkGame(deadMole, lostMole) {
    console.log(deadMole, lostMole);
    if (deadMole === 10) {
        alert("Вы победили!");
        location.reload();
    } else if (lostMole === 5) {
        alert("Вы проиграли!");
        location.reload();
    };
};

for (let i = 1; i <= 9; i++) {
    getHole(i).onclick = function () {
        if (this.className.includes('hole_has-mole')) {
            wings += 1;
            deadMole.textContent = wings;
        } else {
            losts += 1;
            lostMole.textContent = losts;
        };
        checkGame(wings, losts);
    };
};