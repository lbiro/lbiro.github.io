fetch("adatok.json")
            .then(response => response.json())
            .then(data => {
                //console.log(data[0].img.data.$binary.base64)
                //let kep = window.atob(data[0].img.data.$binary.base64)

            var currentPhoto = 0;
            let v_image;

            for (var i = 0; i < data.length; i++) {
                /* 
                var img = document.createElement('img');
                img.src = 'data:image/png;base64,' + data[i].img.data.$binary.base64;
                document.body.appendChild(img);
                */
                v_image =  '<img id="img_'+ i +'" src ='+ 'data:image/png;base64,' + data[i].img.data.$binary.base64 +'></img>';
                $("#indexSection").append(v_image); 

                //console.log(v_image);  

            }

            $("img").hover(function() {
                $(this).css("cursor", "pointer")
            })

            $("#bigImage").hover(function() {
                $(this).css("cursor", "context-menu")
            })


            $("img").on("click", function() {                
                let v_index = $(this).attr('id');
                v_index = v_index.substr(v_index.indexOf("_")+1);
                currentPhoto = v_index;
                
                bigImage.src = 'data:image/png;base64,' + data[currentPhoto].img.data.$binary.base64;
                $('#bigText').text(data[currentPhoto].name);

                console.log(currentPhoto);
                
                //console.log(data.length);
            });    

            $("#bigImage").click(() => {
               ;
            });    

            bigImage.src = 'data:image/png;base64,' + data[currentPhoto].img.data.$binary.base64;
            $('#bigText').text(data[currentPhoto].name);


// a kép áttűnésnél járok
// http://css3.bradshawenterprises.com/cfimg/
// css image fade


});



