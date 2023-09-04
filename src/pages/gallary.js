"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var rows = 4; //change this also in css
  var cols = 6; //change this also in css
  var staggerTime = 150;

  var urls = [
    "https://source.unsplash.com/random/1920x1080?nature,water",
    "https://source.unsplash.com/random/1920x1080?nature,forest",
    "https://source.unsplash.com/random/1920x1080?nature,sky",
    "https://source.unsplash.com/random/1920x1080?city,night",
    "https://source.unsplash.com/random/1920x1080?city,day",
    "https://source.unsplash.com/random/1920x1080?mountain,snow",
    "https://source.unsplash.com/random/1920x1080?ocean,sunrise",
    "https://source.unsplash.com/random/1920x1080?desert,sunset",
    "https://source.unsplash.com/random/1920x1080?forest,fall",
    "https://source.unsplash.com/random/1920x1080?city,skyline",
    "https://source.unsplash.com/random/1920x1080?nature,river",
    "https://source.unsplash.com/random/1920x1080?nature,beach",
    "https://source.unsplash.com/random/1920x1080?city,street",
    "https://source.unsplash.com/random/1920x1080?mountain,summer",
    "https://source.unsplash.com/random/1920x1080?ocean,waves",
    "https://source.unsplash.com/random/1920x1080?desert,dunes",
    "https://source.unsplash.com/random/1920x1080?forest,winter",
    "https://source.unsplash.com/random/1920x1080?city,lights",
    "https://source.unsplash.com/random/1920x1080?nature,lake",
    "https://source.unsplash.com/random/1920x1080?nature,clouds",
    "https://source.unsplash.com/random/1920x1080?city,buildings",
    "https://source.unsplash.com/random/1920x1080?mountain,peak",
    "https://source.unsplash.com/random/1920x1080?ocean,underwater",
    "https://source.unsplash.com/random/1920x1080?desert,sky",
  ];

  var gallery = document.querySelector(".demo__gallery");
  var help = document.querySelector(".demo__help");
  var partsArray = [];
  var reqAnimFr = (function () {
    return (
      window.requestAnimationFrame ||
      function (cb) {
        setTimeout(cb, 1000 / 60);
      }
    );
  })();

  gallery.innerHTML = "";
  for (let row = 1; row <= rows; row++) {
    partsArray[row - 1] = [];
    for (let col = 1; col <= cols; col++) {
      gallery.innerHTML += `<div class="show-front demo__part demo__part-${row}-${col}" row="${row}" col="${col}"><div class="demo__part-back"><div class="demo__part-back-inner"></div></div><div class="demo__part-front"></div></div>`;
      partsArray[row - 1][col - 1] = new Part();
    }
  }

  var parts = document.querySelectorAll(".demo__part");
  var image = document.querySelector(".demo__part-back-inner");
  var helpText = true;

  for (let i = 0; i < parts.length; i++) {
    parts[i].querySelector(
      ".demo__part-front"
    ).style.backgroundImage = `url(${urls[i]})`;
  }

  gallery.addEventListener("click", function (e) {
    if (e.target.classList.contains("demo__part-front")) {
      image.style.backgroundImage = e.target.style.backgroundImage;
      if (helpText) {
        help.innerHTML = "Click any of the tiles to get back";
        helpText = false;
      }

      let row = +e.target.closest(".demo__part").getAttribute("row");
      let col = +e.target.closest(".demo__part").getAttribute("col");
      waveChange(row, col);
    }

    if (e.target.classList.contains("demo__part-back")) {
      if (!isShowingBack()) return;

      help.innerHTML = `Check out my other <a target="blank" href="https://codepen.io/kiyutink/">pens</a> and follow me on <a target="_blank" href="https://twitter.com/kiyutin_k">twitter</a>`;

      setTimeout(function () {
        for (let row = 1; row <= rows; row++) {
          for (let col = 1; col <= cols; col++) {
            partsArray[row - 1][col - 1].showing = "front";
          }
        }
      }, staggerTime + (parts.length * staggerTime) / 10);

      showFront(0, parts.length);
    }
  });

  function showFront(i, maxI) {
    if (i >= maxI) return;
    parts[i].classList.add("show-front");

    reqAnimFr(function () {
      showFront(i + 1);
    });
  }

  function isShowingBack() {
    return (
      partsArray[0][0].showing == "back" &&
      partsArray[0][cols - 1].showing == "back" &&
      partsArray[rows - 1][0].showing == "back" &&
      partsArray[rows - 1][cols - 1].showing == "back"
    );
  }

  function Part() {
    this.showing = "front";
  }

  function waveChange(rowN, colN) {
    if (rowN > rows || colN > cols || rowN <= 0 || colN <= 0) return;
    if (partsArray[rowN - 1][colN - 1].showing == "back") return;
    document
      .querySelector(".demo__part-" + rowN + "-" + colN)
      .classList.remove("show-front");
    partsArray[rowN - 1][colN - 1].showing = "back";
    setTimeout(function () {
      waveChange(rowN + 1, colN);
      waveChange(rowN - 1, colN);
      waveChange(rowN, colN + 1);
      waveChange(rowN, colN - 1);
    }, staggerTime);
  }
});
