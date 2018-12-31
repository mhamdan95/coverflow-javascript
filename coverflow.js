/*!
 * JavaScript coverflow.
 *
 * @by Théo Hamdan
 * @version 1.0
 */

(function($)
{
	
    $.fn.coverflow=function(elementID)
    {
       //Initialisation du plugin
	   var divID = '#' + elementID;
	   initCoverflow(divID);
	   handleEvt(divID);
    };
})(jQuery);

/**
* Cette fonction va initialiser le plugin
*/
function initCoverflow(elementID)
{
	//Création du bloc Coverflow
    $('<div id="coverflow-controls">').appendTo(elementID);
	
	//Ajout des controles (stop/play, next ...)
	$('<button class="coverflow-control-elmt stopestart">Démarrer</button>').appendTo(elementID + " #coverflow-controls");
}
 
/**
* Liaison avec les evenements
*/
function handleEvt(elementID)
{
    $(elementID + ' .stopestart').on('click', function () {
        alert("play/stop on instance " + elementID);
    });
}
