import { useState } from "react";

import api from "../utils/api";
import toast from "react-hot-toast";

export default function FileUploader({ onUpload }) {
  const [loading, setLoading] = useState(false);

  const handleFile = async (file) => {
    if (!file || loading) return;
    if (file.type !== "application/pdf") {
      return toast.error("Only PDF files are allowed");
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      onUpload(file);
      setLoading(false);
      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("File uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);

      setLoading(false);
      toast.error("File upload failed");
    }
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${
        !loading ? "cursor-pointer hover:border-purple-400" : ""
      } transition`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor={!loading ? `file-upload` : ""}
        className={!loading ? `cursor-pointer` : ""}
      >
        {loading ? (
          <>
            <i className="uil uil-spinner-alt" />{" "}
          </>
        ) : (
          <span className="text-purple-600 font-medium">Choose file</span>
        )}
      </label>
    </div>
  );
}
