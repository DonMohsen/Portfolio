// components/CloudinaryUploadButton.tsx
'use client';

import React, { useState } from 'react';

export default function CloudinaryUploadButton({ onUpload }: { onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setLoading(true);
    setError('');
    const file = e.target.files[0];

    // Replace this with your Cloudinary unsigned preset and cloud name
    const UPLOAD_PRESET = 'Portfolio';
    const CLOUD_NAME = 'donmohsen';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        onUpload(data.secure_url); // Pass the URL back to the parent
      } else {
        throw new Error('Failed to upload');
      }
    } catch (err) {
      setError('Failed to upload. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
