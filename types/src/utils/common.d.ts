export const API_URL: "https://api.gologin.com";
declare function _composeExtractionPromises(filteredArchives: any, destPath?: any): any;
declare function _getOS(): "win" | "lin" | "mac" | "macM1";
declare function _getOsAdvanced(): Promise<{
    os: string;
    osSpec: any;
}>;
declare const _USER_EXTENSIONS_PATH: any;
declare const _CHROME_EXTENSIONS_PATH: any;
export { _composeExtractionPromises as composeExtractionPromises, _getOS as getOS, _getOsAdvanced as getOsAdvanced, _USER_EXTENSIONS_PATH as USER_EXTENSIONS_PATH, _CHROME_EXTENSIONS_PATH as CHROME_EXTENSIONS_PATH };
