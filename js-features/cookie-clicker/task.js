'use strict'

const cookieImage = document.getElementById("cookie");
let cookieClick = document.getElementById("clicker__counter");
let cookieSpeedClick = document.getElementById("clicker__speed__counter");
let todayTime = Date.now();
let previousClicks = 0;

cookieImage.onclick = function () {
    // new image size
    cookieImage.classList.contains('clicker__cookie') ? cookieImage.className = 'new__clicker__cookie' : cookieImage.className = 'clicker__cookie';

    // clicks count
    let currentClicks = parseInt(cookieClick.textContent);
    cookieClick.textContent = currentClicks + 1;



};