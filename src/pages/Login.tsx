import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/fileStore";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/dashboard");
    } else {
      toast.error("用户名或密码错误");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">文件管理</h1>
            <p className="text-muted-foreground text-sm mt-1">登录以管理您的文件</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="用户名"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="密码"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="w-full">登录</Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">
            默认账号: admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
