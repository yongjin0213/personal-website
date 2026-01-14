'use client'
import Form from 'next/form';
import { useState } from 'react';
import { ContentBlock } from '../type';
import AddParagraph from '../components/AddParagraph';
import AddImage from '../components/AddImage';

export default function CreateBlogForm() {
  const [block, setBlock] = useState<ContentBlock[]>([]);
  const [paragraph, setParagraph] = useState(false);
  const [image, setImage] = useState(false);

  const onAddBlock = (contentToAdd: ContentBlock) => {
    setBlock([...block, contentToAdd]);
    setParagraph(false);
    setImage(false);
  };

  const removeBlock = (index: number) => {
    setBlock(block.filter((_, i) => i !== index));
  };

  const handleForm = async (formData: FormData) => {
    const title = formData.get('title') as string;
    
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: block
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      setBlock([]);

    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Form 
        action={handleForm} 
        className="w-full max-w-3xl space-y-8 rounded-3xl border border-green-200 bg-white p-10 shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-4xl font-bold text-gray-800">Create New Blog Post</h2>
          <p className="mt-2 text-sm text-gray-600">Share your thoughts with the world</p>
        </div>
        
        {/* Title Input */}
        <div className="space-y-3">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="Enter an engaging title..."
            className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* Content Blocks Display */}
        {block.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Content Blocks</h3>
            <div className="space-y-3">
              {block.map((b, index) => (
                <div 
                  key={index} 
                  className="group relative rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {b.type === 'paragraph' ? (
                        <div>
                          <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            Paragraph
                          </span>
                          <p className="mt-2 text-sm text-gray-700 line-clamp-3">{b.content}</p>
                        </div>
                      ) : (
                        <div>
                          <span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Image
                          </span>
                          <p className="mt-2 text-xs text-gray-600">Alt: {b.alt}</p>
                          <p className="mt-1 truncate text-xs text-gray-400">{b.url}</p>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBlock(index)}
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Content Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Add Content</h3>
          
          {!paragraph && !image && (
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setParagraph(true);
                  setImage(false);
                }}
                className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-6 transition hover:border-blue-500 hover:bg-blue-100"
              >
                <svg className="mb-2 h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-semibold text-blue-700">Add Paragraph</span>
                <span className="mt-1 text-xs text-blue-600">Write text content</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setParagraph(false);
                  setImage(true);
                }}
                className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-6 transition hover:border-green-500 hover:bg-green-100"
              >
                <svg className="mb-2 h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-green-700">Add Image</span>
                <span className="mt-1 text-xs text-green-600">Insert an image</span>
              </button>
            </div>
          )}

          {/* Show form when adding content */}
          {paragraph && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <AddParagraph onAddBlock={onAddBlock} />
              <button
                type="button"
                onClick={() => setParagraph(false)}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800"
              >
                Cancel
              </button>
            </div>
          )}
          
          {image && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <AddImage onAddBlock={onAddBlock} />
              <button
                type="button"
                onClick={() => setImage(false)}
                className="mt-3 text-sm text-green-600 hover:text-green-800"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:from-green-700 hover:to-emerald-700 hover:shadow-xl active:scale-[0.98]"
        >
          Publish Blog Post
        </button>
      </Form>
    </div>
  );
}