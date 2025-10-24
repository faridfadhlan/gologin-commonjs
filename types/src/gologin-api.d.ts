export function exitAll(): void;
export function getDefaultParams(): {
    token: string;
    profile_id: string;
    executablePath: string;
};
export function GologinApi({ token }: {
    token: any;
}): {
    launch(params?: {}): Promise<{
        browser: any;
    }>;
    createProfileWithCustomParams(options: any): Promise<any>;
    refreshProfilesFingerprint(profileIds: any): Promise<any>;
    createProfileRandomFingerprint(name?: string): Promise<any>;
    updateUserAgentToLatestBrowser(profileIds: any, workspaceId?: string): Promise<any>;
    changeProfileProxy(profileId: any, proxyData: any): Promise<any>;
    getAvailableType(availableTrafficData: any): "none" | "mobile" | "resident" | "dataCenter";
    addGologinProxyToProfile(profileId: any, countryCode: any, proxyType?: string): Promise<any>;
    addCookiesToProfile(profileId: any, cookies: any): Promise<any>;
    deleteProfile(profileId: any): Promise<any>;
    exit(): Promise<void>;
};
