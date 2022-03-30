import { 
    checkAuth,
    logout,
    createListItems,
    getShoppingItems,
    deleteItems,
    buyItems,
    unBuyItems,
    deleteIndividualItems,

} from '../fetch-utils.js';

import { renderItem } from '../render-utils.js';

const deleteButtonEl = document.querySelector('#delete-button');
const formEl = document.querySelector('#shopping-list');
const listItemsEl = document.querySelector('.list-items');
const loadingEl = document.querySelector('.loading-spinner');
const buyAllEl = document.querySelector('#buy-all');
const unBuyAllEl = document.querySelector('#unbuy-all');



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


export async function fetchAndDisplayItems() {

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

        const listDeleteButton = document.createElement('button');
        listDeleteButton.classList.add('small-delete-button');
        listDeleteButton.textContent = 'Delete';
        listDeleteButton.addEventListener('click', async () => {

            console.log('hellow');


            await deleteIndividualItems(item.id);

            await fetchAndDisplayItems();

        });
        const checkBoxes = document.createElement('input');
        checkBoxes.type = 'checkbox';
        checkBoxes.id = item.id;
        checkBoxes.name = 'checkbox';


        
        
        
        
        listItemsEl.append(listItems, checkBoxes, listDeleteButton);
            
            
            
    }
    toggleLoadingSpinner();
        
}
    
window.addEventListener('load', () => {
        
    fetchAndDisplayItems();
        
});
    
const checkBoxEls = document.getElementsByName('checkbox');

    
buyAllEl.addEventListener('click', async () => {



    for (let checkBoxEl of checkBoxEls){
        


        await buyItems(checkBoxEl.id);

        
        await fetchAndDisplayItems();
    }
        
});

unBuyAllEl.addEventListener('click', async () => {

    for (let checkBoxEl of checkBoxEls){
        


        await unBuyItems(checkBoxEl.id);

        
        await fetchAndDisplayItems();
    }
        
});
    
    
    
    