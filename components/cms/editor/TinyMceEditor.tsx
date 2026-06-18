"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useMemo } from "react";
import { createTinyMceImageUploadHandler } from "./image-upload-handler";
import { getTinyMceInit } from "./tinymce-config";

type TinyMceEditorProps = {
  value: string;
  onChange: (value: string) => void;
  direction?: "ltr" | "rtl";
  placeholder?: string;
  minHeight?: number;
};

export default function TinyMceEditor({
  value,
  onChange,
  direction = "ltr",
  placeholder,
  minHeight = 360,
}: TinyMceEditorProps) {
  const init = useMemo(() => {
    const base = getTinyMceInit(direction);
    return {
      ...base,
      height: minHeight,
      placeholder,
      images_upload_handler: createTinyMceImageUploadHandler(),
    };
  }, [direction, minHeight, placeholder]);

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      value={value}
      onEditorChange={onChange}
      init={init}
    />
  );
}
