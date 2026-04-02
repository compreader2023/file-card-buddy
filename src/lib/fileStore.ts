export interface FileItem {
  id: string;
  name: string;
  type: 'html' | 'image';
  size: number;
  description?: string;
  dataUrl?: string; // for images preview
  content?: string; // for html content
  createdAt: number;
}

const STORAGE_KEY = 'file_manager_files';

export function getFiles(): FileItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveFiles(files: FileItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
}

export function addFile(file: FileItem) {
  const files = getFiles();
  files.unshift(file);
  saveFiles(files);
  return files;
}

export function deleteFile(id: string) {
  const files = getFiles().filter(f => f.id !== id);
  saveFiles(files);
  return files;
}

export function getFileById(id: string): FileItem | undefined {
  return getFiles().find(f => f.id === id);
}

export function getFileByName(name: string): FileItem | undefined {
  return getFiles().find(f => f.name === name);
}

const AUTH_KEY = 'file_manager_auth';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export function login(user: string, pass: string): boolean {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
