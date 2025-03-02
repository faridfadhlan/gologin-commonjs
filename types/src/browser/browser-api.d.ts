export function updateProfileResolution(profileId: string, ACCESS_TOKEN: string, resolution: string): any;
export function updateProfileUserAgent(profileId: string, ACCESS_TOKEN: string, userAgent: string): any;
export function updateProfileProxy(profileId: string, ACCESS_TOKEN: string, browserProxyData: {
    mode: "http" | "socks4" | "socks5" | "none";
    host?: string;
    port?: string;
    username?: string;
    password?: string;
}): any;
export function updateProfileBookmarks(profileIds: any, ACCESS_TOKEN: string, bookmarks: any): Promise<any>;
