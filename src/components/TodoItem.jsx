export function TodoItem({
  todo,
  index,
  handleEdit,
  handleComplete,
  handleDelete,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) {
  const isCompleted = todo.completed;

  return (
    <li
      draggable={false}
      className={`flex items-center justify-between p-4 rounded shadow transition-colors ${
        isCompleted ? "bg-gray-100" : "bg-white"
      }`}
      onDragOver={(e) => handleDragOver(index, e)}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => handleComplete(todo.id)}
          className="w-5 h-5 text-blue-500"
        />
        <span
          className={`flex-1 ${
            isCompleted ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.text}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => handleEdit(todo)}
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
        <button
          draggable
          onDragStart={() => handleDragStart(index)}
          className="cursor-move"
        >
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            draggable="false"
          >
            <path
              d="M9.5 3a.5.5 0 110-1 .5.5 0 010 1zm0 5a.5.5 0 110-1 .5.5 0 010 1zm0 5a.5.5 0 110-1 .5.5 0 010 1zm-4-10a.5.5 0 110-1 .5.5 0 010 1zm0 5a.5.5 0 110-1 .5.5 0 010 1zm0 5a.5.5 0 110-1 .5.5 0 010 1z"
              stroke="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  );
}
