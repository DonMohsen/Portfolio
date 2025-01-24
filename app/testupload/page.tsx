// app/upload-form/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import CloudinaryUploadButton from '@/components/CloudinaryUploadButton';

export default function UploadForm() {
  const [imageURL, setImageURL] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
useEffect(() => {
  

  console.log(imageURL);
  
}, [imageURL])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageURL || !name) {
      alert('Please upload an image and enter a name');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, imageURL }),
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setImageURL('');
        setName('');
      } else {
        throw new Error('Failed to save data');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 bg-black"
      />
      <CloudinaryUploadButton onUpload={(url) => setImageURL(url)} />
      {imageURL && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageURL} alt="Uploaded" className="w-32 h-32 object-cover" />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
}
