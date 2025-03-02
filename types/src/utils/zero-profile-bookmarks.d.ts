export namespace zeroProfileBookmarks {
    let checksum: string;
    namespace roots {
        namespace bookmark_bar {
            let children: ({
                children: {
                    name: string;
                    type: string;
                    url: string;
                }[];
                name: string;
                type: string;
                url?: undefined;
            } | {
                name: string;
                type: string;
                url: string;
                children?: undefined;
            })[];
            let name: string;
            let type: string;
        }
        namespace other {
            let children_1: any[];
            export { children_1 as children };
            let name_1: string;
            export { name_1 as name };
            let type_1: string;
            export { type_1 as type };
        }
        namespace synced {
            let children_2: any[];
            export { children_2 as children };
            let name_2: string;
            export { name_2 as name };
            let type_2: string;
            export { type_2 as type };
        }
    }
    let version: number;
}
