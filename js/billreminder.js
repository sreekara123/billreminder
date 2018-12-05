function signUp() {
  firebase.auth().createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}



function addEvent() {
  var event = {
    name: document.getElementById("billName").value,
    description: document.getElementById("billDes").value,
    amount: document.getElementById("amount").value,
    date: document.getElementById("enterdate").value
  };
  var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
  ref.child("events").push(event);
  //retrieveEvents();
}

var count = 0;

var arr = [];
function retrieveEvents2() {
  console.log("im here");
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).child("events").once("value", function(result) {
    result.forEach(function(child) {
      arr.push(child.val());
    });
  });
  retrieveEvents(() => console.log('huzzah, I\'m done!'));
}

function retrieveEvents() {
  count++;
  console.log("im here too");
  let len = 0;
  // arr.forEach(function(element) {
  //   console.log(len);
  //   len = len+1;
  // });
  let n = arr.length; 
  console.log(len);
  if(count%2 === 0) {
  for (var i = 0; i < n-1; i++) {
      for (var j = 0; j < n-i-1; j++) {
          if (arr[j].date > arr[j+1].date) 
          { 
              // swap temp and arr[i] 
              var temp = arr[j]; 
              arr[j] = arr[j+1]; 
              arr[j+1] = temp;
          } 
        }
      }
    }

      if(count % 2 === 0) {
        document.getElementsByClassName("main")[0].innerHTML = "";
        for(var i = 0; i < arr.length; i++) {

         //document.getElementsByClassName("main")[0].innerHTML += arr[i].date;
         //document.getElementsByClassName("main")[0].innerHTML += '<br>';
         if(new Date(arr[i].date) > new Date()) 
         //document.getElementsByClassName("main")[0].innerHTML += '<div class="w3-container"><h2>' + arr[i].name + '    ' + arr[i].date + '</h2><p>' + arr[i].description + '</p><hr></div><br>';
          document.getElementsByClassName("main")[0].innerHTML +="<div id=\"cont\"><div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + arr[i].name + "</h4><br><hr class=\"w3-clear\"><p>Date: " + arr[i].date + "<br> Description: " + arr[i].description + "<br> Amount: " + arr[i].amount + "</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div></div>";
        }
      }
      //console.log(arr);
      arr.length = 0;

}

// function sortEntries() {
//   console.log(n);
//   for (var i = 0; i < n-1; i++) {
//     console.log(i);
//             for (var j = 0; j < n-i-1; j++) {
//                 if (arr[j].date > arr[j+1].date) 
//                 { 
//                     // swap temp and arr[i] 
//                     console.log(arr[j].date);
//                     var temp = arr[j]; 
//                     arr[j] = arr[j+1]; 
//                     arr[j+1] = temp; 
//                 } 
//             }
//   }
// }

function addName() {
console.log(firebase.auth().currentUser.uid);
//alert(document.getElementById("fid").value);
firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
    firstName: document.getElementById("fid").value,
    lastName: document.getElementById("lid").value
})
}

function signOut() {
  firebase.auth().signOut().then(function() {
    console.log("successful signout");
    window.location.replace("mainpage.html")
    // Sign-out successful.
  }).catch(function(error) {
    console.log("error in signOut");
    // An error happened.
  });
}

function billForm() {
  console.log(document.getElementsByClassName("main")[0]);
  document.getElementsByClassName("main")[0].innerHTML = '<div id="display"><h2>Enter a new bill</h2><br><input class="w3-input" type="text" placeholder="Enter Bill Name" id="billName"><br><input class="w3-input" type="text" placeholder="Enter Bill Description" id="billDes"><br><input class="w3-input" type="text" placeholder="Enter Amount" id="amount"><br><input class="w3-input" type="date" placeholder="Enter Date" id="enterdate"><br><button class="button" onclick="addEvent()">Submit</button></div>';
  //document.getElementsByClassName("main")[0].innerHTML = '<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + arr[i].name + " " + arr[i].date + "</h4><br><hr class=\"w3-clear\"><p>Location: " + " " + "<br>Date: " + " " + "<br>ZipCode: " + " " + "<br> Description: " + arr[i].description + "<br> Date: " + " " + "</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div>';
}
var arr2 = [];
function dueTodayStart() {
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).child("events").once("value", function(result) {
    result.forEach(function(child) {
      arr2.push(child.val());
    });
  });
  console.log(arr2);
  dueToday(() => console.log('huzzah, I\'m done!'));
}
var count2 = 0;
function dueToday() {
  count2++;
  console.log("im here too");
  let len = 0;
  // arr.forEach(function(element) {
  //   console.log(len);
  //   len = len+1;
  // });
  let n = arr2.length; 
  if(count%2 === 0) {
  for (var i = 0; i < n-1; i++) {
      for (var j = 0; j < n-i-1; j++) {
          if (arr2[j].date > arr2[j+1].date) 
          { 
              // swap temp and arr[i] 
              var temp = arr[j]; 
              arr2[j] = arr2[j+1]; 
              arr2[j+1] = temp;
          } 
        }
      }
    }

      if(count2 % 2 === 0) {
        document.getElementsByClassName("main")[0].innerHTML = "";
        for(var i = 0; i < arr2.length; i++) {

         //document.getElementsByClassName("main")[0].innerHTML += arr[i].date;
         //document.getElementsByClassName("main")[0].innerHTML += '<br>';
         let d1 = new Date(arr2[i].date);
         let d2 = new Date();
         if(d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate()+1 === d2.getDate()) { 
          //document.getElementsByClassName("main")[0].innerHTML += '<div class="w3-container"><h2>' + arr2[i].name + '    ' + arr2[i].date + '</h2><p>' + arr2[i].description + '</p><hr></div><br>';
          document.getElementsByClassName("main")[0].innerHTML +="<div id=\"cont\"><div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + arr2[i].name + "</h4><br><hr class=\"w3-clear\"><p>Date: " + arr2[i].date + "<br> Description: " + arr2[i].description + "<br> Amount: " + arr2[i].amount + "</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div></div>";
         }
        }
      }
      //console.log(arr);
      arr2.length = 0;
}
var arr3 = [];
function savedBillsStart() {
  document.getElementsByClassName("main")[0].innerHTML = "";
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).child("events").once("value", function(result) {
  result.forEach(function(child) {
    document.getElementsByClassName("main")[0].innerHTML +="<div id=\"cont\"><div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + child.val().name + "</h4><br><hr class=\"w3-clear\"><p>Date: " + child.val().date + "<br> Description: " + child.val().description + "<br> Amount: " + child.val().amount + "</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div></div>";
  });
  });
  console.log(arr2);
}