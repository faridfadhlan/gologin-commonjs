export const __esModule: boolean;
export function downloadCookies({ profileId, ACCESS_TOKEN, API_BASE_URL }: {
    profileId: any;
    ACCESS_TOKEN: any;
    API_BASE_URL: any;
}): any;
export function uploadCookies({ cookies, profileId, ACCESS_TOKEN, API_BASE_URL }: {
    cookies?: any[];
    profileId: any;
    ACCESS_TOKEN: any;
    API_BASE_URL: any;
}): any;
export function downloadFonts(fontsList: any[], profilePath: any): Promise<void>;
export function composeFonts(fontsList: any[], profilePath: any, differentOs?: boolean): Promise<void>;
export function copyFontsConfigFile(profilePath: any): Promise<void>;
export function setExtPathsAndRemoveDeleted(settings?: {}, profileExtensionsCheckRes?: any[], profileId?: string): any;
export function setOriginalExtPaths(settings?: {}, originalExtensionsFolder?: string): Promise<any>;
export function recalculateId({ localExtObj, extensionId, extensionsSettings, currentExtSettings }: {
    localExtObj: any;
    extensionId: any;
    extensionsSettings: any;
    currentExtSettings: any;
}): Promise<any>;
