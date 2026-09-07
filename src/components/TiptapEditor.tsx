'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered, 
  Quote, Code, Minus, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Sparkles
} from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TiptapEditor({ content, onChange, placeholder = "Start writing your story..." }: TiptapEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: 'list-disc pl-6 space-y-1' } },
        orderedList: { HTMLAttributes: { class: 'list-decimal pl-6 space-y-1' } },
        blockquote: { HTMLAttributes: { class: 'border-l-4 border-purple-400 pl-4 italic my-4 bg-purple-50/50 dark:bg-purple-950/20 py-2 rounded-r-xl' } },
        codeBlock: { HTMLAttributes: { class: 'bg-slate-950 text-slate-100 p-4 rounded-xl my-4 font-mono text-sm' } }
      }),
      Underline,
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-purple-600 dark:text-purple-400 underline font-medium' } }),
    ],
    content: content || '<p>Write your thoughts, essays, or technical deep-dive here...</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(text.length);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-content outline-none focus:outline-none min-h-[380px] p-6 sm:p-10 font-sans text-base sm:text-lg leading-relaxed text-slate-900 dark:text-slate-100',
      }
    }
  });

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter Destination URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Enter Image URL (e.g. https://images.unsplash.com/...):');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm transition-colors">
      
      {/* Formatting Toolbar */}
      <div className="sticky top-18 z-30 bg-stone-50/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Tools */}
        <div className="flex flex-wrap items-center gap-1">
          
          {/* Text Styling Group */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('bold') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('italic') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('underline') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('strike') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Strikethrough"
          >
            <Strikethrough size={15} />
          </button>

          <div className="w-px h-5 bg-stone-200 dark:border-slate-800 mx-1" />

          {/* Headings Group */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('heading', { level: 1 }) 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Heading 1"
          >
            <Heading1 size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('heading', { level: 2 }) 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Heading 2"
          >
            <Heading2 size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('heading', { level: 3 }) 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Heading 3"
          >
            <Heading3 size={15} />
          </button>

          <div className="w-px h-5 bg-stone-200 dark:border-slate-800 mx-1" />

          {/* Lists & Quotes */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('bulletList') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Bullet List"
          >
            <List size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('orderedList') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Numbered List"
          >
            <ListOrdered size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('blockquote') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Blockquote"
          >
            <Quote size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('codeBlock') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Code Block"
          >
            <Code size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded-xl hover:bg-stone-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            title="Divider"
          >
            <Minus size={15} />
          </button>

          <div className="w-px h-5 bg-stone-200 dark:border-slate-800 mx-1" />

          {/* Link & Image Insert */}
          <button
            type="button"
            onClick={setLink}
            className={`p-2 rounded-xl transition-colors ${
              editor.isActive('link') 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-800'
            }`}
            title="Insert Link"
          >
            <LinkIcon size={15} />
          </button>

          <button
            type="button"
            onClick={addImage}
            className="p-2 rounded-xl hover:bg-stone-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            title="Insert Image URL"
          >
            <ImageIcon size={15} />
          </button>

          {/* History */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded-xl hover:bg-stone-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-colors"
            title="Undo"
          >
            <Undo size={15} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded-xl hover:bg-stone-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-colors"
            title="Redo"
          >
            <Redo size={15} />
          </button>

        </div>

        {/* Telemetry Stats */}
        <div className="flex items-center gap-2 font-mono text-xs text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-3 py-1.5 rounded-xl border border-purple-200/70 dark:border-purple-900/40">
          <span className="font-bold">{wordCount} WORDS</span>
          <span>·</span>
          <span>{readTimeMinutes} MIN READ</span>
        </div>

      </div>

      {/* Editor Content Area */}
      <div className="bg-white dark:bg-slate-900/80">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}
