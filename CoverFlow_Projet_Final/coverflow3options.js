/*!
 * JavaScript coverflow.
 *
 * @by Théo Mahmoud Hamdan
 * N° étudiant 15601984
 * Email : m.hamdan@outlook.fr
 * @version 1.0
 */

;(function($){
    $.fn.responsiveGallery = function(option){
        var opts = $.extend({}, $.fn.responsiveGallery.defaults, option), //Plugin / configuration
            $rgWrapper = this,
            $obj2 = $rgWrapper.find('li'), //CoverFlowShow
            obj2Length = $obj2.length,
            support3d = Modernizr.csstransforms3d,
            support2d = Modernizr.csstransforms,
            FlowIndex = 0;
            compteur = 3,
            formCSS = 0,
            animatDuration = opts.animatDuration,
            touchX = 0;

        function getTransform3dCSS(tx,ty,ry,zIndex,opacity,visibility){
            return {
                '-webkit-transform' : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
                '-moz-transform'    : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
                '-o-transform'      : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
                '-ms-transform'     : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
                'transform'         : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
                'z-index'           : zIndex,
                'opacity'           : opacity,
                'visibility'        : visibility
            };
        }



        function getTransitionCSS(time,ease){
            return {
                '-webkit-transition': 'all '+time+'s '+ease,
                '-moz-transition': 'all '+time+'s '+ease,
                '-ms-transition': 'all '+time+'s '+ease,
                '-o-transition': 'all '+time+'s '+ease,
                'transition': 'all '+time+'s '+ease,
            }
        }

        function getTransform7CSS(){
            var cssArray;

            if(support3d){
                cssArray = [
                    getTransform3dCSS('-100%',  -400,   40,     -1, 0,  'hidden'),
                    getTransform3dCSS('0',      -350,   45,     -1, 1,  'visible'),

                    getTransform3dCSS('100%',   -300,   45,     0,  1,  'visible'),
                    getTransform3dCSS('200%',   -200,   40,     1,  1,  'visible'),
                    getTransform3dCSS('300%',   0,      0,      2,  1,  'visible'),
                    getTransform3dCSS('400%',   -200,   -40,    1,  1,  'visible'),
                    getTransform3dCSS('500%',   -300,   -45,    0,  1,  'visible'),

                    getTransform3dCSS('600%',   -350,   -45,    -1, 1,  'visible'),
                    getTransform3dCSS('700%',   -400,   -40,    -1, 0,  'hidden')
                ];
            }

            return cssArray;
        }

        function getTransform5CSS(){
            var cssArray;

            if(support3d){
                cssArray = [
                    getTransform3dCSS('-100%',  -400,   45,     -1, 0,  'hidden'),

                    getTransform3dCSS('0',      -300,   45,     0,  1,  'visible'),
                    getTransform3dCSS('100%',   -200,   45,     1,  1,  'visible'),
                    getTransform3dCSS('200%',   0,      0,      2,  1,  'visible'),
                    getTransform3dCSS('300%',   -200,   -45,    1,  1,  'visible'),
                    getTransform3dCSS('400%',   -300,   -45,    0,  1,  'visible'),

                    getTransform3dCSS('500%',   -400,   -45,    -1, 0,  'hidden')
                ];
            }

            return cssArray;
        }

        function getTransform3CSS(){
            var cssArray;

            if(support3d){
                cssArray = [
                    getTransform3dCSS('-100%',  -400,   45,     0,  0,  'hidden'),

                    getTransform3dCSS('0',      -300,   45,     1,  1,  'visible'),
                    getTransform3dCSS('100%',   0,      0,      2,  1,  'visible'),
                    getTransform3dCSS('200%',   -300,   -45,    1,  1,  'visible'),

                    getTransform3dCSS('300%',   -400,   -45,    0,  0,  'hidden')
                ];
            }

            return cssArray;
        }

    
        function elementdesection(fun){
            var $obj = [];

            $obj[0] = $obj2.eq(FlowIndex-1);
            fun(0,$obj[0]);
            for (var i=1;i<=compteur+1;i++) {
                var next = FlowIndex+i-1;
                if(next>=obj2Length){
                    next = next - obj2Length;
                }
                $obj[i] = $obj2.eq(next);
                fun(i,$obj[i]);
            }
        }

        function MouveCoverFlow(direction){
            anima = true;

            FlowIndex = direction + FlowIndex;
            if(FlowIndex < 0){
                FlowIndex = obj2Length - 1;
            }
            if(FlowIndex >= obj2Length){
                FlowIndex = 0;
            }
            elementdesection(function(i,$item){
                $item.css(formCSS[i]);
            });

            setTimeout(function(){
                anima = false;
            },animatDuration);
        }

        opts.$btn_next.on('click',function(e){
            !anima && MouveCoverFlow(+1);
            
        });
        opts.$btn_prev.on('click',function(e){
            !anima && MouveCoverFlow(-1);
            
        });

        $(window).on('resize', function(e){
            var wrapperWidth = $rgWrapper.width(),
                itemWidth = $obj2.eq(0).width();

            compteur = Math.round(wrapperWidth/itemWidth);
            
            if(compteur === 1){ //c'est l'image présente numéro 1
                formCSS = getTransform1CSS();
            } else if(compteur === 3){ //l'image présente numéro 3
                formCSS = getTransform3CSS();
            } else if(compteur === 5){ //l'image présente numéro 5
                formCSS = getTransform5CSS();
            } else {
                return;
            }

            FlowIndex = 0;
            MouveCoverFlow(0);
            setTimeout(function(){
                $obj2.css(getTransitionCSS(animatDuration/1000, 'ease-in-out'));
            },10); //ici on peut rajouter une animation, après avoir défini la position initiale.

        }).trigger('resize');

        //c'est une chaîne de retour
        return this;
    };
    $.fn.responsiveGallery.defaults = {
        animatDuration: 400, //la durée de l'animation en secondes
        $btn_prev: $('.responsiveGallery-btn_prev'),
        $btn_next: $('.responsiveGallery-btn_next')
    };
})(jQuery);


