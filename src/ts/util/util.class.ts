import * as _ from "Lodash";

export class Util {

    public static async makeId(length: number): Promise<string> {
        const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let id: string = "";

        for(let i: number = 0; i<length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // return Promise.resolve(id);
        return Promise.resolve(id);
    }

    public static createUuid(length: number): string {
        const chars: string = "abcdefghijklmnopqrstuvwxyz1234567890";
        let id: string = "";

        for(let i: number = 0; i<length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // return Promise.resolve(id);
        return id;
    }

    public static compactArray(arr: any[]): any[] {
        return _.compact(arr);
    }

}
