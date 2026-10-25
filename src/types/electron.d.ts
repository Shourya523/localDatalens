export interface SystemInfo {
  platform: string;
  arch: string;
  node: string;
  electron: string;
  chrome: string;
  appVersion: string;
}

export interface ElectronAPI {
  getSystemInfo: () => Promise<SystemInfo>;
  getVersion: () => Promise<string>;
  ping: (message: string) => Promise<string>;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  isMaximized: () => Promise<boolean>;
  platform: string;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
