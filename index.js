import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://champions-mobile-app-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

const database = getDatabase(app);

const endorsementListInDB = ref(database, "endorsementList");

const endorsementTextareaEl = document.getElementById("endorsement-textarea");
const fromInputFieldEl = document.getElementById("from-input");
const toInputFieldEl = document.getElementById("to-input");
const publishButtonEl = document.getElementById("publish-button")
const endorsementListDivEl = document.getElementById("endorsementList");


publishButtonEl.addEventListener("click", function() {
    
    clearEndorsementList();
    
    let inputValues = {
        endorsement: endorsementTextareaEl.value,
        from: fromInputFieldEl.value,
        to: toInputFieldEl.value,
        likes: Math.floor(Math.random() * 10)
    }
    
    push(endorsementListInDB, inputValues);
    
    clearInputFields();
})

onValue(endorsementListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        
        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i][1];
            let currentItemEndorsement = currentItem.endorsement;
            let currentItemFrom = currentItem.from;
            let currentItemTo = currentItem.to;
            let currentItemLikes = currentItem.likes;
            
            appendItemToEndorsementList(currentItemEndorsement, currentItemFrom, currentItemTo, currentItemLikes);
               
        }
    } else {
        endorsementListDivEl.innerHTML = "No endorsements here... yet"
    }
})

function clearInputFields() {
    endorsementTextareaEl.value = "";
    fromInputFieldEl.value = "";
    toInputFieldEl.value = "";
}

function clearEndorsementList() {
    endorsementListDivEl.innerHTML = "";
}

function appendItemToEndorsementList(endorsement, from, to, likes) {
    
    const endorsementDiv = document.createElement("div");
    endorsementDiv.classList.add("endorsements");

    const fromParagraph = document.createElement("p");
    fromParagraph.classList.add("from-to");
    fromParagraph.textContent = `To ${to}`;
    endorsementDiv.appendChild(fromParagraph);

    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = endorsement;
    endorsementDiv.appendChild(messageParagraph);

    const fromDiv = document.createElement("div");
    fromDiv.classList.add("from");

    const ToParagraph = document.createElement("p");
    ToParagraph.classList.add("from-to");
    ToParagraph.textContent = `From ${from}`;
    fromDiv.appendChild(ToParagraph);

    const likesParagraph = document.createElement("p");
    likesParagraph.classList.add("likes");
    likesParagraph.textContent = `❤️ ${likes}`;
    fromDiv.appendChild(likesParagraph);

    endorsementDiv.appendChild(fromDiv);

    endorsementListDivEl.appendChild(endorsementDiv);
}