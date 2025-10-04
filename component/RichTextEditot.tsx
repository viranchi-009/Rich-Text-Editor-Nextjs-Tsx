"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            // Headers, fonts, and sizes
            [{ font: [] }, { size: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            // Text styles
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code",
              "code-block",
              "link",
              "image",
              "video",
              "clean",
            ],

            // Lists and indentation
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],

            // Alignment and direction
            [{ align: [] }, { direction: "rtl" }],

            // Colors and backgrounds
            [{ color: [] }, { background: [] }],
          ],
        },
        placeholder: "Write something...",
      });
    }

    return () => {
      quillRef.current = null; // Cleanup to avoid memory leaks
    };
  }, []);

  // Expose the getContent function to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        const content = quillRef.current.root.innerHTML; // HTML content
        console.log("Editor Content:", content); // <-- Log here
        return content;
      }

      return "";
    },
  }));

  return <div ref={editorRef} style={{ height: "600px" }} />;
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
