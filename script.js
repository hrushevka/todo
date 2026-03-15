//  github.com/hrushevka

const sort_all_btn = document.querySelector('.sort-all');
const sort_active_btn = document.querySelector('.sort-active');
const sort_done_btn = document.querySelector('.sort-done');
const adder_add_btn = document.querySelector('.adder-add');
const adder_rem_done_btn = document.querySelector('.adder-rem-done');

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
adder_rem_done_btn.addEventListener("click",  () => {
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));
    let list = tasks_list.tasks;
    let error = 0;
    for(let i = 0; i < list.length; i++){
        if (list[i].done){
            remove_task(i-error);
            error++;
        }
    }
});

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

function change_text(id){
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));
    var list = tasks_list.tasks; 
    if (id > list.length-1){ 
        console.error("id is bigger than list length"); 
        return;
    }
    let ch = 0;
    list.forEach(el => {
        if (el.change){
            ch++;
        }
    });
    if (ch>0){
        return
    }
    list[id].change = true;
    tasks_list.tasks = list
    localStorage.setItem('tasks_list', JSON.stringify(tasks_list));
    draw_list();
}

function yes_enter_change(id, inp){
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));
    var list = tasks_list.tasks; 
    if (id > list.length-1){ 
        console.error("id is bigger than list length"); 
        return;
    }
    let add_text = inp.value.trim();
    if (add_text == ""){
        alert("Enter a task");
        return;
    }
    list[id].text = add_text;
    list[id].change = false;
    tasks_list.tasks = list
    localStorage.setItem('tasks_list', JSON.stringify(tasks_list));
    draw_list();
}

function draw_list(){
    List.innerHTML = "";
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));

    let list = tasks_list.tasks;

    let error = 0;
    for(let i = 0; i < list.length; i++){
        if ((sort_type==1 && list[i].done)||(sort_type==2 && !list[i].done)){
            error++;
            continue
        }
        if (!list[i].change){
            List.innerHTML += `<div class="task">
                <div>
                    <input type="checkbox" ${list[i].done ? 'checked' : ''} onclick="change_done(${i})">
                    <span ondblclick="change_text(${i})" class="${list[i].done ? 'cross-task' : ''}"><b>${i+1-error}</b>. ${list[i].text}</span>
                </div>
                <button onclick="remove_task(${i})" class="task_remover">x</button>
            </div>`;
        }else{
            List.innerHTML += `<div class="task">
                <div>
                    <input disabled="true" type="checkbox" ${list[i].done ? 'checked' : ''} onclick="change_done(${i})">
                    <span><b>${i+1-error}</b>. </span>
                    <input type="text" class="change_task_inp" value="${list[i].text}" onchange="yes_enter_change(${i}, this)">
                </div>
                <button disabled="true" onclick="remove_task(${i})" class="task_remover">x</button>
            </div>`;
        }
    }
}

function set_sort_type(type){
    sort_type = type;
    draw_list();
    let buttons = [sort_all_btn, sort_active_btn, sort_done_btn]
    buttons.forEach(btn => {
        btn.className = "sort-btn"
        if (btn==sort_all_btn){
            btn.className += " sort-all"
        }
        if (btn==sort_active_btn){
            btn.className += " sort-active"
        }
        if (btn==sort_done_btn){
            btn.className += " sort-done"
        }
    });
    buttons[type].className += " cur_sort"
}

sort_active_btn.addEventListener('click', () => {
    set_sort_type(1)
})
sort_all_btn.addEventListener('click', () => {
    set_sort_type(0)
})
sort_done_btn.addEventListener('click', () => {
    set_sort_type(2)
})

function add_task(add_text){
    tasks_list = JSON.parse(localStorage.getItem('tasks_list'));
    tasks_list.tasks.push({text: add_text, done: false, change: false});
    localStorage.setItem('tasks_list', JSON.stringify(tasks_list));
    draw_list();
}


const brt_add = () => {
    let add_text = adder_inp.value.trim();
    adder_inp.value = "";
    if (add_text == ""){
        alert("Enter a task");
        return;
    }
    add_task(add_text);
};

function add_enter(event){
    if (event.key === 'Enter') {
        brt_add();
    }
}
adder_add_btn.addEventListener('click', brt_add);

function setup_localStorage(){
    if (localStorage.length == 0){
        localStorage.setItem('tasks_list', JSON.stringify({tasks:[]}));
    }
    draw_list();
}

setup_localStorage();