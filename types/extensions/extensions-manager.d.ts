export const __esModule: boolean;
export default ExtensionsManager;
declare const ExtensionsManager_base: any;
export class ExtensionsManager extends ExtensionsManager_base {
    [x: string]: any;
    init(): Promise<any>;
    existedUserExtensions: any;
    get isInited(): boolean;
    get useLocalExtStorage(): boolean;
    get deleteProfileExtFolders(): boolean;
    get useCookiesExt(): boolean;
    get existedChromeExtensionsList(): any[];
    checkChromeExtensions(profileExtensions?: any[]): Promise<any>;
    downloadChromeExtensions(idsToDownload?: any[]): Promise<any>;
    getExtensionsPolicies(): Promise<void>;
    updateExtensions(): Promise<void>;
    checkLocalExtensions(): Promise<void>;
    insertExtensionsToDb(extensionsIds: any, pathToExtensions?: any): Promise<void>;
    getExtensionsToInstall(extensionsFromPref: any, extensionsFromDB: any): any;
    #private;
}
