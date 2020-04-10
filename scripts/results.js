
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
    
function addToDeck(i) {
    var storedimg = document.createElement("img")
    storedimg.src = document.getElementById("result" + i).src;
    storedimg.setAttribute('id', 'cardid' + i);
    document.getElementById("tempdecklist").appendChild(storedimg);
}
function removeFromDeck(i) {
    var element = document.getElementById('cardid' + i);
    let listtochange = document.getElementById('tempdecklist');
    listtochange.removeChild(element)
}
function saveDeck() {
    let divelements = document.getElementById("tempdecklist").querySelectorAll("img");
    let elementarray = [];

    for (let z = 0; z < divelements.length; z++) {
        elementarray.push(divelements[z]);
    }

    let myUser = firebase.auth().currentUser;

    if (myUser) {

        for (let x = 0; x < elementarray.length; x++) {
            let userdeckref = db.collection("users").doc(myUser.uid);
            userdeckref.update({
                deckarray: firebase.firestore.FieldValue.arrayUnion("" + x + elementarray[x].src)
            })
        }

    } else {

        for (let y = 0; y < elementarray.length; y++) {
            let deckref = db.collection("saveddecks").doc("deck");
            deckref.update({
                deckarray: firebase.firestore.FieldValue.arrayUnion("" + y + elementarray[y].src)
            });
        }
    }
    document.getElementById("tempdecklist").innerHTML = "Deck Saved!";
}

//Src values corresponding to ids.
var card1src = "images/giltgrove_stalker.png";
var card2src = "images/sworn_guardian.png";
var card3src = "vraskas_conquistador.png";
var card4src = "zealot_of_the_god-pharaoh.png";
var card5src = "images/brazen_freebooter.png";
var card6src = "images/naturalize.png";
var card7src = "images/luminous_bonds.png";
var card8src = "images/negate.png";
var card9src = "images/fortified_rampart.png";
var card10src = "images/dark_ritual.png";
function loadSavedDeck() {
    let divelements = document.getElementById("tempdecklist")
    let myUser = firebase.auth().currentUser;
    let myDocRef = db.collection("users").doc(myUser.uid).get().then(function (doc) {
        myDocRef = doc.data().deckarray;
    });

    divelements.innerHTML = '';
    setTimeout(function () {
        for (let i = 1; i < myDocRef.length; i++) {
            let inputstoredimg = document.createElement("img")
            let stringtotest = myDocRef[i]
            let count = 0;
            for (let k = 0; k < stringtotest.length; k++) {
                let test = parseInt(stringtotest.charAt(k));
                    if (isNaN(test)) {
                    break;
                }
                count++;
            }
            let inputstring = stringtotest.substr(count, stringtotest.length);
            inputstoredimg.src = inputstring;
            let change;
            switch (inputstring) {
                case card1src:
                    change = 1;
                    break;
                case card2src:
                    change = 2;
                    break;
                case card3src:
                    change = 3;
                    break;
                case card4src:
                    change = 4;
                    break;
                case card5src:
                    change = 5;
                    break;
                case card6src:
                    change = 6;
                    break;
                case card7src:
                    change = 7;
                    break;
                case card8src:
                    change = 8;
                    break;
                case card9src:
                    change = 9;
                    break;
                case card10src:
                    change = 10;
                    break;
                default:
                    change = 1;
            }
            inputstoredimg.style.width = "150px";
            inputstoredimg.style.height = "200px"
            inputstoredimg.setAttribute('id', 'cardid' + change);
            divelements.appendChild(inputstoredimg);
        }
    }, 1000);
}

//on load, get number of results from session data
//for each result item, create and display a result object.
//a result object holds the relative image path, add, remove, and marketplace buttons
function getSearchResults() {
    let outputContainer = document.getElementById("outputDisplay");
    let output = "";
    let length = sessionStorage.length;
    outputContainer.innerHTML = "";
    for (let i = 1; i <= length; i++) {
        if (i == 1) {
            outputContainer.innerHTML += "<div id='row" + i + "' class='row'>";
            output = document.getElementById("row" + i);
        }
        if ((i - 1) % 4 == 0 && i != 1) {
            outputContainer.innerHTML += "<div id='row" + i + "' class='row'></div>"
            output = document.getElementById("row" + i);
        }
        output.innerHTML += "<div class='col-md-3'><img id='result" + i + "' src='' width='247' height='345' /><div id='result" + i + "Buttons' class='py-2'></div></div>";

        let result = sessionStorage.getItem("result" + i);
        db.collection("cards").doc(result).get().then(function (doc) {
            document.getElementById("result" + i).src = doc.data().Img;
            document.getElementById("result" + i + "Buttons").innerHTML += "<button id='addResult" + i + "' type='button' class='btn btn-light pw-1' onclick='addToDeck(" + i + ")'>Add</button>";
            document.getElementById("result" + i + "Buttons").innerHTML += "<button id='marketResult" + i + "' type='button' class='btn btn-light pw-1' onclick='redirectBuy()'>Market</button>";
            document.getElementById("result" + i + "Buttons").innerHTML += "<button id='removeResult" + i + "' type='button' class='btn btn-light pw-1' onclick='removeFromDeck(" + i + ")'>Remove</button>";
        });

        if (i == length) {
            output.innerHTML += "</div>"
        }
    }

}

function redirectBuy() {
    window.location.replace("http://cardkingdom.com");
}




// assign references to the value of the name in our card collections database
let doc1Ref = db.collection('cards').doc('Card1').get().then(function (doc) {doc1Ref = doc.data().Name});
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
                sessionStorage.setItem('result' + resultCounter, "Card" + (i + 1));
                resultCounter++;
            } else {
                test = false;
            }
        }
        getSearchResults();
    }
});

getSearchResults();