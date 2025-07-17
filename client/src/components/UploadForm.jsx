import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !jd.trim()) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd", jd);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/rank", formData);
      localStorage.setItem("ranked", JSON.stringify(res.data));
      window.location.reload();
    } catch (err) {
      alert("Failed to process. Check server or input.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          rows="8"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste job description here..."
          className="p-4 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <div className="bg-white border-2 border-dashed border-gray-400 p-6 rounded-lg flex flex-col items-center justify-center">
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Rank Resumes"}
        </button>
      </div>
    </div>
  );
};

export default UploadForm;