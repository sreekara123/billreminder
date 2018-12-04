function signUp() {
  firebase.auth().createUserWithEmailAndPassword("sreekara123@gmail.com", "123456").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

function signIn() {
  firebase.auth().signInWithEmailAndPassword("sreekara123@gmail.com", "123456").catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

function addEvent() {
  var event = {
    date: (new Date).toISOString(),
    eventName: "Hello World",
    description: "Testing"
  };
  var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
  ref.child("events").push(event);
  retrieveEvents();
}

function retrieveEvents() {
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).child("events").once("value", function(result) {
    result.forEach(function(child) {
      console.log(child.val().date);
    });
  });
}

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
    // Sign-out successful.
  }).catch(function(error) {
    console.log("error in signOut");
    // An error happened.
  });
}