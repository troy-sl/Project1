//Firebase configuration
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

function goToResults(){
    location.href = "results.html";
}

function loginButton(){
    location.href = "login.html";
}

// assign references to the value of the name in our card collections database
let doc1Ref = db.collection('cards').doc('Card1').get().then(function (doc) { doc1Ref = doc.data().Name });
let doc2Ref = db.collection('cards').doc('Card2').get().then(function (doc) { doc2Ref = doc.data().Name }); 
let doc3Ref = db.collection('cards').doc('Card3').get().then(function (doc) { doc3Ref = doc.data().Name });
let doc4Ref = db.collection('cards').doc('Card4').get().then(function (doc) { doc4Ref = doc.data().Name });
let doc5Ref = db.collection('cards').doc('Card5').get().then(function (doc) { doc5Ref = doc.data().Name });
let doc6Ref = db.collection('cards').doc('Card6').get().then(function (doc) { doc6Ref = doc.data().Name });
let doc7Ref = db.collection('cards').doc('Card7').get().then(function (doc) { doc7Ref = doc.data().Name });
let doc8Ref = db.collection('cards').doc('Card8').get().then(function (doc) { doc8Ref = doc.data().Name });
let doc9Ref = db.collection('cards').doc('Card9').get().then(function (doc) { doc9Ref = doc.data().Name });
let doc10Ref = db.collection('cards').doc('Card10').get().then(function (doc) { doc10Ref = doc.data().Name });


document.getElementById("inputCard").addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        sessionStorage.clear();
        let docRefArray = [doc1Ref, doc2Ref, doc3Ref, doc4Ref, doc5Ref, doc6Ref, doc7Ref, doc8Ref, doc9Ref, doc10Ref]
        let inputValue = document.getElementById("inputCard").value;
        let test = Boolean();
        let correct = "Card Exists"
        let resultCounter = 1;

        for (let i = 0; i < docRefArray.length; i++) {
            if (docRefArray[i].toLowerCase().includes(inputValue.toLowerCase())) {
                test = true;
                console.log(correct)
                sessionStorage.setItem('result' + resultCounter, "Card" + (i + 1));
                resultCounter++;
            } else {
                test = false;
            }
        }
        goToResults();
    }
});

