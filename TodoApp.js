document.addEventListener("DOMContentLoaded", function () {
    let todos = [];
    async function fetchTodoData() {
        document.getElementById("loader").style.display = "block";
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();
            todos = data.map(todo => ({
                title: todo.title,
                id: todo.userId
            }))
            renderTodos();
        }
        catch (error) {
            console.error("error fetching data;", error);
        }
        finally {
            document.getElementById("loader").style.display = "none";
        }
    }

    function renderTodos() {
        const filterText = document.getElementById("filter").value;
        const todoList = document.getElementById("todoList");
        const sortValue = document.getElementById("sort").value;
        var filteredTodos = todos;

        // Clear the current todo list
        todoList.innerHTML = '';
        //filter
        if (filterText) {
            var filteredTodos = todos.filter(todo => {
                const idString = todo.id.toString();
                const titleLower = todo.title.toLowerCase();
                const idMatch = idString.includes(filterText);
                const titleMatch = titleLower.includes(filterText.toLowerCase());
                return idMatch || titleMatch;
            })
        }
        //sort
        if (sortValue == "id") {
            filteredTodos.sort((a, b) => a.id - b.id);
        } else if (sortValue == "title") {
            filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
        }

        filteredTodos.forEach((todo) => {
            const list = document.createElement("li");
            list.innerText = ` ${todo.id} - - ${todo.title}`;
            todoList.appendChild(list);
        })
    }
    document.getElementById("filter").addEventListener("input", renderTodos);
    document.getElementById("sort").addEventListener("change", renderTodos);
    fetchTodoData();
}
)