// npm run server 후 엔드포인트 확인...
import { useEffect, useState, useRef } from "react";
import { getRegExp } from "korean-regexp";
import Header from "./components/Header";
import { SearchFilter } from "./components/SearchFilter";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";
import Quote from "./components/Quote";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const newTodoRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Failed to fetch todos", err));
  }, []);

  const handleAddTodo = async () => {
    const value = newTodoRef.current.value;
    if (!value.trim()) {
      alert("Please write something to do, then add it.");
      return;
    }
    const newTodo = { text: value.trim(), completed: false };
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const savedTodo = await res.json();
      setTodos((prev) => [...prev, savedTodo]);
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
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error("Failed to toggle complete", err);
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
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
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
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
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
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

  return (
    <>
      <Header />
      <main className="bg-blue-50 min-h-screen text-gray-800">
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
          />
          <AddTodo newTodoRef={newTodoRef} handleAddTodo={handleAddTodo} />
          <Quote />
        </div>
      </main>
    </>
  );
}

export default App;
