type EditorDirection = "ltr" | "rtl";

export function getTinyMceInit(direction: EditorDirection) {
  return {
    base_url: "/tinymce",
    suffix: ".min",
    height: 360,
    menubar: false,
    branding: false,
    promotion: false,
    directionality: direction,
    plugins: [
      "lists",
      "link",
      "image",
      "table",
      "code",
      "fullscreen",
      "autoresize",
      "wordcount",
      "directionality",
    ],
    toolbar:
      "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table | ltr rtl | code fullscreen",
    content_style:
      "body { font-family: system-ui, sans-serif; font-size: 15px; line-height: 1.6; }",
    autoresize_bottom_margin: 16,
    resize: false,
    image_caption: true,
    table_advtab: true,
    link_default_target: "_blank",
    link_assume_external_targets: true,
  };
}
