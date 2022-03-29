import { 
    checkAuth,
    logout,
    createListItems,
    getShoppingItems,
    deleteItems,
    buyItems,
    unBuyItems,

} from '../fetch-utils.js';

import { renderItem } from '../render-utils.js';

const deleteButtonEl = document.querySelector('#delete-button');
const formEl = document.querySelector('#shopping-list');
const listItemsEl = document.querySelector('.list-items');
const loadingEl = document.querySelector('.loading-spinner');



checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

function toggleLoadingSpinner(){
    loadingEl.classList.toggle('invisible');
}



formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(formEl);

    await createListItems({
        amount: data.get('amount'),
        item: data.get('item'),
        is_bought: false
    });

    formEl.reset();

    await fetchAndDisplayItems();
    
});

deleteButtonEl.addEventListener('click', async () => {

    await deleteItems();

    await fetchAndDisplayItems();


    
});

async function fetchAndDisplayItems() {

    toggleLoadingSpinner();


    listItemsEl.textContent = '';

    const shoppingList = await getShoppingItems();

    for (let item of shoppingList){

        const listItems = renderItem(item); 

        if (item.is_bought){
            listItems.classList.add('is_bought');
            listItems.classList.remove('item');
        } else {
            listItems.addEventListener('click', async () => {
                await buyItems(item.id);

                fetchAndDisplayItems();
                

                
            });

            

                    
                
                
        }
        if (item.is_bought){
            listItems.addEventListener('click', async () => {
                await unBuyItems(item.id);
                listItems.classList.remove('is_bought');
                listItems.classList.add('item');
                fetchAndDisplayItems();
            });
        }
        listItemsEl.append(listItems);
        


    }
    toggleLoadingSpinner();

}

window.addEventListener('load', () => {

    fetchAndDisplayItems();
    
});



