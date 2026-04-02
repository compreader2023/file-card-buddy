import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addFile, FileItem } from "@/lib/fileStore";
import { Upload, FileText, Image } from "lucide-react";
import { toast } from "sonner";

interface UploadDialogProps {
  type: 'html' | 'image';
  onUpload: () => void;
}

const UploadDialog = ({ type, onUpload }: UploadDialogProps) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = type === 'html' ? '.html,.htm' : 'image/*';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    if (type === 'image') {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("请选择文件");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const item: FileItem = {
        id: crypto.randomUUID(),
        name: selectedFile.name,
        type,
        size: selectedFile.size,
        description,
        createdAt: Date.now(),
        ...(type === 'image'
          ? { dataUrl: reader.result as string }
          : { content: reader.result as string }),
      };
      addFile(item);
      toast.success("上传成功");
      setOpen(false);
      setSelectedFile(null);
      setDescription("");
      setPreview("");
      onUpload();
    };
    if (type === 'image') {
      reader.readAsDataURL(selectedFile);
    } else {
      reader.readAsText(selectedFile);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="w-4 h-4" />
          上传{type === 'html' ? 'HTML' : '图片'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'html' ? <FileText className="w-5 h-5" /> : <Image className="w-5 h-5" />}
            上传{type === 'html' ? 'HTML 文件' : '图片'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
          >
            {preview ? (
              <img src={preview} alt="preview" className="max-h-40 mx-auto rounded-lg" />
            ) : selectedFile ? (
              <div>
                <FileText className="w-10 h-10 text-primary mx-auto mb-2" />
                <p className="text-sm text-foreground">{selectedFile.name}</p>
              </div>
            ) : (
              <div>
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">点击选择{type === 'html' ? 'HTML' : '图片'}文件</p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <Input
            placeholder="添加描述（可选）"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Button className="w-full" onClick={handleUpload} disabled={!selectedFile}>
            确认上传
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