// Horizentale
(function($){
$.fn.covhoriz3D = function(args){

    var el = ({
        carousel_frame: $(this)
    });

    var size = el.carousel_frame.children().size(); 
    var panelSize = el.carousel_frame.width();
    var translateZ = Math.round( ( panelSize / 2 ) / Math.tan( Math.PI / size ) );

    el.carousel_frame.css({
        "transform": "rotateY(0deg) translateZ(-"+translateZ+"px)"
    })

    var rotateY = 0;
    var rotate_int = 0;
    var ry =  360/size;
    var box = 0;

    function mouvement_slid(){
        rotateY = ry*rotate_int;
        $("#test").text(rotateY+", "+rotate_int+", ");
        
        for(i = 0; i < size; i++){
            var z = (rotate_int*ry)+(i*ry);     
            el.carousel_frame.children("figure:eq("+i+")").css({
                "transform":"rotateY("+z+"deg ) translateZ("+translateZ+"px)" // bien préciser la direction du rond
                // il est donc horizental
            });
        }
        
        rotateY = 0;
        box = 0; // il vide le rotatY, il est réutilisable.
    }
    //gérer les directions à droite et à gauche
    mouvement_slid();

    $(".next").on("click", function(){
        rotate_int -=1;
        mouvement_slid();
    });

    $(".prev").on("click", function(){
        rotate_int +=1;
        mouvement_slid();
    });

    el.carousel_frame.children().on("click", function(){
        new_int = -1*$(this).index();
        if(new_int < rotate_int+(-1*(size/2)) ){
            rotate_int = size + new_int;
        } else {
            rotate_int = new_int;
        }

        mouvement_slid();
    }); 

}
})(jQuery);



// VERTICALEMENT

(function($){
$.fn.covrtical3D = function(args){

    var el = ({
        carousel_frame: $(this)
    });

    var size = el.carousel_frame.children().size(); 
    var panelSize = el.carousel_frame.width();
    var translateZ = Math.round( ( panelSize / 2 ) / Math.tan( Math.PI / size ) );

    el.carousel_frame.css({
        "transform": "rotateY(0deg) translateZ(-"+translateZ+"px)"
    })

    var rotateY = 0;
    var rotate_int = 0;
    var ry =  360/size;
    var box = 0;

    function mouvement_slid(){
        rotateY = ry*rotate_int;
        $("#test").text(rotateY+", "+rotate_int+", ");
        
        for(i = 0; i < size; i++){
            var z = (rotate_int*ry)+(i*ry);     
            el.carousel_frame.children("figure:eq("+i+")").css({
                "transform":"rotateX("+z+"deg ) translateZ("+translateZ+"px)" // bien préciser la direction du rond
                // il est donc horizental
            });
        }
        
        rotateY = 0;
        box = 0; // il vide le rotatY, il est réutilisable.
    }
    //gérer les directions à droite et à gauche
    mouvement_slid();

    $(".next").on("click", function(){
        rotate_int -=1;
        mouvement_slid();
    });

    $(".prev").on("click", function(){
        rotate_int +=1;
        mouvement_slid();
    });

    el.carousel_frame.children().on("click", function(){
        new_int = -1*$(this).index();
        if(new_int < rotate_int+(-1*(size/2)) ){
            rotate_int = size + new_int;
        } else {
            rotate_int = new_int;
        }

        mouvement_slid();
    }); 

}
})(jQuery);
