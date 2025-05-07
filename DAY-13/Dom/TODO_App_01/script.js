const CreateTaskIcon = document.getElementById("CreateTaskIcon");
const addTask = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const container = document.getElementById("container");

CreateTaskIcon.addEventListener("click", () => {
  addTask.style.display = "flex";
});

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value;
  if (!task) return;

  //   create Task
  const taskDiv = document.createElement("div");
  taskDiv.id = "Tasks";
  taskDiv.innerHTML = ` <p>${task}</p>
            <div id="delEditRead">
                <h4 id="Check"><i class="ri-checkbox-circle-line"></i></h4>
                <h4 id="Update"><i class="ri-pen-nib-line"></i></h4>
                <h4 id="Delete"><i class="ri-delete-bin-6-line"></i></h4>
            </div>`;
  container.appendChild(taskDiv);
  taskInput.value = "";
  addTask.style.display = "none";

  //   delete Task
  const DeleteTaskBtn = taskDiv.querySelector("#Delete");
  DeleteTaskBtn.addEventListener("click", () => {
    taskDiv.remove();
  });

  //   update Task
  const UpdateTaskBtn = taskDiv.querySelector("#Update");
  UpdateTaskBtn.addEventListener("click", () => {
    taskDiv.remove();
    addTask.style.display = "flex";
    taskInput.value = task;
  });

  //   check task
  const CheckTaskBtn = taskDiv.querySelector("#Check");
  const SingleTask = taskDiv.querySelector("p");
  CheckTaskBtn.addEventListener("click", () => {
    SingleTask.classList.add("Checked");
  });
});
