"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Copy,
  Check,
  Eye,
  Pencil,
  Columns,
  Download,
  Share2,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

type ViewMode = "edit" | "preview" | "split";

interface PreviewPanelProps {
  markdown: string;
}

export function PreviewPanel({ markdown }: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  function MarkdownImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    const [error, setError] = useState(false);
    if (error) {
      return <></>;
    }
    return (
      <img
        {...props}
        className="max-w-full inline-block rounded-xl mb-4 border border-zinc-200 dark:border-zinc-800"
        loading="lazy"
        onError={() => setError(true)}
      />
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    addToast({
      title: "Copied!",
      description: "Markdown copied to clipboard",
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const showEditor = viewMode === "edit" || viewMode === "split";
  const showPreview = viewMode === "preview" || viewMode === "split";

  return (
    <div className="h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            README.md
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Copy markdown"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => {
              const blob = new Blob([markdown], { type: "text/markdown" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "README.md";
              a.click();
              URL.revokeObjectURL(url);
              addToast({
                title: "Downloaded!",
                description: "README.md downloaded",
                variant: "success",
              });
            }}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="h-4 w-4" />
          </button>
          {/* TODO: Version 2.0 */}
          {/* <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <Share2 className="h-4 w-4" />
          </button> */}
          <div className="flex items-center gap-1 ml-2 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <button
              onClick={() => setViewMode("edit")}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "edit"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              title="Edit mode"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "preview"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              title="Preview mode"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "split"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              title="Split view"
            >
              <Columns className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div
          className={`h-full ${showEditor && showPreview ? "grid grid-cols-2" : "grid"} overflow-auto`}
        >
          {/* Editor */}
          {showEditor && (
            <div
              className={`${showPreview ? "border-r border-zinc-200 dark:border-zinc-800" : ""} overflow-auto`}
            >
              <textarea
                readOnly
                value={markdown}
                className="w-full h-full p-6 resize-none bg-transparent text-sm font-mono text-zinc-700 dark:text-zinc-300 focus:outline-none leading-relaxed"
                spellCheck={false}
              />
            </div>
          )}

          {/* Preview */}
          {showPreview && (
            <div className="overflow-auto p-6 sm:p-8">
              <div className="markdown-body prose prose-zinc dark:prose-invert max-w-none">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-4 mt-0 text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mb-3 mt-6 text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mb-2 mt-5 text-zinc-900 dark:text-zinc-100">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-semibold mb-2 mt-4 text-zinc-900 dark:text-zinc-100">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {children}
                      </p>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-zinc-800 dark:text-zinc-200">
                        {children}
                      </em>
                    ),
                    del: ({ children }) => (
                      <del className="text-zinc-500 dark:text-zinc-400">
                        {children}
                      </del>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = className?.includes("language-");
                      if (isBlock) {
                        return <code className={className}>{children}</code>;
                      }
                      return (
                        <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm font-mono text-red-600 dark:text-red-400">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto text-sm font-mono mb-4">
                        {children}
                      </pre>
                    ),
                    img: MarkdownImg,
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-1 text-zinc-700 dark:text-zinc-300 marker:text-zinc-400 dark:marker:text-zinc-500">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-1 text-zinc-700 dark:text-zinc-300 marker:text-zinc-400 dark:marker:text-zinc-500">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 py-1 mb-4 text-zinc-600 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-800/50 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    hr: () => (
                      <hr className="my-6 border-zinc-200 dark:border-zinc-700" />
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-zinc-100 dark:bg-zinc-800">
                        {children}
                      </thead>
                    ),
                    tbody: ({ children }) => (
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        {children}
                      </tbody>
                    ),
                    tr: ({ children }) => (
                      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        {children}
                      </tr>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-700 last:border-r-0">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-700 last:border-r-0">
                        {children}
                      </td>
                    ),
                    input: ({ type, checked }) =>
                      type === "checkbox" ? (
                        <input
                          type="checkbox"
                          checked={checked}
                          readOnly
                          className="mr-2 accent-indigo-600 dark:accent-indigo-400"
                        />
                      ) : undefined,
                  }}
                >
                  {markdown}
                </Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
