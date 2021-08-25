const TagInput = document.querySelector('.tag-input');
const addBtn = document.querySelector('.tag-button');
const TagList = document.querySelector('.tag-list');
const checkbox = document.querySelector('.form-check-input');


const addTag = (event) => {
    event.preventDefault();

    if (TagInput.value != '') {
    
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tag');

        const newTag = document.createElement('li');
        newTag.innerText = TagInput.value;
        newTag.classList.add('tag-doin');
        tagDiv.appendChild(newTag);

        let obj = {
            name: TagInput.value,
        }

        saveLocal(obj);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.classList.add('delete');
        tagDiv.appendChild(deleteBtn);
        TagList.appendChild(tagDiv);


        TagInput.value = '';
    }


}


const DeleteTag = (event) => {
    const item = event.target;
    if (item.classList[0] === 'delete'  ) {
        const tag = item.parentElement;
        removeLocal(tag);
        tag.remove();
    }

}


const saveLocal = (tag) => {
    let tags;
    if (localStorage.getItem('tags') === null) {
        tags = [];
    } else {
        tags = JSON.parse(localStorage.getItem('tags'));
    }
    tags.push(tag);
    localStorage.setItem('tags', JSON.stringify(tags));
}

const getLocal = () => {
    let tags;
    if (localStorage.getItem('tags') === null) {
        tags = [];
    } else {
        tags = JSON.parse(localStorage.getItem('tags'));
    }
    tags.forEach(tag => {

        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tag');

        const newTag = document.createElement('li');
        newTag.innerText = tag.name;
        newTag.classList.add('tag-doin');
        tagDiv.appendChild(newTag);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.classList.add('delete');
        tagDiv.appendChild(deleteBtn);

        TagList.appendChild(tagDiv);
    });
}

const removeLocal = (tag) => {
    let tags;
    if (localStorage.getItem('tags') === null) {
        tags = [];
    } else {
        tags = JSON.parse(localStorage.getItem('tags'));
    }
    tags.splice(tags.indexOf(tag.children[0].innerText), 1);
    localStorage.setItem('tags', JSON.stringify(tags));
}


const readonlyMod = () =>{
    const btns = document.querySelectorAll('.delete');
        if (checkbox.checked){
            if(btns===null){
                addBtn.setAttribute('disabled', true);
            }
            else{
                btns.forEach(btn => {
                    btn.setAttribute('disabled', true);
                })
                addBtn.setAttribute('disabled', true);
            }     
        }
        else{
            if(btns===null){
                addBtn.removeAttribute('disabled');
            }
            else{
                btns.forEach(btn => {
                    btn.removeAttribute('disabled');
                })
                addBtn.removeAttribute('disabled');
            }   
        }
}


addBtn.addEventListener('click', addTag);
TagList.addEventListener('click', DeleteTag);
checkbox.addEventListener('click', readonlyMod);
document.addEventListener('DOMContentLoaded', getLocal);

