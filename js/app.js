$( document ).ready(function(){

  function getAudio(id) {
    a = document.getElementById(id + "-audio");
    return a;
  }

  function playAudio(id){
    a = getAudio(id);
    length = getLength(a);
    showProgress(id, length);
    
    a.play();
  }

  function getLength(a){
    length = a.duration;
    return length;
  }

  function showProgress(id, length){
    id = "#" + id;
    transition = "transition: width " + length + "s linear;"
    $(id).find(".progress").attr("style", transition);
    $(id).addClass("playing");
    
    setTimeout(function(){
      $(id).removeClass("playing");
    }, length * 1000);
  }

  function randomMode() {
    var soundbites = $(".audio");
    var number = Math.floor(Math.random() * soundbites.length);
    var soundbite = soundbites[number];

    id = soundbite.id;
    a = getAudio(id);
    length = getLength(a);

    setTimeout(function(){ 
      a.play();
      showProgress(id, length);
      if ($("body").hasClass("random")) {
        randomMode();
      } else {
        return;
      }
    }, length * 800);
  }

  $(".audio").on("click", function(){
    playAudio(this.id);
  });

  $("#random-mode").on("click", function(){
    if ($("body").hasClass("random")) {
      $("body").removeClass("random");
    } else {
      $("body").addClass("random");
      randomMode();
    }
  });

});
