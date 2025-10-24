export class GoLogin {
    constructor(options?: {});
    browserLang: string;
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
    isEmptyFonts: boolean;
    isFirstSession: boolean;
    isCloudHeadless: any;
    storageGatewayUrl: string;
    tmpdir: any;
    autoUpdateBrowser: boolean;
    checkBrowserUpdate: any;
    browserChecker: BrowserChecker;
    uploadCookiesToServer: any;
    writeCookiesFromServer: any;
    remote_debugging_port: any;
    timezone: any;
    extensionPathsToInstall: any[];
    customArgs: any;
    restoreLastSession: any;
    processSpawned: import("child_process").ChildProcess;
    processKillTimeout: number;
    browserMajorVersion: number;
    newProxyOrbbitaMajorVersion: number;
    proxyCheckTimeout: any;
    proxyCheckAttempts: any;
    browserLatestMajorVersion: number;
    profile_zip_path: string;
    bookmarksFilePath: string;
    checkBrowser(majorVersion: any): Promise<void>;
    checkAndDownloadBrowserByOpts(opts?: {}): Promise<void>;
    getLatestBrowserVersion(): Promise<number>;
    latestBrowserMajorVersion: number;
    setProfileId(profile_id: any): Promise<void>;
    cookiesFilePath: string;
    getProfile(profile_id: any): Promise<any>;
    getProfileS3(): Promise<"" | Buffer>;
    postFile(fileName: any, fileBuff: any): Promise<void>;
    getGologinPreferences(profileData: any): {
        profile_id: any;
        name: any;
        is_m1: any;
        navigator: {
            platform: any;
            max_touch_points: any;
        };
        dns: any;
        proxy: {
            username: any;
            password: any;
        };
        webRTC: any;
        screenHeight: any;
        screenWidth: any;
        userAgent: any;
        webGl: {
            vendor: any;
            renderer: any;
            mode: boolean;
        };
        webgl: {
            metadata: {
                vendor: any;
                renderer: any;
                mode: boolean;
            };
        };
        mobile: {
            enable: boolean;
            width: any;
            height: any;
            device_scale_factor: any;
        };
        webglParams: any;
        webGpu: any;
        webgl_noice_enable: boolean;
        webglNoiceEnable: boolean;
        webgl_noise_enable: boolean;
        webgl_noise_value: any;
        webglNoiseValue: any;
        getClientRectsNoice: any;
        client_rects_noise_enable: boolean;
        media_devices: {
            enable: any;
            uid: any;
            audioInputs: any;
            audioOutputs: any;
            videoInputs: any;
        };
        doNotTrack: any;
        plugins: {
            all_enable: any;
            flash_enable: any;
        };
        storage: {
            enable: any;
        };
        audioContext: {
            enable: boolean;
            noiseValue: any;
        };
        canvas: {
            mode: any;
        };
        languages: any;
        langHeader: any;
        canvasMode: any;
        canvasNoise: any;
        deviceMemory: number;
        hardwareConcurrency: any;
        startupUrl: any;
        startup_urls: any;
        geolocation: {
            mode: any;
            latitude: number;
            longitude: number;
            accuracy: number;
        };
        timezone: {
            id: any;
        };
    };
    createBrowserExtension(): Promise<void>;
    extractProfile(path: any, zipfile: any): any;
    downloadProfileAndExtract(profile: any, local: any): Promise<void>;
    createZeroProfile(createCookiesTableQuery: any): Promise<void>;
    createStartup(local?: boolean): Promise<string>;
    language: any;
    resolution: {
        width: number;
        height: number;
    };
    createCookiesTableQuery: any;
    proxy: any;
    commitProfile(): Promise<void>;
    profilePath(): string;
    orbitaExtensionPath(): string;
    getRandomInt(min: any, max: any): any;
    checkPortAvailable(port: any): Promise<boolean>;
    getRandomPort(): Promise<any>;
    getTimeZone(proxy: any): Promise<any>;
    _tz: any;
    getTimezoneWithSocks(params: any): Promise<any>;
    spawnArguments(): Promise<string[]>;
    spawnBrowser(): Promise<"" | {
        wsUrl: any;
        resolution: {
            width: number;
            height: number;
        };
    }>;
    port: any;
    clearProfileFiles(): Promise<void>;
    stopAndCommit(options: any, local?: boolean): Promise<boolean>;
    uploadProfileDataToServer(): Promise<any>;
    stopBrowser(): Promise<void>;
    killBrowser(): void;
    killAndCommit(options: any, local?: boolean): Promise<void>;
    sanitizeProfile(): Promise<void>;
    getProfileDataToUpdate(): Promise<any>;
    getRandomFingerprint(options: any): Promise<any>;
    create(options: any): Promise<any>;
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
    };
    postCookies(profileId: any, cookies: any): Promise<any>;
    getCookies(profileId: any): Promise<any>;
    getCookiePath(defaultFilePath: any): {
        primary: string;
        secondary: string;
    };
    writeCookiesToFile(cookies: any, isSecondTry?: boolean): Promise<void>;
    saveBookmarksToDb(): Promise<void>;
    start(): Promise<{
        status: string;
        wsUrl: any;
        resolution: any;
    }>;
    startLocal(): Promise<{
        status: string;
        wsUrl: any;
    }>;
    stop(): Promise<void>;
    stopLocal(options: any): Promise<void>;
    waitDebuggingUrl(delay_ms: any, try_count: number, remoteOrbitaUrl: any): any;
    stopRemote(): Promise<any>;
    changeProfileProxy(proxyData: any): Promise<any>;
    changeProfileUserAgent(userAgent: any): Promise<any>;
    changeProfileResolution(resolution: any): Promise<any>;
    getAvailableFonts(): string[];
    quickCreateProfile(name?: string): Promise<any>;
    profiles(): Promise<any>;
    getNewFingerPrint(os: any): Promise<any>;
}
export default GoLogin;
import BrowserChecker from './browser/browser-checker.js';
export { exitAll, GologinApi } from "./gologin-api.js";
