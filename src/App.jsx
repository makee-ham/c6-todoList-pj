import { useState } from "react";

function App() {
  return (
    <>
      <header>
        <h1>Todo List</h1>
      </header>
      <main>
        <div id="container">
          {/* 검색창 - 실시간 필터 */}
          <div id="search-container">
            <input />
          </div>
          {/* 완료상태 필터 */}
          <div id="status-container">
            <button>Uncompleted</button>
            <button>Completed</button>
            <button>All</button>
          </div>
          {/* Todo 조회 (가능하면 끌어다 순서 옮기기) (수정, 삭제) */}
          <div id="todo-list-container">
            <ul>{/* arr + map */}</ul>
          </div>
          {/* Todo 생성 */}
          <div id="new-todo-container">
            <input />
            <button>Add</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
