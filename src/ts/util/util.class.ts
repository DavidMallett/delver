export class Util {

    public static createUuid(length: number): string {
        const chars: string = "abcdefghijklmnopqrstuvwxyz1234567890";
        let id: string = "";

        for(let i: number = 0; i<length; i++) {
            id += chars.charAt(Math.random() * chars.length);
        }

        // return Promise.resolve(id);
        return id;
    }
}
