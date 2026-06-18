const UPLOAD_PRESET = "Portfolio";
const CLOUD_NAME = "donmohsen";

export async function uploadImageToCloudinary(
  blob: Blob,
  filename: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", blob, filename);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = (await response.json()) as { secure_url?: string };
  if (!data.secure_url) {
    throw new Error("Cloudinary upload failed");
  }

  return data.secure_url;
}

export function createTinyMceImageUploadHandler() {
  return async (
    blobInfo: { blob: () => Blob; filename: () => string },
    progress: (percent: number) => void
  ) => {
    progress(10);
    const url = await uploadImageToCloudinary(
      blobInfo.blob(),
      blobInfo.filename()
    );
    progress(100);
    return url;
  };
}
