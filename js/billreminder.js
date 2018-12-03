/*index
*signIn - sign into the google account
*signOut - sign out of google account
*/

/*sign in using google account*/
// function signIn() {
// 	var provider = new firebase.auth.GoogleAuthProvider();
// 	firebase.auth().signInWithPopup(provider).then(function(result) {
// 		// This gives you a Google Access Token. You can use it to access the Google API.
// 		var token = result.credential.accessToken;
// 		localStorage.setItem("accessToken", token);
// 		// The signed-in user info.
// 		var user = result.user;
// 		localStorage.setItem("userInfo", user);
// 		  // Make sure there is a valid user object
// 	  	if (user) {
// 		    var script = document.createElement("script");
// 		    script.type = "text/javascript";
// 		    script.src = "https://apis.google.com/js/api.js";
// 		    // Once the Google API Client is loaded, you can run your code
// 		    script.onload = function(e) {
// 		      // Initialize the Google API Client with the config object
// 		      gapi.client
// 		        .init({
// 		          apiKey: config.apiKey,
// 		          clientId: config.clientID,
// 		          discoveryDocs: config.discoveryDocs,
// 		          scope: config.scopes.join(" ")
// 		        })
// 		        // Loading is finished, so start the app
// 		        .then(function() {
// 		          // Make sure the Google API Client is properly signed in
// 		          if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
// 		            startApp(user);
// 		          } else {
// 		            firebase.auth().signOut(); // Something went wrong, sign out
// 		          }
// 		        });
// 		    };
//     		// Add to the document
//     		document.getElementsByTagName("head")[0].appendChild(script);
//         }
// 		//	window.location.replace("mainpage.html");
// 		// ...
// 	}).catch(function(error) {
// 		alert("catch in sign in");
// 		// Handle Errors here.
// 		var errorCode = error.code;
// 		var errorMessage = error.message;
// 		// The email of the user's account used.
// 		var email = error.email;
// 		// The firebase.auth.AuthCredential type that was used.
// 		var credential = error.credential;
// 		// ...
// 	});
// }

// /*sign out of the accout*/
// function signOut() {
// 	firebase.auth().signOut().then(function() {
// 		console.log("successful logout");
// 		localStorage.setItem("accessToken", "");
// 		localStorage.setItem("userInfo", "");
// 		// Sign-out successful.
// 	}).catch(function(error) {
// 		console.log("error in logout");
// 		// An error happened.
// 	});
// }

// function check() {
//   	var ref = firebase.database().ref('Players');
// 	console.log(ref);

// }

// // Print out the User and the 10 latest calendar events
// function startApp(user) {
// 	console.log(user);
// 	firebase.auth().currentUser.getToken()
// 	.then(function(token) {
// 	    return gapi.client.calendar.events.list({
// 	    	calendarId: "primary",
// 	    	timeMin: new Date().toISOString(),
// 	    	showDeleted: false,
// 	    	singleEvents: true,
// 	    	maxResults: 10,
// 	    	orderBy: "startTime"
// 	    })  
// 	})
// 	.then(function(response) {
// 	    console.log(response);  
// 	});
// }

var uiConfig = {
  signInSuccessUrl: "localhost:5000", // Assuming you are running on your local machine
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: config.scopes
    }
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>"
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

// This function will trigger when there is a login event
firebase.auth().onAuthStateChanged(function(user) {
  console.log(user)
  // Make sure there is a valid user object
  if (user) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://apis.google.com/js/api.js";
    // Once the Google API Client is loaded, you can run your code
    script.onload = function(e) {
      // Initialize the Google API Client with the config object
      gapi.client
        .init({
          apiKey: config.apiKey,
          clientId: config.clientID,
          discoveryDocs: config.discoveryDocs,
          scope: config.scopes.join(" ")
        })
        // Loading is finished, so start the app
        .then(function() {
          // Make sure the Google API Client is properly signed in
          if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            startApp(user);
          } else {
            firebase.auth().signOut(); // Something went wrong, sign out
          }
        });
    };
    // Add to the document
    document.getElementsByTagName("head")[0].appendChild(script);
  }
});

function startApp(user) {
  console.log(user);
  
  // Make sure to refresh the Auth Token in case it expires!
  firebase.auth().currentUser.getToken()
  .then(function(){
   return gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    })
  })
  .then(function(response) {
    console.log(response);
  });
}  