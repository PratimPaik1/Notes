import { useEffect, useState } from "react";
import axios from "axios";

/* ---------------- Skeleton Card ---------------- */
function SkeletonCard() {
  return (
    <div className="bg-[#4f4f4f] rounded-md p-4 w-80 overflow-hidden relative">
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

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // edit state
  const [editId, setEditId] = useState(null);

  /* ---------- Fetch Notes ---------- */
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://notes-4x8s.onrender.com/api/notes");
        setNotes(res.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [render]);

  /* ---------- Delete ---------- */
  async function deleteNotes(id) {
    try {
      await axios.delete(`https://notes-4x8s.onrender.com/api/notes/${id}`);
      setRender((prev) => prev + 1);
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  /* ---------- Create / Update ---------- */
  async function handelForm(e) {
    e.preventDefault();

    try {
      if (editId) {
        // PATCH (edit)
        await axios.patch(
          `https://notes-4x8s.onrender.com/api/notes/${editId}`,
          { title, description }
        );
      } else {
        // POST (create)
        await axios.post("https://notes-4x8s.onrender.com/api/notes", {
          title,
          description,
        });
      }

      setRender((prev) => prev + 1);

      // reset form
      setTitle("");
      setDescription("");
      setEditId(null);
    } catch (error) {
      console.error("Submit failed", error);
    }
  }

  /* ---------- Edit ---------- */
  function handleEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note._id);
  }

  return (
    <>
      <h1 className="text-center text-5xl font-bold py-5 text-white">
        My Notes
      </h1>
      <hr className="mb-6" />

      {/* ---------------- Form ---------------- */}
      <form className="flex gap-5 justify-center" onSubmit={handelForm}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="border px-2 rounded-2xl"
          required
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="border px-2 rounded-2xl"
          required
        />

        <button
          className="bg-green-500 px-2 py-1 rounded-xl active:scale-95"
          type="submit"
        >
          {editId ? "Update" : "Create"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setDescription("");
              setEditId(null);
            }}
            className="bg-gray-500 px-2 py-1 rounded-xl active:scale-95"
          >
            Cancel
          </button>
        )}
      </form>

      {/* ---------------- Notes ---------------- */}
      <div className="flex flex-wrap gap-6 p-5 w-full justify-center">
        {isLoading &&
          Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!isLoading && notes.length === 0 && (
          <div className="text-4xl text-gray-300">No notes found...</div>
        )}

        {!isLoading &&
          notes.map((item) => (
            <div
              key={item._id}
              className="bg-[#4f4f4f] rounded-md p-4 w-80 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {item.title}
                </h2>
                <hr />
                <p className="text-gray-200 break-words">
                  {item.description}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => deleteNotes(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 rounded active:scale-95 flex-1"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleEdit(item)}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 rounded active:scale-95 flex-1"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
