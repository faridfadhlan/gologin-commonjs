export = GoLogin;
declare class GoLogin {
    constructor(options?: {});
    browserLang: string;
    is_remote: any;
    access_token: any;
    profile_id: any;
    password: any;
    extra_params: any;
    executablePath: any;
    vnc_port: any;
    fontsMasking: boolean;
    is_active: boolean;
    is_stopping: boolean;
    differentOs: boolean;
    profileOs: string;
    waitWebsocket: any;
    isCloudHeadless: any;
    isNewCloudBrowser: any;
    tmpdir: any;
    autoUpdateBrowser: boolean;
    checkBrowserUpdate: any;
    browserChecker: any;
    uploadCookiesToServer: any;
    writeCookiesFromServer: any;
    remote_debugging_port: any;
    timezone: any;
    extensionPathsToInstall: any[];
    customArgs: any;
    restoreLastSession: any;
    processSpawned: any;
    processKillTimeout: number;
    profile_zip_path: any;
    bookmarksFilePath: any;
    checkBrowser(): Promise<any>;
    setProfileId(profile_id: any): Promise<void>;
    cookiesFilePath: any;
    getToken(username: any, password: any): Promise<void>;
    getNewFingerPrint(os: any): Promise<any>;
    profiles(): Promise<any>;
    getProfile(profile_id: any): Promise<any>;
    emptyProfile(): Promise<any>;
    getProfileS3(s3path: any): Promise<any>;
    postFile(fileName: any, fileBuff: any): Promise<void>;
    emptyProfileFolder(): Promise<any>;
    convertPreferences(preferences: any): any;
    createBrowserExtension(): Promise<void>;
    extractProfile(path: any, zipfile: any): any;
    createStartup(local?: boolean): Promise<any>;
    language: any;
    resolution: {
        width: number;
        height: number;
    } | {
        width: number;
        height: number;
    };
    proxy: any;
    commitProfile(): Promise<void>;
    profilePath(): any;
    orbitaExtensionPath(): any;
    getRandomInt(min: any, max: any): any;
    checkPortAvailable(port: any): Promise<boolean>;
    getRandomPort(): Promise<any>;
    getTimeZone(proxy: any): Promise<any>;
    _tz: any;
    getTimezoneWithSocks(params: any): Promise<any>;
    spawnArguments(): Promise<string[]>;
    spawnBrowser(): Promise<any>;
    port: any;
    createStartupAndSpawnBrowser(): Promise<any>;
    clearProfileFiles(): Promise<void>;
    stopAndCommit(options: any, local?: boolean): Promise<boolean>;
    stopBrowser(): Promise<void>;
    killBrowser(): void;
    killAndCommit(options: any, local?: boolean): Promise<void>;
    sanitizeProfile(): Promise<void>;
    getProfileDataToUpdate(): Promise<any>;
    profileExists(): Promise<boolean>;
    getRandomFingerprint(options: any): Promise<any>;
    create(options: any): Promise<any>;
    createCustom(options: any): Promise<any>;
    quickCreateProfile(name?: string): Promise<any>;
    delete(pid: any): Promise<void>;
    update(options: any): Promise<any>;
    setActive(is_active: any): void;
    getGeolocationParams(profileGeolocationParams: any, tzGeolocationParams: any): {
        mode: any;
        latitude: any;
        longitude: any;
        accuracy: any;
    };
    getViewPort(): {
        width: number;
        height: number;
    } | {
        width: number;
        height: number;
    };
    postCookies(profileId: any, cookies: any): Promise<any>;
    getCookies(profileId: any): Promise<any>;
    writeCookiesToFile(): Promise<void>;
    uploadProfileCookiesToServer(): Promise<any>;
    saveBookmarksToDb(): Promise<void>;
    start(): Promise<{
        status: string;
        wsUrl: any;
        message?: undefined;
    } | {
        status: string;
        message: any;
        wsUrl?: undefined;
    }>;
    startLocal(): Promise<{
        status: string;
        wsUrl: any;
    }>;
    stop(): Promise<any>;
    stopLocal(options: any): Promise<void>;
    waitDebuggingUrl(delay_ms: any, try_count: number, remoteOrbitaUrl: any): any;
    startRemote(delay_ms?: number): Promise<{
        status: string;
        wsUrl: any;
        message?: undefined;
    } | {
        status: string;
        message: any;
        wsUrl?: undefined;
    }>;
    stopRemote(): Promise<any>;
    getAvailableFonts(): string[];
    changeProfileResolution(resolution: any): Promise<any>;
    changeProfileUserAgent(userAgent: any): Promise<any>;
    changeProfileProxy(proxyData: any): Promise<any>;
}
declare namespace GoLogin {
    export { __esModule, GologinApi, exitAll, GoLogin as default };
}
declare const __esModule: boolean;
declare const GologinApi: typeof _gologinApi.GologinApi;
declare const exitAll: typeof _gologinApi.exitAll;
import _gologinApi = require("./gologin-api.js");
