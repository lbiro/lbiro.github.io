"use strict";

fetch("adatok.json").then(function (response) {
  return response.json();
}).then(function (data) {
  //console.log(data[0].img.data.$binary.base64)
  //let kep = window.atob(data[0].img.data.$binary.base64)

  /*
              for (var i = 0; i < data.length; i++) {
  
                  var img = document.createElement('img');
                  img.src = 'data:image/png;base64,' + data[i].img.data.$binary.base64;
                  document.body.appendChild(img);
  
              }
  */
  bigImage.src = 'data:image/png;base64,' + data[0].img.data.$binary.base64; // document.body.appendChild(bigImage);

  document.section.appendChild(bigImage);
});