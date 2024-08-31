export const __esModule: boolean;
export default BrowserChecker;
export class BrowserChecker {
    constructor(skipOrbitaHashChecking: any);
    checkBrowser(autoUpdateBrowser?: boolean, checkBrowserUpdate?: boolean): Promise<any>;
    downloadBrowser(latestVersion: any, browserDownloadUrl: any): Promise<void>;
    addLatestVersion(latestVersion: any): any;
    downloadBrowserArchive(link: any, pathStr: any): any;
    checkBrowserArchive(pathStr: any): Promise<void>;
    extractBrowser(): Promise<any>;
    downloadHashFile(latestVersion: any): Promise<any>;
    checkBrowserSum(latestVersion: any): Promise<any>;
    replaceBrowser(): Promise<any>;
    deleteOldArchives(deleteCurrentBrowser?: boolean): Promise<any>;
    copyDir(src: any, dest: any): Promise<void>;
    getCurrentVersion(): any;
    getLatestBrowserVersion(): any;
    get getOrbitaPath(): any;
    deleteDir(path?: string): Promise<any>;
    #private;
}
