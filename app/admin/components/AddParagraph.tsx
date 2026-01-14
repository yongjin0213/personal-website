import { useState } from 'react';
import { AddParagraphProps } from '../type';

export default function AddParagraph({ onAddBlock }: AddParagraphProps) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAddBlock({ type: 'paragraph', content: text });
      setText(""); // Clear after adding
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-blue-700">
          Paragraph Content
        </label>
        <textarea
          value={text}
          name="paragraph"
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your paragraph here..."
          rows={6}
          className="w-full resize-none rounded-lg border border-blue-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
        <p className="text-xs text-gray-500">
          {text.length} characters
        </p>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!text.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Paragraph
      </button>
    </div>
  );
}