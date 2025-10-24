export class ExtensionsManager extends UserExtensionsManager {
    init(): Promise<boolean | void>;
    get isInited(): boolean;
    get useLocalExtStorage(): boolean;
    get deleteProfileExtFolders(): boolean;
    get useCookiesExt(): boolean;
    get existedChromeExtensionsList(): any[];
    checkChromeExtensions(profileExtensions?: any[]): Promise<string[]>;
    downloadChromeExtensions(idsToDownload?: any[]): Promise<any[]>;
    getExtensionsPolicies(): Promise<void>;
    updateExtensions(): Promise<void>;
    checkLocalExtensions(): Promise<void>;
    insertExtensionsToDb(extensionsIds: any, pathToExtensions?: string): Promise<void>;
    getExtensionsToInstall(extensionsFromPref: any, extensionsFromDB: any): any;
    #private;
}
export default ExtensionsManager;
import UserExtensionsManager from './user-extensions-manager.js';
