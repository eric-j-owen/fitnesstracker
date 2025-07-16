import { useState } from "react";
import { useFoodLog } from "../../api/foodLog/useFoodLog";

export default function FoodLogModule() {
  const [query, setQuery] = useState<string>("");
  const [submittedQery, setSubmittedQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data } = useFoodLog(submittedQery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedQuery(query);
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
