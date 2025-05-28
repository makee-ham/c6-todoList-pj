export function TodoItem({
  todo,
  editingId,
  editText,
  handleEdit,
  handleEditSave,
  handleComplete,
  handleDelete,
  setEditText,
}) {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded shadow">
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
            onKeyDown={(e) => e.key === "Enter" && handleEditSave(todo.id)}
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
  );
}
