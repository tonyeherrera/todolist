let toDoItems = [];

function renderToDo(toDo){
    localStorage.setItem('toDoItemsRef', JSON.stringify(toDoItems));
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${toDo.id}']`);

    if (toDo.deleted){
        item.remove();
        return
    }
    const isChecked = toDo.checked ? 'done':'';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', toDo.id);
    node.innerHTML = `
        <input id="${toDo.id}" type="checkbox"/>
        <label for="${toDo.id}" class="tick js-tick"></label>
        <span>${toDo.text}</span>
        <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
        </button>
    `;
    if (item){
        list.replaceChild(node,item);
    } else {
        list.append(node);
        if (toDo.deleted) {
            item.remove();
            // add this line to clear whitespace from the list container
            // when `todoItems` is empty
            if (toDoItems.length === 0) list.innerHTML = '';
            return
          }
    }
}

function addToDo(text){
    const toDo = {
        text,
        checked: false,
        id: Date.now(),
    };

    toDoItems.push(toDo);
    renderToDo(toDo);
}
function toggleDone(key){
    const index = toDoItems.findIndex(item => item.id === Number(key));
    toDoItems[index].checked = !toDoItems[index].checked;
    renderToDo(toDoItems[index]);
}
    const form = document.querySelector('.js-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const input = document.querySelector('.js-todo-input');

        const text = input.value.trim();
        if (text !== ''){
            addToDo(text);
            input.value = '';
            input.focus();
        }
    });
    function deleteToDo(key){
        const index = toDoItems.findIndex(item => item.id === Number(key));
        const toDo = {
            deleted:true,
            ...toDoItems[index]
        };
        toDoItems = toDoItems.filter(item => item.id !== Number(key));
        renderToDo(toDo);
    }

    const list = document.querySelector('.js-todo-list');
    list.addEventListener('click', event =>{
        if(event.target.classList.contains('js-tick')){
            const itemKey = event.target.parentElement.dataset.key;
            toggleDone(itemKey);
        }
        if (event.target.classList.contains('js-delete-todo')){
            const itemKey = event.target.parentElement.dataset.key;
            deleteToDo(itemKey);
        }
    });
    document.addEventListener('DOMContentLoaded', () => {
        const ref = localStorage.getItem('toDoItemsRef');
        if (ref) {
          toDoItems = JSON.parse(ref);
          toDoItems.forEach(t => {
            renderTodo(t);
          });
        }
      });
    