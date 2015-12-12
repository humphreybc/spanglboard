var body = document.body;
var audioEls = document.getElementsByClassName("audio");
var soundbitesEl = document.getElementById("soundbites");
var audioFilesEl = document.getElementById("audio-files");

var soundbites = {"at-atlassian":"At Atlassian", 
                  "confused":"I’m getting confused again",
                  "whoops":"Whoops",
                  "simplicity":"Simplicity on the far side of complexity",
                  "sidebar":"Sidebar",
                  "design-serious":"We take design serious",
                  "laughter":"(Laughter)",
                  "grumpy":"I have a grumpy resting face",
                  "fuck-1":"Fuck 1",
                  "fuck-2":"Fuck 2",
                  "fuck-3":"Fuck 3",
                  "aim-to-design":"Our aim is to design",
                  "gibberish-1":"Gibberish 1",
                  "gibberish-2":"Gibberish 2",
                  "we-discovered":"We discovered",
                  "clear-throat":"(Clears throat)",
                  "bam":"Bam bam bam",
                  "right":"Right, yes, yep, yeah",
                  "jony-ive":"I don’t need to talk as slow as Jony Ive",
                  "uhm":"Uhm",
                  "simplifying":"Simplifying is freakin’ hard",
                  "jira":"JIRA 7",
                  "really":"Really?",
                  "flow":"Being in the flow",
                  "design-pm-teams":"Our design, PM&hellip;",
                  "effortless":"Create an effortless &amp; harmonious&hellip;",
                  "to-do-this":"To do this",
                  "hunga":"Do you have the hunga",
                  "really-understand-customers":"When we really understand&hellip;",
                  "whole-thing":"I try the whole thing otherwise it doesn’t work"
                  }

populateContent();
addClickHandlerToAudio();
addClickHandlerToRandomMode();
loadAudioFiles();

setTimeout(function() {
  playAudioFromUrl();
}, 300);

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

  history.replaceState("", document.title, window.location.pathname);

  setTimeout(function() {
    if (! body.classList.contains("random")) {
      return; 
    }
    randomMode();
  }, length * 900);
}

function populateContent() {
  for (var key in soundbites) {
    soundbitesEl.insertAdjacentHTML('beforeend', '<button id=' + key + ' class="box audio">' + soundbites[key] + '<span class="progress"></span></button>');
    audioFilesEl.insertAdjacentHTML('beforeend', '<audio id=' + key + '-audio' + ' src="assets/mp3/' + key + '.mp3" preload="auto" type="audio/mp3"></audio>');
  }
  soundbitesEl.insertAdjacentHTML('beforeend', '<button id="random-mode" class="box" title="Shuffler 9000™"><span id="random-mode-icon"></span></button>');
}

function addClickHandlerToAudio() {
  for (var i = 0; i < audioEls.length; i++) {
    audioEls[i].onclick = function() {
      playAudio(this.id);
      history.replaceState("", document.title, window.location.pathname + "#" + this.id);
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

function loadAudioFiles() {
  for (var i = 0; i < audioEls.length; i++) {
    a = getAudio(audioEls[i].id);
    a.load();
  }
}

function playAudioFromUrl() {
  var id = window.location.hash.substring(1);
  if (id !== "") {
    playAudio(id);
  }
}



