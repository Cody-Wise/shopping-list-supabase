export function renderItem(item){
    const listItemEl = document.createElement('div');
    const pTag = document.createElement('p');

    listItemEl.classList.add('item');
    // pTag.classList.add('item');
    pTag.textContent = `${item.amount} ${item.item}`;

    listItemEl.append(pTag);

    return listItemEl;

}