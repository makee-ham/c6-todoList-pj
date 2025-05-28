export function AddTodo({ newTodoRef, handleAddTodo }) {
  return (
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
  );
}
