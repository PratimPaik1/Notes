import { useEffect, useState } from "react";
import axios from "axios";

/* ---------------- Skeleton Card ---------------- */
function SkeletonCard() {
  return (
    <div className="bg-[#4f4f4f] rounded-md p-4 w-80 overflow-hidden relative">
      {/* Shimmer layer */}
      <div className="absolute inset-0 -translate-x-full shimmer"></div>

      <div className="h-6 bg-gray-600 rounded w-3/4 mb-3"></div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-600 rounded w-11/12"></div>
        <div className="h-4 bg-gray-600 rounded w-4/5"></div>
      </div>

      <div className="h-8 bg-gray-600 rounded mt-5"></div>
    </div>
  );
}


/* ---------------- App ---------------- */
function App() {
  const [notes, setNotes] = useState([]);
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:3000/api/notes");
        setNotes(res.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [render]);

  async function deleteNotes(id) {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      setRender((prev) => prev + 1);
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  return (
    <>
      <h1 className="text-center text-5xl font-bold py-5 text-white">
        My Notes
      </h1>
      <hr className="mb-6" />

      <div className="flex flex-wrap gap-6 p-5 w-full  justify-center">
        {/* ---------------- Skeleton Loading ---------------- */}
        {isLoading &&
          Array.from({ length: 16 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}

        {/* ---------------- No Notes ---------------- */}
        {!isLoading && notes.length === 0 && (
          <div className="w-full flex justify-center items-center text-4xl text-gray-300">
            No notes found...
          </div>
        )}

        {/* ---------------- Notes ---------------- */}
        {!isLoading &&
          notes.length > 0 &&
          notes.map((item) => (
            <div
              key={item._id}
              className="bg-[#4f4f4f] rounded-md p-4 w-80 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {item.title}
                </h2>
                <p className="text-gray-200 break-words">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => deleteNotes(item._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 rounded active:scale-95"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
