fetch("adatok.json")
            .then(response => response.json())
            .then(data => {

            var newPhoto = $("#current").text();
            var newImgId = "img_"+$("#current").text();
            var currentPhoto;
            var currentImgId;



            function init(){

                let v_image;

                for (var i = 0; i < data.length; i++) {

                    v_image =  '<img id="img_'+ i +'" class = "indexImages tooltip" src ='+ 'data:image/png;base64,' + data[i].img.data.$binary.base64 +'></img>';
                    $("#indexSection").append(v_image); 

                    v_image =  '<span class="tooltiptext">'+ data[i].name + '</span>'; 
                    $("#img_"+i).append(v_image); 

                };

                fillbigImage(newPhoto, newImgId, currentPhoto, currentImgId);

            };

            init();

            function fillbigImage(pNewPhoto, pNewImgId, pCurrentPhoto, pCurrentImgId) {

                bigImage.src = 'data:image/png;base64,' + data[pNewPhoto].img.data.$binary.base64;
                $('#bigText').text(data[pNewPhoto].name);

                var x=document.getElementById(pNewImgId);
                $(x).css("width","102px");
                $(x).css("height","112px");
                $(x).css("box-shadow","5px 5px 5px #ccc");
                $(x).css("-moz-box-shadow","5px 5px 5px #ccc");
                $(x).css("-webkit-box-shadow","5px 5px 5px #ccc");
                $(x).css("-khtml-box-shadow","5px 5px 5px #ccc");

                if ( pNewPhoto != pCurrentPhoto ) {

                    var x=document.getElementById(pCurrentImgId);
                    $(x).css("width","82px");
                    $(x).css("height","92px");
                    $(x).css("box-shadow","0px 0px 0px #ccc");
                    $(x).css("-moz-box-shadow","0px 0px 0px #ccc");
                    $(x).css("-webkit-box-shadow","0px 0px 0px #ccc");
                    $(x).css("-khtml-box-shadow","0px 0px 0px #ccc"); 
                }

                $("#current").text(newPhoto);

            };

            $(".indexImages").hover(function() {
                $(this).css("cursor", "pointer");
            });

            $("#bigImage").hover(function() {
                $(this).css("cursor", "context-menu");
            });


            $(".indexImages").on("click", function() {    
                
                currentImgId = newImgId;
                currentPhoto = newPhoto;


                let v_index = $(this).attr('id');

                newImgId = v_index;

                v_index = v_index.substr(v_index.indexOf("_")+1);
                newPhoto = v_index;

                fillbigImage(newPhoto, newImgId, currentPhoto, currentImgId);
                

            });    

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



