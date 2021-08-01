"use strict";

fetch("adatok.json").then(function (response) {
  return response.json();
}).then(function (data) {
  //console.log(data[0].img.data.$binary.base64)
  //let kep = window.atob(data[0].img.data.$binary.base64)
  var kep = data[0].img.data.toString('base64');
  var img = document.createElement('img'); //img.src = 'data:image/png;base64,' + data[0].img.data.$binary.base64;

  img.src = 'data:image/png;base64,' + kep.toString('base64'); //  "data:image/<%=image.img.contentType%>;base64, <%=image.img.data.toString('base64')%>"

  document.body.appendChild(img);
  console.log(data[0].name);
  console.log(data[0].img.data);
});