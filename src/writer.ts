import * as fs from "fs";
import * as _ from "lodash";
import * as mtg from "mtgsdk-ts";
// const fs = require('fs');
// import * as fs from 'fs';

// The challenge: write a class that fetches card info from magicthegathering.io,
//      checks to see if we have the card in our database, and if not, insert it
//      (and also add it to the index so we can easily determine which cards we
//      have). Advanced: Also check how old the data is, and if it's older than a
//      month, overwrite it with new data from Gatherer.

// NB: It's probably better to use MySQL / Mongo / CSV than just text and JSON files

export class Writer {

    public static async write(card: mtg.Card): Promise<void> {
        fs.appendFile("../cache/" + card.set + "/" + card.name + ".json",
            card.toString(), (err) => {
                if (err) { throw err; }
                return Promise.resolve(null);
            });
    }

    public static async addToIndex(card: mtg.Card): Promise<void> {
        fs.appendFile("../cache/index.txt", "\n" + _.deburr(card.name), (err) => {
            if (err) { throw err; }
            return Promise.resolve(null);
        });
    }

}
