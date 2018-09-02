import * as Magic from "mtgsdk-ts";
import * as _ from "lodash";
import * as fs from "fs";
// import "MagicEmitter";

// Magic.Sets.all({name: "duel"})
//     .on("data", (set) => {
//         console.log(JSON.stringify(set) + ",");
//     }).on("end", () => {
//         console.log("done");
//     });

// let emitter: Magic.MagicEmitter<any> = new MagicEmitter

const result = [];
const newFormatSets = [];
const newFormatSetCodes = [];

Magic.Sets.all()
    .on("data", (set) => {
        result.push(set);
    }).on("end", () => {
        console.log("done getting data");
        save("magic-sets.json", result);
        _.each(result, (s, index) => {
            if (s.name.indexOf("duel") < 0) {
                newFormatSets.push(s);
                newFormatSetCodes.push(s.code);
            }
        });
        save("new-format.json", newFormatSets);
        console.log(newFormatSetCodes);
    });


function save(name: string, data: any): void {
    fs.writeFile(name, data, (err) => {
        if (err) { throw err; }
    });
}
