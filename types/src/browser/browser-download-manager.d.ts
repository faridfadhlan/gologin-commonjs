export class BrowserDownloadLockManager {
    static getInstance(): any;
    ensureBrowserDownload(majorVersion: any, downloadFunction: any): Promise<any>;
    acquireLockAndDownload(lockFilePath: any, majorVersion: any, downloadFunction: any): Promise<any>;
    createLockFile(lockFilePath: any, majorVersion: any): Promise<void>;
    releaseLock(lockFilePath: any): Promise<void>;
    waitForLockRelease(lockFilePath: any, checkInterval: any): Promise<any>;
    checkBrowserExists(majorVersion: any): Promise<boolean>;
    isProcessRunning(pid: any): Promise<any>;
    checkLockValidity(lockFilePath: any): Promise<any>;
    cleanupStaleLocks(): Promise<void>;
}
export default BrowserDownloadLockManager;
