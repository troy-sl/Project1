// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBFgFYer2UnXhOuTEes15a4V2apHWAjHj0",
    authDomain: "deckbuilderapp-a1118.firebaseapp.com",
    databaseURL: "https://deckbuilderapp-a1118.firebaseio.com",
    projectId: "deckbuilderapp-a1118",
    storageBucket: "deckbuilderapp-a1118.appspot.com",
    messagingSenderId: "643441263015",
    appId: "1:643441263015:web:7fd9857de51ac81c9af682"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function backButton(){
    window.history.back();
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    deckarray: ["placeholder"]
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("results.html");
                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
            } else {
                return true;
            }
            return false;
        },

        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'results.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'results.html',
    // Privacy policy url.
    privacyPolicyUrl: 'results.html',
    accountChooserEnabled: false
};
// The start method will wait until the DOM is loaded.
// Inject the login interface into the HTML
ui.start('#firebaseui-auth-container', uiConfig);

