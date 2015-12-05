var body = document.body;
var audioEls = document.getElementsByClassName("audio");

addClickHandlerToAudio();
addClickHandlerToRandomMode();

function getAudio(id) {
  return document.getElementById(id + "-audio");
}

function getLength(a) {
  return a.duration;
}

function playAudio(id) {
  var a = getAudio(id);
  var length = getLength(a);
  showProgress(id, length);
  a.play();
  return length;
}

function toggleProgressBar(id, transition) {
  id = document.getElementById(id);
  var progressEl = id.children[0];
  progressEl.setAttribute("style", transition);
  id.classList.toggle("playing", transition);
}

function showProgress(id, length) {
  var transition = "transition: width " + length + "s linear;"
  toggleProgressBar(id, transition);

  setTimeout(function() {
    toggleProgressBar(id, false);
  }, length * 1000);
}

function randomSoundbite() {
  var number = Math.floor(Math.random() * audioEls.length);
  return audioEls[number];
}

function randomMode() {
  var id = randomSoundbite().id;
  var length = playAudio(id);

  setTimeout(function() {
    if (! body.classList.contains("random")) {
      return; 
    }
    randomMode();
  }, length * 900);
}

function addClickHandlerToAudio() {
  for (var i = 0; i < audioEls.length; i++) {
    audioEls[i].onclick = function() {
      playAudio(this.id);
    };
  }
}

function addClickHandlerToRandomMode() {
  var randomModeEl = document.getElementById("random-mode");
  randomModeEl.onclick = function() {
    if (body.classList.contains("random")) {
      body.className = "";
    } else {
      body.className = "random";
      randomMode();
    }
  };
}