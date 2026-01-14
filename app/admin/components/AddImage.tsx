import { useState } from 'react';
import { AddParagraphProps } from '../type';

export default function AddImage({ onAddBlock }: AddParagraphProps) {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileChange(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAdd = async () => {
    if (file && alt.trim()) {
      const response = await fetch(`/api/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fileName: file.name,
            contentType: file.type || "application/octet-stream",
        })
      })

      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          `Failed to request upload URL (${response.status}): ${message}`
        )
      };

      // Retrieve publicURL and uploadURL
      const { publicUrl, uploadUrl } = await response.json();

      // Upload image to AWS with upload URL
      const upload = await fetch(uploadUrl, {
        method: "PUT",
        headers: { 'Content-Type': file.type },
        body: file
      })

      if (!upload.ok) {
        const message = await upload.text();
        throw new Error(
          `Failed to upload image (${upload.status}): ${message || "Unknown error"}`
        );
      }

      onAddBlock({ 
        type: 'image', 
        url: publicUrl || '',
        alt 
      });
      
      setFile(null);
      setAlt("");
      setPreview(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative rounded-xl border-2 border-dashed transition ${
          isDragging
            ? 'border-green-500 bg-green-100'
            : 'border-green-300 bg-green-50'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) handleFileChange(selectedFile);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        
        <div className="pointer-events-none flex flex-col items-center justify-center p-8">
          <svg 
            className={`mb-3 h-12 w-12 transition ${
              isDragging ? 'text-green-600' : 'text-green-500'
            }`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <p className="mb-1 text-sm font-semibold text-green-700">
            {isDragging ? 'Drop image here' : 'Drag and drop an image'}
          </p>
          <p className="text-xs text-green-600">
            or click to browse
          </p>
        </div>
      </div>

      {preview && (
        <div className="rounded-xl border border-green-200 bg-white p-4">
          <p className="mb-3 text-sm font-medium text-green-700">Preview:</p>
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-64 w-full rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {file?.name} ({(file?.size || 0 / 1024).toFixed(2)} KB)
          </p>
        </div>
      )}

      {/* Alt Text */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-700">
          Alt Text (Description)
        </label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Describe the image for accessibility..."
          className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"
        />
        <p className="text-xs text-gray-500">
          Help visually impaired users understand your image
        </p>
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!file || !alt.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Add Image
      </button>
    </div>
  );
}