export const API_URL: "https://api.gologin.com";
export const FALLBACK_API_URL: "https://api.gologin.co";
export function ensureDirectoryExists(filePath: any): Promise<void>;
declare function _composeExtractionPromises(filteredArchives: any, destPath?: string): any;
declare function _getOS(): "win" | "lin" | "mac" | "macM1";
declare function _getOsAdvanced(): Promise<{
    os: string;
    osSpec: string;
}>;
declare const _USER_EXTENSIONS_PATH: string;
declare const _CHROME_EXTENSIONS_PATH: string;
export { _composeExtractionPromises as composeExtractionPromises, _getOS as getOS, _getOsAdvanced as getOsAdvanced, _USER_EXTENSIONS_PATH as USER_EXTENSIONS_PATH, _CHROME_EXTENSIONS_PATH as CHROME_EXTENSIONS_PATH };
