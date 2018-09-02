import * as _ from "lodash";

export class KeyValuePair {
    public key: string;
    public value: any;

    public static async getValues(obj: any): Promise<KeyValuePair[]> {
        const result: KeyValuePair[] = [];
        if (!(typeof(obj) === "object")) {
            throw new Error("can't get values because " + obj + " is not a serializable object");
        } else {
            _.each(obj, (k, v) => {
                result.push(new KeyValuePair(k, v));
            });
            return Promise.resolve(result);
            // const prom = new Promise<KeyValuePair[]>((resolve, reject) => {
            //     resolve(result);
            // })
        }
    }

    public constructor(k: string, val: any) {
        this.key = k;
        this.value = val;
    }

    
}
