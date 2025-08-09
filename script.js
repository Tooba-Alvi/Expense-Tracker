const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus'); 
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text")
const amount = document.getElementById('amount');

// const dumyTransactions =[
//     {id:1 , text: "Flower" , amount:-20   },
//     {id:2 , text: "Salary" , amount:300   },
//     {id:3 , text: "Book" , amount:-10   },
//     {id:4 , text: "camera" , amount:150   },
// ];


const localStorageTransactions = JSON.parse(localStorage.getItem("Transactions"));

let Transactions = localStorage.getItem("Transactions") !== null ? localStorageTransactions : [];


// Add default balance if there are no transactions
function addDefaultBalance() {
    if (Transactions.length === 0) {
        const defaultTransaction = {
            id: genereteID(),
            text: "Initial Balance",
            amount: 10000,
        };
        Transactions.push(defaultTransaction);
        updateLocalStorage();
    }
}


//add Transaction
function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim()===""|| amount.value.trim()===""
    ){
        alert("Please Enter Text and Value")
    }else{
        const transaction ={
            id:  genereteID(),
            text:  text.value,
            amount:  +amount.value,
        }; 
        Transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value="";
        amount.value="";
     
    }
    

}

// Generete id
function genereteID(){
    return Math.floor(Math.random()*10000000); 
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    ); 

    item.innerHTML=`
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})" >X</button>`; 

    list.appendChild(item);

}

// remove transction
function removeTransaction(id){
    Transactions =Transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage(); 
    Init();
}

//update updatevalues

function updateValues(){
    const amounts = Transactions.map(transaction =>  transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc,item)=>(acc+=item),0)*-1
    ).toFixed(2);
    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;


}

//Update Local Storage
// function updateLocalStorage(){
//     localStorage.setItem("Transactions", JSON.stringify(Transactions));

// }

// Update Local Storage
function updateLocalStorage() {
    try {
        localStorage.setItem("Transactions", JSON.stringify(Transactions));
    } catch (error) {
        console.error('Error updating local storage:', error);
    }
}

//Init App
function Init(){
    list.innerHTML="";
    addDefaultBalance();
    Transactions.forEach(addTransactionDOM);
    updateValues();
}
Init();
// addTransactionDOM(Transactions);
form.addEventListener("submit",addTransaction);
// // Add event listener for the button with class "btn"
// document.querySelector('.btn').addEventListener('click', function() {
//     Init();
// });





