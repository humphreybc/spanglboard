$(document).ready(function() {

  var body = $("body");

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
    $(id).find(".progress").attr("style", transition);
    $(id).toggleClass("playing", transition);
  }

  function showProgress(id, length) {
    var id = "#" + id;
    var transition = "transition: width " + length + "s linear;"
    toggleProgressBar(id, transition);

    setTimeout(function() {
      toggleProgressBar(id, false);
    }, length * 1000);
  }

  function randomSoundbite() {
    var soundbites = $(".audio");
    var number = Math.floor(Math.random() * soundbites.length);
    return soundbites[number];
  }

  function randomMode() {
    var id = randomSoundbite().id;
    var length = playAudio(id);

    setTimeout(function() {
      if (! body.hasClass("random")) {
        return; 
      }
      randomMode();
    }, length * 900);
  }

  $(".audio").on("click", function() {
    playAudio(this.id);
  });

  $("#random-mode").on("click", function() {
    if (body.hasClass("random")) {
      body.removeClass("random");
    } else {
      body.addClass("random");
      randomMode();
    }
  });
});