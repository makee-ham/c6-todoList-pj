import { TodoItem } from "./TodoItem";

export function TodoList({
  filteredTodos,
  editingId,
  editText,
  handleEdit,
  handleEditSave,
  handleComplete,
  handleDelete,
  setEditText,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) {
  return (
    <ul className="space-y-3">
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
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
      ))}
    </ul>
  );
}
