export class BrowserChecker {
    homedir: string;
    browserPath: string;
    executableFilePath: any;
    skipOrbitaHashChecking: boolean;
    downloadManager: any;
    checkBrowser({ autoUpdateBrowser, majorVersion }: {
        autoUpdateBrowser: any;
        majorVersion: any;
    }): Promise<string>;
    downloadBrowser(majorVersion: any): Promise<void>;
    getBrowserExecutablePath(majorVersion: any): string;
    getBrowserDownloadUrl(majorVersion: any): string;
    addLatestVersion(latestVersion: any): Promise<void>;
    downloadBrowserArchive(link: any, pathStr: any): Promise<any>;
    checkBrowserArchive(pathStr: any): Promise<void>;
    extractBrowser(): Promise<any>;
    downloadHashFile(latestVersion: any): Promise<void>;
    checkBrowserSum(latestVersion: any): Promise<void>;
    replaceBrowser(majorVersion: any): Promise<void>;
    deleteOldArchives(): Promise<void | any[]>;
    copyDir(src: any, dest: any): Promise<void>;
    getCurrentVersion(majorVersion: any): Promise<string>;
    getLatestBrowserVersion(): Promise<any>;
    get getOrbitaPath(): any;
    deleteDir(path?: string): Promise<void>;
}
export default BrowserChecker;
