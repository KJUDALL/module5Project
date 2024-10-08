// var has been created for each section
const input = document.getElementById('item-input');
const listContainer = document.getElementById('list-container');
const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
const addButton = document.getElementById('add-button');


// this fx renders the grocery list and populates the trash icon
function renderGroceryItems() {
    listContainer.innerHTML = ''
    groceryItems.forEach(function (item) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item} <ion-icon name="trash-outline"></ion-icon>`;
        listContainer.append(listItem); // appends listItem to the container
        console.log(renderGroceryItems) // the console log shows this
    })
}

// adds eventListener to add-button
document.getElementById('add-button').addEventListener('click', function () {
    if (input.value.trim() !== '') {
        groceryItems.push(input.value);
        localStorage.setItem('groceryItems', JSON.stringify(groceryItems)); // Save input to local storage
        renderGroceryItems()
        input.value = '';
    }
});

// this fx ensures entire <li> line is removed after clicking the trash icon
listContainer.addEventListener('click', function (event) {
    const parentLi = event.target.closest("li")
    if (parentLi && event.target.name === "trash-outline") {
        console.log(parentLi.textContent) // this console logs the word that was deleted in the <li>
        const deletedItem = parentLi.textContent // removes the text
        const ind = groceryItems.findIndex(function (item) { return item === deletedItem })
        groceryItems.splice(ind, 1); // splice 
        localStorage.setItem('groceryItems', JSON.stringify(groceryItems)); // Update local storage upon item deletion
        renderGroceryItems();
    };
    /* In this fx, every time the trash icon is clicked, the page renders and populates the remaining <li>, if any. The console will indicate the specific <li> that was removed */
})

// this fx adds a new lineItem after clicking "enter" on keyboard
input.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) { // 13 is the keyCode for the enter key
        addButton.click(); // this will add a word upon clicking enter
    }
});

// Call on renderGroceryItems when the page loads
renderGroceryItems();

// Modal JS Functionality Implementation Below:

// Clicking the 'x' button in the top right or 'Let's Get Started!' button to close the Modal: 
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal');
    const modalButton = document.querySelector('.button');
    const closeButton = modal.querySelector('.delete');
    const startButton = modal.querySelector('.modal-card-foot .button');

    // Fx to open the modal
    function openModal() {
        modal.classList.add('is-active');
    }

    // Fx to close the modal
    function closeModal() {
        modal.classList.remove('is-active');
    }


    // Event listener for the 'x' button to close the modal
    closeButton.addEventListener('click', closeModal);

     // Event listener for the "Let's Get Started!" button to close the modal
     startButton.addEventListener('click', closeModal);
});