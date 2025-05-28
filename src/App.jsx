import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getRegExp } from "korean-regexp";
import Clock from "./components/Clock";
import Quote from "./components/Quote";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const newTodoRef = useRef(null);
  const navigate = useNavigate();

  const handleAddTodo = () => {
    const value = newTodoRef.current.value;
    if (!value.trim()) {
      alert("Please write something to do, then add it.");
      return;
    }
    setTodos([
      ...todos,
      { id: Date.now(), text: value.trim(), completed: false },
    ]);
    newTodoRef.current.value = "";
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleEditSave = (id) => {
    if (!editText.trim()) {
      alert("Please renewal your task content, then apply it.");
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const filteredTodos = todos
    .filter((todo) => {
      if (filterStatus === "complete") return todo.completed;
      if (filterStatus === "uncomplete") return !todo.completed;
      return true;
    })
    .filter((todo) => {
      const searchedValue = getRegExp(search);
      return todo.text.match(searchedValue);
    });

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <h1
          className="text-center text-3xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate(0)}
        >
          📝 Todo List
        </h1>
        <div className="flex justify-center">
          {/* Clock */}
          <Clock />
        </div>
      </header>

      {/* Main */}
      <main className="bg-blue-50 min-h-screen text-gray-800">
        <div className="max-w-2xl mx-auto py-10 px-6 space-y-10">
          {/* Search & Filter */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path
                    d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z"
                    stroke="currentColor"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search todos..."
                className="w-full pl-10 pr-3 py-2 border border-blue-100 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex gap-2 justify-center">
              {["all", "complete", "uncomplete"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1 rounded transition
          ${
            filterStatus === status
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
                >
                  {status[0].toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Todo List */}
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleComplete(todo.id)}
                    className="w-5 h-5 text-blue-500"
                  />
                  {editingId === todo.id ? (
                    <input
                      autoFocus
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => handleEditSave(todo.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditSave(todo.id);
                      }}
                      className="flex-1 px-2 py-1 border-b border-blue-200 focus:outline-none"
                    />
                  ) : (
                    <span
                      className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Add New Todo */}
          <div className="flex gap-2 bg-white p-4 rounded shadow">
            <input
              ref={newTodoRef}
              placeholder="New task..."
              className="flex-1 px-3 py-2 border border-blue-100 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Quote */}
          <Quote />
        </div>
      </main>
    </>
  );
}

export default App;
