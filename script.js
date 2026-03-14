const sort_all_btn = document.querySelector('.sort-all');
const sort_active_btn = document.querySelector('.sort-active');
const sort_done_btn = document.querySelector('.sort-done');
const adder_add_btn = document.querySelector('.adder-add');

const adder_inp = document.querySelector(".adder-inp")

const List = document.querySelector(".List");

let sort_type = 0;
// {text: "asdadsas", done: false}



function remove_task(id){
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));
    var list = tasks_list.tasks; 
    if (id > list.length-1){ 
        console.error("id is bigger than list length"); 
        return;
    }
    list.splice(id, 1);
    tasks_list.tasks = list
    localStorage.setItem('tasks_list', JSON.stringify(tasks_list));
    draw_list();
}

function change_done(id){
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));
    var list = tasks_list.tasks; 
    if (id > list.length-1){ 
        console.error("id is bigger than list length"); 
        return;
    }
    list[id].done = !list[id].done;
    tasks_list.tasks = list
    localStorage.setItem('tasks_list', JSON.stringify(tasks_list));
    draw_list();
}

function draw_list(){
    List.innerHTML = "";
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));

    let list = tasks_list.tasks;
    console.log(list);
    for(let i = 0; i < list.length; i++){
        if (sort_type==1 && list[i].done){
            List.innerHTML += `<div class="task">
            <div>
                <input type="checkbox" ${list[i].done ? 'checked' : ''} onclick="change_done(${i})">
                <span class="${list[i].done ? 'cross-task' : ''}">${list[i].text}</span>
            </div>
            <button onclick="remove_task(${i})">x</button>
            </div>`;
        }
        if (sort_type==2 && !list[i].done){
            List.innerHTML += `<div class="task">
            <div>
                <input type="checkbox" ${list[i].done ? 'checked' : ''} onclick="change_done(${i})">
                <span class="${list[i].done ? 'cross-task' : ''}">${list[i].text}</span>
            </div>
            <button onclick="remove_task(${i})">x</button>
            </div>`;
        }
        if (sort_type==0){
            List.innerHTML += `<div class="task">
            <div>
                <input type="checkbox" ${list[i].done ? 'checked' : ''} onclick="change_done(${i})">
                <span class="${list[i].done ? 'cross-task' : ''}">${list[i].text}</span>
            </div>
            <button onclick="remove_task(${i})">x</button>
            </div>`;
        }
    }
}

sort_active_btn.addEventListener('click', () => {
    sort_type = 1;
    draw_list();
})
sort_all_btn.addEventListener('click', () => {
    sort_type = 0;
    draw_list();
})
sort_done_btn.addEventListener('click', () => {
    sort_type = 2;
    draw_list();
})

function add_task(add_text){
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));
    console.log(tasks_list);
    tasks_list.tasks.push({text: add_text, done: false, change:false});
    localStorage.setItem('tasks_list', JSON.stringify(tasks_list));
    draw_list();
}

adder_add_btn.addEventListener('click', () => {
    let add_text = adder_inp.value.trim();
    adder_inp.value = "";
    if (add_text == ""){
        alert("Enter a task");
        return;
    }
    add_task(add_text);
});

function setup_localStorage(){
    if (localStorage.length == 0){
        localStorage.setItem('tasks_list', JSON.stringify({tasks:[]}));
    }
    draw_list();
}

setup_localStorage();