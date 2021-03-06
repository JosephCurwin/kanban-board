import { queries } from "./mini_backend.js";

function init() {
    render()

    const fistDiv = document.getElementById("onwork");
    fistDiv.addEventListener("dragover", e=> e.preventDefault())



    fistDiv.addEventListener("drop", ev=> {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));

      // transfered card
      console.log(data)

      console.log(ev.target.id)

      queries.updateTask(data, ev.target.id)

    });


    const secDiv = document.getElementById("active");
    secDiv.addEventListener("dragover", e=> e.preventDefault())
    secDiv.addEventListener("drop", ev=> {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
      
      console.log(data)

      console.log(ev.target.id)
      
      queries.updateTask(data, ev.target.id)

    });



    const thirdDiv = document.getElementById("finished");
    thirdDiv.addEventListener("dragover", e=> e.preventDefault())
    thirdDiv.addEventListener("drop", ev=> {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));

      console.log(data)

      console.log(ev.target.id)

      queries.updateTask(data, ev.target.id)

    });


}

window.onload = function () {
  init();
};

async function testme() {
  const tasks = await queries.getAllTasks();
  console.log(tasks);
}




async function render(){
    const allTasks = await queries.getAllTasks();
    
    const parentContainer = document.getElementById("active")
    parentContainer.innerHTML= "";

    let draggedItem = null;

    for(let task of allTasks){

      // Add id

        const taskCard = `
        <div class="col-md-6 col-lg-3" draggable="true" id="${task.id}" ">
            <div class="card ">
              <div class="card-body">
                <h5 class="card-title">${task.taskName}</h5>
                <!-- employee -->
                <p class="card-text mb-1">assigned to: ${task.employee}</p>
                <!-- created -->
                <p class="card-text mb-1">created at ${task.created}</p>

                <p class="card-text mb-1">task status: ${task.status}</p>

                <p class="card-text mb-1">task category: ${task.taskCategory}</p>

                <p class="card-text mb-1">task urgency: ${task.taskUrgency}</p>

                <h6 class="card-title mb-0">Description</h6>
                <p card-text mb-1"> ${task.taskDescription}</p>
                <button type="button" class="btn" id="delete-task${task.id}">delete Task</button>
              </div>
            </div>
          </div>
        `


        // taskCard.addEventlistener("dragstart", (e)=> {
        //     draggedItem = this
        //     console.log(draggedItem)
        // })


        parentContainer.innerHTML += taskCard;

        const card = document.getElementById(task.id);
        card.addEventListener("dragstart", (ev)=> {
          ev.dataTransfer.setData("text", ev.target.id);
          // draggedItem = this
          // console.log(e.target)
        });

        // Add click event listener deletes div from parent div 
        // delete from db


        // get the button id from the card
        const deleteButton = document.getElementById(`delete-task${task.id}`);
        deleteButton.addEventListener("click", (e)=>{
          var elem = document. getElementById(task.id); 
          elem. parentNode. removeChild(elem);

          queries.deleteTask(task.id)

        })
        // console.log(card.childNodes)
        // find child of div element


    }
}





/* 
Add on drop -- > change database --> get changed item change status
// add delte button --> deleates element ---> delete item from database 

*/