import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getFiles, FileItem } from "@/lib/fileStore";
import { loadSampleData } from "@/lib/sampleData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileCard from "@/components/FileCard";
import UploadDialog from "@/components/UploadDialog";
import { LogOut, FileText, Image, FolderOpen, Search } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
      return;
    }
    loadSampleData();
    setFiles(getFiles());
  }, [navigate]);

  const refresh = () => setFiles(getFiles());

  const filtered = (tab === 'all' ? files : files.filter(f => f.type === tab))
    .filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const counts = {
    all: files.length,
    html: files.filter(f => f.type === 'html').length,
    image: files.filter(f => f.type === 'image').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">文件管理</h1>
          </div>
          <div className="flex items-center gap-3">
            <UploadDialog type="html" onUpload={refresh} />
            <UploadDialog type="image" onUpload={refresh} />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">
                全部 <span className="ml-1.5 text-xs text-muted-foreground">({counts.all})</span>
              </TabsTrigger>
              <TabsTrigger value="html">
                <FileText className="w-3.5 h-3.5" /> HTML <span className="ml-1 text-xs text-muted-foreground">({counts.html})</span>
              </TabsTrigger>
              <TabsTrigger value="image">
                <Image className="w-3.5 h-3.5" /> 图片 <span className="ml-1 text-xs text-muted-foreground">({counts.image})</span>
              </TabsTrigger>
            </TabsList>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索文件名..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>

          <TabsContent value={tab}>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <FolderOpen className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-lg">暂无文件</p>
                <p className="text-sm mt-1">点击上方按钮上传文件</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(file => (
                  <FileCard key={file.id} file={file} onDelete={refresh} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
