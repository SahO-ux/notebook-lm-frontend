import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import FileUploader from "./components/FileUploader";
import PDFViewer from "./components/PDFViewer";
import ChatWindow from "./components/ChatWindow";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [pdfFile, setPdfFile] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      {!pdfFile ? (
        // Landing Screen
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-10 text-center border border-gray-200 max-w-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                ⬆️
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-2">
              Upload PDF to start chatting
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Click or drag and drop your file here
            </p>
            <FileUploader onUpload={setPdfFile} />
          </div>
        </div>
      ) : (
        // Main Split Layout
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - PDF */}
          <div className="w-1/2 border-r flex flex-col">
            <div className="flex-1 overflow-auto">
              <PDFViewer file={pdfFile} />
            </div>
          </div>

          {/* Right Side - Chat */}
          <div className="w-1/2 flex flex-col">
            <ChatWindow onConfirmUploadNewPdf={() => setPdfFile(null)} />
          </div>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
