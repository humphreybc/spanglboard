$(document).ready(function() {

  function play_sound() {
    audio = new Audio('VideoRecord.ogg');
    audio.play()
  }

  $(document).on('click', '.box', function(e) {
    play_sound();
  });
});