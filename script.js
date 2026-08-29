import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js"
import { getDatabase,
         ref,
         push,onValue,remove } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://lead-tracker-app-e1ce7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-list")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    if(ulEl.value !== ""){
        let listItems = ""
            for (let i = 0; i < leads.length; i++) {
                listItems += `
                    <li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                    </li>
                `
            }
            ulEl.innerHTML = listItems
    }
}


onValue(referenceInDB, function(snapshot){

    const snapshotifexists = snapshot.exists()
    if (snapshotifexists) {
        const snapshotValues = snapshot.val()
        const leads= Object.values(snapshotValues)
        render(leads)
    }



})



deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
    
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

