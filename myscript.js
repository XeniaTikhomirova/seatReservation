let reservedSeats = {
   record1: {
      seat: "k154",
      owner: {
         fname: "Joe",
         Lname: "Smith"
      }
   },
   record2: {
      seat: "k155",
      owner: {
         fname: "Joe",
         lname: "Smith"
      }
   },
   record3: {
      seat: "k156",
      owner: {
         fname: "Joe",
         Lname: "Smith"
      }
   },
   record4: {
      seat: "k157",
      owner: {
         fname: "Joe",
         Iname: "Smith"
      }
   }
}

function makeRows(sectionLegth, rowLength, placement) {
   const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
   let html = "";
   let counter = 1;

   rows.forEach( row => {
      switch(placement) {
         case "right": counter = counter + (rowLength - sectionLegth) ; break;
         case "left": html += `<div class="label">${row}</div>`; break;
         default: counter = counter + ((rowLength - sectionLegth) / 2); break;
      }
      for (let i=0; i < sectionLegth; i++) {
         html += `<div class="a" id="${row + counter}">${counter}</div>`;
         counter++;
      }

      switch(placement) {
         case "right": html += `<div class="label">${row}</div>`; break;
         case "left": counter = counter + (rowLength - sectionLegth) ; break;
         default: counter = counter + ((rowLength - sectionLegth) / 2); break;
      }
   });
   document.getElementById(placement).innerHTML = html;
}
makeRows(3, 15, "left");
makeRows(9, 15, "middle");
makeRows(3, 15, "right");

(function(){
   "use strict";
   for (const key in reservedSeats) {
      if (reservedSeats.hasOwnProperty(key)) {
         const obj = reservedSeats[key];
         document.getElementById(obj.seat).className ="r";
         document.getElementById(obj.seat).innerHTML ="R";
      }
   };
}());

(function(){
   "use strict";

   let arrSeates = [];
   let allSeats = document.querySelectorAll(".a");

   allSeats.forEach(seat => {
      seat.addEventListener("click", (evt) => {
         evt.preventDefault();
         selectOrDelete(seat.id); 
      })
   })

   function selectOrDelete(thiseSeat){
      let index = arrSeates.indexOf(thiseSeat);
      if(index === -1){
         document.getElementById(thiseSeat).className = "s";
         arrSeates.push(thiseSeat);
      } else {
         document.getElementById(thiseSeat).className = "a";
         arrSeates.splice(index, 1);
      }
   }

   const resForm = document.getElementById("reserve");
   const sectionForm = document.getElementById("resform");
   const cancelForm = document.getElementById("cancel");

   resForm.addEventListener("click", function(evt){
      evt.preventDefault();
      sectionForm.style.display = "block";
   })

   cancelForm.addEventListener("click", function(evt){
      evt.preventDefault();
      sectionForm.style.display = "none";
   })





}())











