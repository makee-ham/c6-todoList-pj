import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Quote() {
  const { data, loading, error } = useFetch("/data/fun-quotes.json");
  const [randomIndex, setRandomIndex] = useState(null);

  useEffect(() => {
    if (data && data.length > 0 && randomIndex === null) {
      const index = Math.floor(Math.random() * data.length);
      setRandomIndex(index);
    }
  }, [data]);

  if (loading) return <p className="text-sm text-blue-400">Loading quote...</p>;
  if (error)
    return <p className="text-sm text-red-500">Failed to load quote 🥲</p>;
  if (!data || data.length === 0 || randomIndex === null) return null;

  const { quote, author } = data[randomIndex];

  return (
    <div id="quote-container" className="text-center mt-6 text-blue-800 italic">
      <p className="text-lg mb-1">“{quote}”</p>
      <p className="text-sm text-blue-500">— {author}</p>
    </div>
  );
}
