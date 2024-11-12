const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo-btn");
const newTaskForm = document.getElementById("new-task-form");
let todos = [];
// ฟังก์ชันสำหรับการแสดงรายการ Todo
// ฟังก์ชันสำหรับการแสดงรายการ Todo
// ฟังก์ชันสำหรับการแสดงรายการ Todo
function renderTodos() {
    todoList.innerHTML = ""; // Clear the list
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo-item"; // เพิ่มคลาส .todo-item สำหรับแต่ละรายการ
        // แสดงหมายเลขลำดับ และข้อความ
        li.innerHTML = `
      <div class="todo-header">
        <span class="todo-number">รายการที่ ${index + 1}</span>
        <div class="todo-actions">
          <button class="mark-completed bg-green-500 text-white px-2 py-1 rounded">
            ${todo.completed ? "<i class='fas fa-check'></i> Undo" : "<i class='fas fa-check'></i> Complete"}
          </button>
          <button class="delete bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      </div>
      <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
    `;
        const markCompletedButton = li.querySelector(".mark-completed");
        const deleteButton = li.querySelector(".delete");
        // Toggle completed state
        markCompletedButton.addEventListener("click", () => {
            todo.completed = !todo.completed;
            updateLocalStorage(); // Update localStorage on change
            renderTodos();
        });
        // Delete task
        deleteButton.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== todo.id);
            updateLocalStorage(); // Update localStorage on delete
            renderTodos();
        });
        todoList.appendChild(li);
    });
}
// ฟังก์ชันที่เปิด/ปิดการแสดงผลของฟอร์ม Add Task
addTodoBtn.addEventListener("click", () => {
    newTaskForm.classList.toggle("hidden");
});
// ฟังก์ชันที่เพิ่มรายการ Todo ใหม่
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodo = {
        id: Date.now(),
        text: todoInput.value.trim(),
        completed: false,
    };
    todos.push(newTodo);
    todoInput.value = "";
    updateLocalStorage(); // บันทึกข้อมูลลงใน localStorage
    renderTodos();
    newTaskForm.classList.add("hidden"); // ซ่อนฟอร์มหลังจากเพิ่มรายการ
});
// ฟังก์ชันในการบันทึกข้อมูลลงใน localStorage
function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos)); // บันทึกข้อมูล todos ลง localStorage
}
// ฟังก์ชันในการโหลดข้อมูลจาก localStorage เมื่อเริ่มต้น
function loadFromLocalStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos(); // แสดงผล Todo ที่โหลดมาจาก localStorage
    }
}
// เรียกใช้งาน loadFromLocalStorage เมื่อหน้าเว็บโหลด
loadFromLocalStorage();
