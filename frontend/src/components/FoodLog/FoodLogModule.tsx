import { useState } from "react";

export default function FoodLogModule() {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-base-100 border w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
