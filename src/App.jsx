// App.jsx
import { useEffect, useReducer, useRef, useState } from "react";
import { getRegExp } from "korean-regexp";
import Header from "./components/Header";
import { SearchFilter } from "./components/SearchFilter";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";
import Quote from "./components/Quote";
import EditModal from "./components/EditModal";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    case "REORDER":
      return action.payload;
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTodo, setModalTodo] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const newTodoRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => a.order - b.order);
        dispatch({ type: "SET", payload: sorted });
      })
      .catch((err) => console.error("Failed to fetch todos", err));
  }, []);

  const handleAddTodo = async () => {
    const value = newTodoRef.current.value;
    if (!value.trim()) {
      alert("Please write something to do, then add it.");
      return;
    }
    // id는 json-server가 생성
    const newTodo = {
      text: value.trim(),
      completed: false,
      order: todos.length,
    };
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const savedTodo = await res.json();
      dispatch({ type: "ADD", payload: savedTodo });
      newTodoRef.current.value = "";
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  const handleComplete = async (id) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !target.completed }),
      });
      const updatedTodo = await res.json();
      dispatch({ type: "UPDATE", payload: updatedTodo });
    } catch (err) {
      console.error("Failed to toggle complete", err);
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setModalTodo(todo);
    setEditText(todo.text);
    setIsModalOpen(true);
  };

  const handleEditSave = async (id) => {
    if (!editText.trim()) {
      alert("Please renewal your task content, then apply it.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText.trim() }),
      });
      const updatedTodo = await res.json();
      dispatch({ type: "UPDATE", payload: updatedTodo });
      setEditingId(null);
    } catch (err) {
      console.error("Failed to edit todo", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE", payload: id });
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

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

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index, e) => {
    e.preventDefault();

    if (index !== draggingIndex) {
      const newTodos = [...todos];
      const draggingItem = newTodos[draggingIndex];

      newTodos.splice(draggingIndex, 1);
      newTodos.splice(index, 0, draggingItem);

      dispatch({ type: "REORDER", payload: newTodos });
      setDraggingIndex(index);
    }
  };

  const handleDrop = async () => {
    try {
      await Promise.all(
        todos.map((todo, index) =>
          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: index }),
          })
        )
      );
    } catch (err) {
      console.error("순서 업데이트 실패", err);
    }
    setDraggingIndex(null);
  };

  return (
    <>
      <Header />
      <main
        className={`bg-blue-50 min-h-screen text-gray-800 transition-all duration-300 ${isModalOpen ? "blur-sm" : ""}`}
      >
        <div className="max-w-2xl mx-auto py-10 px-6 space-y-10">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <TodoList
            filteredTodos={filteredTodos}
            editingId={editingId}
            editText={editText}
            handleEdit={handleEdit}
            handleEditSave={handleEditSave}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
            setEditText={setEditText}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
          <AddTodo newTodoRef={newTodoRef} handleAddTodo={handleAddTodo} />
          <Quote />
        </div>
      </main>
      {isModalOpen && modalTodo && (
        <EditModal
          editText={editText}
          setEditText={setEditText}
          onSave={() => handleEditSave(modalTodo.id)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
