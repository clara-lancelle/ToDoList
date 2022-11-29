// toDolist :
"use strict";

// create form
// can create
// can modify 
// can delete
// can check

let form = {

    init: function () {

        //init properties
        this.form = document.querySelector('form');
        this.btn = document.querySelector('#btn');
        this.addItemField = document.querySelector('#addItem');
        this.list = document.querySelector('.list');
        this.ls = localStorage.getItem("tasks");

        //get the task from LS
        if (localStorage.getItem("tasks") !== null) {
            this.tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

            this.tasks.forEach(task => {
                this.newLi = document.createElement('li');
                this.newLi.innerHTML = `<input type="checkbox" class="check" ${task.completed ? 'checked' : ''}>
                <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}">
                <img class="delBtn" src="assets/img/delete.png" alt="delete" />`;
                this.list.insertBefore(this.newLi, this.list.children[0]);

            })
        }
        else {
            this.tasks = [];
        }


        document.body.addEventListener('click', (event) => {
            if (event.target.className == 'addBtn') {
                //add element 
                this.add(this.addItemField, this.tasks);

            }
            if (event.target.className === 'delBtn') {
                // delete element from list  /LS
                this.remove(event.target, this.tasks);
            }
            if (event.target.className == 'check') {
                this.complete(event.target, this.tasks);
            }
        })



        document.body.addEventListener('focus', (event) => {
            if (event.target.className == 'task') {
                // edit task

                this.edit(event.target, this.tasks);

            }
        })

        console.log(localStorage);
    },
    add: function (input, tasks) {

        //empty task
        if (input.value === "") {
            alert("Please add some task!");
            return false;
        }

        // already exist 
        // task already exist

        tasks.forEach(todo => {
            if (todo.task === input.value) {
                alert("Task already exist!");
                input.value = "";
                return;
            }
        });

        // add task to local storage
        localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: input.value, completed: false }]));

        // create list item, add innerHTML and append to ul

        this.newli = document.createElement('li');
        this.newli.innerHTML = `<input type="checkbox" class="check">
      <input type="text" value="${input.value}" class="task"">
      <img class="delBtn" src="assets/img/delete.png" alt="delete" />`;
        this.list.insertBefore(this.newli, this.list.children[0]);
        // clear input
        input.value = "";

        return this.newli;

    },

    edit: function (target, tasks) {

        currentTask = target.value;
        if (target.value === "") {
            //if empty
            alert('task empty');
            target.value = currentTask;
            return;
        }
        // task already exist
        tasks.forEach(task => {
            if (task.task === target.value) {
                alert("Task already exist!");
                target.value = currentTask;
                return;
            }

            // update task
            tasks.forEach(task => {
                if (task.task === currentTask) {
                    task.task = target.value;
                }
            });
            // update local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));

        });
    },
    complete: function (target, tasks) {

        tasks.forEach(task => {
            if (task.task === target.nextElementSibling.value) {
                task.completed = !task.completed;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        target.nextElementSibling.classList.toggle("completed");
    },


    remove: function (target, tasks) {

        tasks.forEach(task => {
            if (task.task === target.parentNode.children[1].value) {
                // delete task
                tasks.splice(tasks.indexOf(task), 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        target.parentElement.remove();

    },


}


document.body.onload = function () {
    form.init();
};
