import Clock from "./Clock";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm py-6">
      <h1
        className="text-center text-3xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate(0)}
      >
        📝 Todo List
      </h1>
      <div className="flex justify-center">
        <Clock />
      </div>
    </header>
  );
}
