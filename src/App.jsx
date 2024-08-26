import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const HandleEdit = (id) => {
    const todoToEdit = Todos.find((todo) => todo.id === id);
    setIsEditing(true);
    setCurrentTodo(todoToEdit);
    setTodo(todoToEdit.Todo);
  };

  const HandleDelete = (id) => {
    const filteredTodos = Todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const HandleAdd = () => {
    if (isEditing) {
      setTodos(
        Todos.map((todo) =>
          todo.id === currentTodo.id ? { ...todo, Todo: Todo } : todo
        )
      );
      setIsEditing(false);
      setCurrentTodo({});
    } else {
      setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const HandleCheckbox = (id) => {
    setTodos(
      Todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const HandleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-3xl p-0.5 pl-3 bg-violet-200 min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-lg font-bold ml-3">
            {isEditing ? "Edit Todo" : "Add a Todo"}
          </h2>
          <input
            type="text"
            onChange={HandleChange}
            value={Todo}
            className="w-96 h-8 rounded-xl p-3"
          />
          <button
            onClick={HandleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded xl ml-2"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <h2 className="text-xl p-3 font-bold">Your Todos</h2>
        <div className="todos">
          {Todos.map((item) => (
            <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <input
                type="checkbox"
                onChange={() => HandleCheckbox(item.id)}
                checked={item.isCompleted}
                name={item.id}
              />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.Todo}
              </div>
              <div className="buttons">
                <button
                  onClick={() => HandleEdit(item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded xl mx-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => HandleDelete(item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded xl mx-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
