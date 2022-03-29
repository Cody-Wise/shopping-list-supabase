// import { fetchAndDisplayItems } from './shopping/shopping.js';
// import { deleteIndividualItems } from '../fetch-utils.js';

export function renderItem(item){
    const listItemEl = document.createElement('div');
    const pTag = document.createElement('p');
    // const listDeleteButton = document.createElement('button');

    // listDeleteButton.addEventListener('click', async () => {

    //     await deleteIndividualItems(item.id);
    
    //     // await fetchAndDisplayItems();
    
    
        
    // });


    listItemEl.classList.add('item');
    // pTag.classList.add('item');
    pTag.textContent = `${item.amount} ${item.item}`;
    // listDeleteButton.textContent = 'Delete';


    listItemEl.append(pTag);
    
    

    return listItemEl;

}