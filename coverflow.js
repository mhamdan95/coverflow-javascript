/*!
 * JavaScript coverflow.
 *
 * @by Théo Mahmoud Hamdan
 * @version 1.0
 */

(function($){  
    $.fn.numbertext=function(elementID)
    {
       //Initialisation du plugin
     var divID = '#' + elementID;
     plusSlides(divID);
     currentSlide(divID);
     showSlides(divID);
     initCoverflow(divID);
    };
})(jQuery);


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

function initCoverflow(elementID)
{
  //Création du bloc Coverflow
    $('<div id="coverflow-controls">').appendTo(elementID);

  
  //Ajout des controles (stop/play, next ...)
  $('<button class="coverflow-control-elmt stopestart">Demarrer</button>').appendTo(elementID + " #coverflow-controls");
}
