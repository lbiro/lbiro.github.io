// az összes képet és adatot (jelen esetben a színésznők neveit) az adatok.json fájlból olvasom fel, 
// eredetileg egy mongodb collection volt amit kiexportáltam, sajnos a mongo a képek tárolásánál és
// visszaolvasásánál végez egy plussz konverziót, így az eredetit nem tudtam felhasználni, így kicseréltem
// a fizikai képek base64-re kódolt verziójával
// a [0]-k elem pluszban megkapta a background és a két nyíl képét

fetch("adatok.json")
            .then(response => response.json())
            .then(data => {

            var newPhoto = $("#current").text();
            var newImgId = "img_"+$("#current").text();
            var currentPhoto;
            var currentImgId;

            function init(){

                let v_image;

                // navigációs nyilak
                $("#leftArrow").attr("src",data[0].leftArrow);
                $("#rightArrow").attr("src",data[0].rightArrow);


                // background beállítás, a háttér kép az adatok.json [0]-ban van eltárolva
                $("#foDiv").css("background","-webkit-gradient(linear, left top, left bottom, from(rgba(10, 10, 10, 0.6)), to(rgba(0, 0, 0, 0.9))), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px)");
                $("#foDiv").css("background",'linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("' + data[0].background + '")');

                $("#foDiv").css("background-repeat","no-repeat");
                $("#foDiv").css("background-blend-mode","luminosity");
                $("#foDiv").css("background-size","cover");
                $("#foDiv").css("background-position","center");

                // indexképek felolvasása
                for (var i = 0; i < data.length; i++) {

                    v_image =  '<div id="div_' + i + '">' +
                               '<img id="img_'+ i +'" class = "indexImages" src ='+ 'data:image/png;base64,' + data[i].img.data.$binary.base64 +'>' +
                               '<span id="span_' + i + '" class="spanTooltip">'+ data[i].name + '</span>' +
                               '</div>';

                    $("#indexSection").append(v_image); 

                };

                fillbigImage(newPhoto, newImgId, currentPhoto, currentImgId);

            };

            // inicializálom a weboldalt
            init();

            // nagy kép töltése mindenhonnan, kattintás léptetés, első betöltés
            function fillbigImage(pNewPhoto, pNewImgId, pCurrentPhoto, pCurrentImgId) {

                bigImage.src = 'data:image/png;base64,' + data[pNewPhoto].img.data.$binary.base64;
                $('#bigText').text(data[pNewPhoto].name);

                // megnő az index kép
                var x=document.getElementById(pNewImgId);
                $(x).css("width","102px");
                $(x).css("height","112px");
                $(x).css("box-shadow","5px 5px 5px #ccc");
                $(x).css("-moz-box-shadow","5px 5px 5px #ccc");
                $(x).css("-webkit-box-shadow","5px 5px 5px #ccc");
                $(x).css("-khtml-box-shadow","5px 5px 5px #ccc");

                if ( pNewPhoto != pCurrentPhoto ) {
                    // összemegy az index kép
                    var x1=document.getElementById(pCurrentImgId);
                    $(x1).css("width","82px");
                    $(x1).css("height","92px");
                    $(x1).css("box-shadow","0px 0px 0px #ccc");
                    $(x1).css("-moz-box-shadow","0px 0px 0px #ccc");
                    $(x1).css("-webkit-box-shadow","0px 0px 0px #ccc");
                    $(x1).css("-khtml-box-shadow","0px 0px 0px #ccc"); 
                }

                $("#current").text(newPhoto);

            };

            // index kép egérmutató + tooltip
            $(".indexImages").hover(function(handlerIn, handlerOut) {
                $(this).css("cursor", "pointer");

                // a tooltip box miatt kell
                let v_i = '';
                v_i = $(this).attr('id');

                v_i = "#span_"+v_i.substr(v_i.indexOf("_")+1);

                $(v_i).css("display", "block");

                $(this).mouseleave(function() {
                    $(v_i).css("display", "none");
                });

            });

            // index kép klikk esemény
            $(".indexImages").on("click", function() {    

                currentImgId = newImgId;
                currentPhoto = newPhoto;


                let v_index = $(this).attr('id');

                newImgId = v_index;

                v_index = v_index.substr(v_index.indexOf("_")+1);
                newPhoto = v_index;

                fillbigImage(newPhoto, newImgId, currentPhoto, currentImgId);
                

            });    

            // jobbra nyíl esemény
            $("#rightArrow").click(() => {

                newPhoto = $("#current").text();
                newImgId = "img_"+$("#current").text();

                currentImgId = newImgId;
                currentPhoto = newPhoto;

                if ( newPhoto <= data.length-2 ) {
                    ++newPhoto;
                    newImgId = "img_" + newPhoto.toString();
                }
                else {
                    newPhoto=0;
                    newImgId = "img_" + newPhoto.toString();
                }

                fillbigImage(newPhoto, newImgId, currentPhoto, currentImgId);

            });

            // balra nyíl esemény
            $("#leftArrow").click(() => {

                newPhoto = $("#current").text();
                newImgId = "img_"+$("#current").text();

                currentImgId = newImgId;
                currentPhoto = newPhoto;


                if (newPhoto != 0) {
                    --newPhoto;
                    newImgId = "img_" + newPhoto.toString();
                }
                else {
                    newPhoto=data.length-1;
                    newImgId = "img_" + newPhoto.toString();
                }

                fillbigImage(newPhoto, newImgId, currentPhoto, currentImgId);

            });
            


// a kép áttűnésnél járok
// http://css3.bradshawenterprises.com/cfimg/
// css image fade


});



