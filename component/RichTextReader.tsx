"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Define the ref type
export type RichTextEditorHandle = {
  getContent: () => string;
};

interface RichTextEditorProps {
  value?: string; // pass existing HTML content
}

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ value }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
      if (editorRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: false, // <-- disable toolbar
          },
          readOnly: true, // <-- make editor read-only
        });

        if (value) {
          quillRef.current.root.innerHTML = value; // set initial content
        }
      }

      return () => {
        quillRef.current = null;
      };
    }, [value]);

    useImperativeHandle(ref, () => ({
      getContent: () => {
        if (quillRef.current) {
          return quillRef.current.root.innerHTML;
        }
        return "";
      },
    }));

    return <div ref={editorRef} style={{ minHeight: "700px" }} />;
  }
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
