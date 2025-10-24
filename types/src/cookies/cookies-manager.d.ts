export function getDB(filePath: any, readOnly?: boolean): Promise<import("sqlite").Database<import("sqlite3").Database, import("sqlite3").Statement>>;
export function createDBFile({ cookiesFilePath, cookiesFileSecondPath, createCookiesTableQuery, }: {
    cookiesFilePath: any;
    cookiesFileSecondPath: any;
    createCookiesTableQuery: any;
}): Promise<void>;
export function getUniqueCookies(cookiesArr: any, cookiesFilePath: any): Promise<any>;
export function getChunckedInsertValues(cookiesArr: any): any[][];
export function loadCookiesFromFile(filePath: any, isSecondTry: boolean, profileId: any, tmpdir: any): any;
export function unixToLDAP(unixtime: any): any;
export function ldapToUnix(ldap: any): any;
export function buildCookieURL(domain: any, secure: any, path: any): string;
export function chunk(arr: any, chunkSize?: number, cache?: any[]): any[];
export function getCookiesFilePath(profileId: any, tmpdir: any): Promise<string>;
