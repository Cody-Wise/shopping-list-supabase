import { 
    checkAuth,
    logout,
    createListItems,
    getShoppingItems,
    deleteItems,
    buyItems,

} from '../fetch-utils.js';

const deleteButtonEl = document.querySelector('#delete-button');
const formEl = document.querySelector('#shopping-list');
const listItemsEl = document.querySelector('.list-items');


checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(formEl);

    await createListItems({
        amount: data.get('amount'),
        item: data.get('item'),
        is_bought: false
    });

    formEl.reset();
    
});

deleteButtonEl.addEventListener('click', () => {

    deleteItems();
    

    
});


