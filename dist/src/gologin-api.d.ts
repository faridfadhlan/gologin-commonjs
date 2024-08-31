export const __esModule: boolean;
export function GologinApi({ token }: {
    token: any;
}): {
    launch(params?: {}): Promise<{
        browser: any;
    }>;
    exit(status?: number): Promise<void>;
    delay: (ms?: number) => any;
};
export function exitAll(): void;
export function getDefaultParams(): {
    token: any;
    profile_id: any;
    executablePath: any;
    autoUpdateBrowser: boolean;
};
export function delay(ms?: number): any;
