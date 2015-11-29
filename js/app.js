$( document ).ready(function(){

  function playAudio(id){
    a = document.getElementById(id + "-audio");
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
    $(id).addClass("active");
    
    setTimeout(function(){
      $(id).removeClass("active");
    }, length * 1000);
  }

  $(".box").on( "click", function(){
    playAudio(this.id);
  });

});