import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Save, FileText, Loader2, MessageSquare, X, Send } from "lucide-react";
import { workspaceApi } from "@/lib/api/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteEditorProps {
  projectId: string;
  noteId?: string;
  initialTitle?: string;
  initialContent?: string;
  onSave?: () => void;
}

export function NoteEditor({ projectId, noteId, initialTitle = "Untitled Note", initialContent = "", onSave }: NoteEditorProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isClient, setIsClient] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const saveMutation = useMutation({
    mutationFn: async () => {
      // Mocked workspaceApi call. Replace with actual API when ready.
      // await workspaceApi.saveNote(projectId, { id: noteId, title, content });
      console.log("Saving note:", { projectId, noteId, title, content });
      return { id: noteId || "new-note-id", title, content };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", projectId] });
      if (onSave) onSave();
    }
  });

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      ['clean']
    ],
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col h-full bg-card/30 border border-border/50 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-3 flex-1 mr-4">
          <FileText className="h-5 w-5 text-blue-400" />
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent border-none text-lg font-semibold text-foreground focus:outline-none focus:ring-0 w-full placeholder:text-muted-foreground"
            placeholder="Note Title"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            size="sm" 
            variant={showComments ? "secondary" : "outline"}
            onClick={() => setShowComments(!showComments)}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Comments
          </Button>
          <Button 
            size="sm" 
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="gap-2"
          >
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-0 overflow-y-auto [&_.ql-container]:border-none [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-border/50 [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-foreground relative z-10">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            placeholder="Start writing your research notes here..."
            className="h-full"
          />
        </div>
        
        {/* Comments Sidebar */}
        {showComments && (
          <div className="w-80 border-l border-border/50 bg-background/50 backdrop-blur-sm flex flex-col shrink-0">
            <div className="p-3 border-b border-border/50 flex items-center justify-between">
              <span className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                Team Comments
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowComments(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-card border border-border/50 rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold">Dr. Sarah Chen</span>
                  <span className="text-[10px] text-muted-foreground">2 hrs ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Great start! Can we expand on the LRRK2 findings from the recent Nature paper?</p>
              </div>
            </div>
            <div className="p-3 border-t border-border/50">
              <div className="relative">
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-background border border-border/50 rounded-md py-2 pl-3 pr-10 text-xs focus:outline-none focus:border-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newComment.trim()) {
                      setNewComment("");
                    }
                  }}
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => {
                    if (newComment.trim()) setNewComment("");
                  }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
