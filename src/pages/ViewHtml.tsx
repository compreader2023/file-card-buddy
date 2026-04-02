import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFileByName } from "@/lib/fileStore";

const ViewHtml = () => {
  const { filename } = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!filename) return;
    const file = getFileByName(filename);
    if (file && file.content) {
      setContent(file.content);
    } else {
      setNotFound(true);
    }
  }, [filename]);

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <p className="text-muted-foreground">文件未找到</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return <iframe srcDoc={content} className="w-full h-screen border-0" title="HTML Preview" />;
};

export default ViewHtml;
