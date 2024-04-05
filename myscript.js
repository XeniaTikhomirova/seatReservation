// examlpe object with data as we had our db:
let reservedSeats = {
   record1: {
      seat: "k154",
      owner: {
         fname: "Anna",
         Lname: "Schmidt"
      }
   },
   record2: {
      seat: "k155",
      owner: {
         fname: "Sabina",
         lname: "Mauer"
      }
   },
   record3: {
      seat: "k156",
      owner: {
         fname: "Stephanie",
         Lname: "Schreier"
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
// Creating the seats (recieving 3 parameters - qantity od seats in a section, lenght of the entire row, section):
function makeRows(sectionLength, rowLength, placement) {
   // each letter from "a" to "t" is a row:
   const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
   let html = "";
   let counter = 1;

   rows.forEach( row => {
      // using break after each "case" is necessary!
      // switch recieve a par reliang on left/right hand side of the section, we a filling each row from left to right (letter -> 3 seats -> 9 seats -> 3 seats -> letter again):
      switch(placement) {
         // if "right": first we need to define number of a upcomming seat (with the help of calculation), ex: 2 + (15 - 9) = 7:
         case "left": html += `<div class="label">${row}</div>`; break;
         case "right": counter = counter + (rowLength - sectionLength) ; break;
         // counter = 4 from the first calling this func ( (4 = 1 + ((15 - 9) / 2) ):
         default: counter = counter + ((rowLength - sectionLength) / 2); break;
      }
      // filling each section with seats, according to the counter, after first filling section with seats № 1-3, counter = 4, this value we use in the next switch statement:
      for (let i=0; i < sectionLength; i++) {
         html += `<div class="a" id="${row + counter}">${counter}</div>`;
         counter++;
      }
      // after first filling section with seats № 1-3, counter = 4:
      switch(placement) {
         // 16 = 4 + (15 - 3) -> this would be a startins seat from the section under the letter "b":
         case "left": counter = counter + (rowLength - sectionLength) ; break;
         case "right": html += `<div class="label">${row}</div>`; break;
         default: counter = counter + ((rowLength - sectionLength) / 2); break;
      }
   });
   document.getElementById(placement).innerHTML = html;
}
// We should run the func makeRows 3 times, because we have 3 rows with 3 - 9 -2 seats in each one:
makeRows(3, 15, "left");
makeRows(9, 15, "middle");
makeRows(3, 15, "right");

(function(){
   "use strict";
   let arrSeates = [];
   let allSeats = document.querySelectorAll(".a");

   // to mark seats as reserved seats from the very above obejct:
   for (const key in reservedSeats) {
      if (reservedSeats.hasOwnProperty(key)) {
         const obj = reservedSeats[key];
         document.getElementById(obj.seat).className ="r";
         document.getElementById(obj.seat).innerHTML ="R";
      }
   };
   // to listen to "click" event on clicked seat:
   allSeats.forEach(seat => {
      seat.addEventListener("click", evt => {
         evt.preventDefault();
         selectOrDelete(seat.id); 
      })
   })

   // when seat (thisSeat) is clicked we should run some checks:
   function selectOrDelete(thisSeat){
      // using indexOf() to check if the choosen seat (thisSeat) is in the arr, if not - it returns "-1", otherweise actual index of seat in the row:
      let index = arrSeates.indexOf(thisSeat);
      // check first if the seat was earlier reserved:
      //"r" stands for "reserved":
      if(!document.getElementById(thisSeat).classList.contains("r")) {
         //if seat is free it will return "-1" (or not find), adding in arr:
         if(index === -1){
            // "s" stands for "selected":
            document.getElementById(thisSeat).className = "s";
            // addding in arr:
            arrSeates.push(thisSeat);
         // if seat was found (index != -1), we should delete it from the array (normaly it happens whrn user has changed his mind and whant another seat or no seat at all):
         } else {
            // "a" stands for "available":
            document.getElementById(thisSeat).className = "a";
            arrSeates.splice(index, 1);
         }
         // call this func to check if the user clicked on some seat:
         manageDisplayForm();
      }
   }
   // const to work later with (look the index2.html file):
   const resForm = document.getElementById("reserve");
   const sectionForm = document.getElementById("resform");
   const cancelForm = document.getElementById("cancel");
   const confForm = document.getElementById("confirmres");
   const selectedSeates = document.getElementById("selectedseats");

   // if the btn was clicked:
   resForm.addEventListener("click", evt => {
      evt.preventDefault();
      // we show the form:
      sectionForm.style.display = "block";
      // call this func to check if the user clicked on some seat:
      manageDisplayForm();
   })
    // if the btn was clicked:
   cancelForm.addEventListener("click", evt => {
      evt.preventDefault();
      // we hide the form:
      sectionForm.style.display = "none";
   })

   // call this func to check if the user clicked on some seat and show right message inside form:
   function manageDisplayForm(){
      // no seats choosen:
      if(arrSeates.length < 1){
         confForm.style.display = "none";
         // appropriate message:
         selectedSeates.innerHTML = `You have selected no Seats. Please, choose the seat <br><p><a href="#" id="error">Close</a></p>`;
         document.getElementById("error").addEventListener("click", evt => {
            evt.preventDefault();
            sectionForm.style.display ="none";
         })
      } else {
         // we need to get the right if chosen seats:
         let selectedSeatesMessage1 = arrSeates.length; 
         let selectedSeatesMessage2 = arrSeates.toString();
         let selectedSeatesMessage3 = "Seat";
         
         // to add more spaces to show message more readable way (using RegEx):
         selectedSeatesMessage2 = selectedSeatesMessage2.replace(/,/g, ", ");
         selectedSeatesMessage2 = selectedSeatesMessage2.replace(/,(?=[^,]*$)/, " and");

         // we have 1 or more seat, we make the form visible:
         confForm.style.display = "block";

         // to make message correct in terms of quantity of selected seats:
         if(arrSeates.length > 1){
            selectedSeatesMessage3 += "s" //"Seats" will be shown, when we have more than 1 seat
         } 
         //final correct message:
         selectedSeates.innerHTML = `You have selected ${selectedSeatesMessage1} ${selectedSeatesMessage3}: ${selectedSeatesMessage2}`;
      }
   }
   // call this func to check if the user clicked on some seat:
   manageDisplayForm();

   document.getElementById("confirmbtn").addEventListener("click", evt => {
      evt.preventDefault();
      // call this func to check if the user clicked on some seat:
      manageConfirmation();
   })
   
   // add seats in the temprory memory -> change the user interface
   function manageConfirmation() {

      let fname = document.getElementById("fname").value;
      let lname = document.getElementById("lname").value;

      // get the number of existing orders, to continue this row correctly:
      const hardCoreRecords = Object.keys(reservedSeats).length; // 4
      let counter = 1;
      let nextRecord = "";

      arrSeates.forEach(function(thisSeat){
         // change style and HTML:
         document.getElementById(thisSeat).className = "r";
         document.getElementById(thisSeat).innerHTML = "R";
         nextRecord = `record${hardCoreRecords + counter}`;
         reservedSeats[nextRecord] = {
            nextRecord: {
               thisSeat: "k154",
               owner: {
                  fname: fname,
                  lname: lname
               }
            },
         };
         // we should increment counter to be able continue the row in the richt sequence:
         counter++;
      });
      // we should clean all up, to be able book once again:
      manageDisplayForm();
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      sectionForm.style.display = "none";
      arrSeates = [];
   };

}())
