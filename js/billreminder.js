/*index
*signIn - sign into the google account
*signOut - sign out of google account
*/

/*sign in using google account*/
function signIn() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		localStorage.setItem("accessToken", token);
		// The signed-in user info.
		var user = result.user;
		localStorage.setItem("userInfo", user);
		window.location.replace("mainpage.html");
		// ...
	}).catch(function(error) {
		alert("catch in sign in");
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});
}

/*sign out of the accout*/
function signOut() {
	firebase.auth().signOut().then(function() {
		localStorage.setItem("accessToken", "");
		localStorage.setItem("userInfo", "");
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
	});
}