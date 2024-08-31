export const __esModule: boolean;
export default UserExtensionsManager;
export class UserExtensionsManager {
    set userAgent(userAgent: string);
    get userAgent(): string;
    set accessToken(accessToken: string);
    get accessToken(): string;
    set twoFaKey(twoFaKey: string);
    get twoFaKey(): string;
    set apiUrl(apiUrl: any);
    get apiBaseUrl(): string;
    set existedUserExtensions(fileList: any[]);
    get existedUserExtensions(): any[];
    checkLocalUserChromeExtensions: (userChromeExtensions: any, profileId: any) => Promise<any[]>;
    getExtensionsStrToIncludeAsOrbitaParam(profileExtensions?: any[], folderPath?: any): Promise<any[]>;
    getExtensionsNameAndImage(extensionsIds: any, pathToExtensions: any): Promise<any>;
    generateExtensionId(): string;
    #private;
}
