import { FileItem, deleteFile } from "@/lib/fileStore";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, ExternalLink, FileText, Image } from "lucide-react";
import { toast } from "sonner";

interface FileCardProps {
  file: FileItem;
  onDelete: () => void;
}

const FileCard = ({ file, onDelete }: FileCardProps) => {
  const baseUrl = window.location.origin;
  const fileUrl = file.type === 'html'
    ? `${baseUrl}/view/${file.name}`
    : file.dataUrl || '';

  const copyLink = () => {
    navigator.clipboard.writeText(fileUrl);
    toast.success("链接已复制");
  };

  const handleDelete = () => {
    deleteFile(file.id);
    onDelete();
    toast.success("文件已删除");
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-primary/30">
      {file.type === 'image' && file.dataUrl ? (
        <a href={file.dataUrl} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-muted overflow-hidden cursor-pointer">
          <img src={file.dataUrl} alt={file.name} className="w-full h-full object-cover" />
        </a>
      ) : (
        <a href={`/view/${file.name}`} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-muted flex items-center justify-center cursor-pointer">
          <FileText className="w-12 h-12 text-muted-foreground/40" />
        </a>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-foreground text-sm truncate flex-1">{file.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
            {file.type === 'html' ? 'HTML' : '图片'}
          </span>
        </div>
        {file.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{file.description}</p>
        )}
        <p className="text-xs text-muted-foreground mb-3">
          {formatSize(file.size)} · {new Date(file.createdAt).toLocaleDateString('zh-CN')}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={copyLink}>
            <Copy className="w-3 h-3" /> 复制链接
          </Button>
          {file.type === 'html' && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/view/${file.name}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
