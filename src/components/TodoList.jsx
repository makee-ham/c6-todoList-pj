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
}) {
  return (
    <ul className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          editText={editText}
          handleEdit={handleEdit}
          handleEditSave={handleEditSave}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          setEditText={setEditText}
        />
      ))}
    </ul>
  );
}
