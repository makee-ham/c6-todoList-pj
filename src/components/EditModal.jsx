export default function EditModal({ editText, setEditText, onSave, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <input
          className="w-full px-3 py-2 border rounded"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
