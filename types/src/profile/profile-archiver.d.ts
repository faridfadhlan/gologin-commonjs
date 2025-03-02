export function archiveProfile(profileFolder?: string): Promise<any>;
export function decompressProfile(zipPath?: string, profileFolder?: string): Promise<void>;
export function checkProfileArchiveIsValid(zipObject: any): boolean;
