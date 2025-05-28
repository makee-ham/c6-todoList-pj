export function SearchFilter({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
}) {
  return (
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
            className={`px-4 py-1 rounded transition ${
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
  );
}
