import { ICard, Type, Ruling, ForeignName } from "./card-interface";
import { ICreatureCard } from "./card-children";
import { CharacteristicDefiningAbility } from "../layers/cda.class";
import { KeyValuePair as kvp } from "../util/key-value-pair";
import * as fs from "fs";
import * as _ from "lodash";

import { Color, ColorIdentity, Rarity, Layout, Legality, BlockLegality, Card } from "../../../node_modules/mtgsdk-ts/out/IMagic";

import * as Magic from "mtgsdk-ts";

export class Creature implements ICreatureCard {

    // public static fromJSON(json: string): Creature {
    //     const parsed = JSON.parse(json);
    // }

    // public static fromObject(obj: any): Creature {
    //     for (const key in obj) {

    //     }
    // }

    // public static handleMultiResults(filter: Magic.CardFilter): Creature[] {
    //     Magic.Cards.where(filter).then(results => {

    //     })
    // }

    public artist: string;
    public cmc: number;
    public colorIdentity: ("W" | "U" | "B" | "R" | "G")[];
    public colors: ("White" | "Blue" | "Black" | "Red" | "Green")[];
    public flavor?: string;
    public foreignNames: ForeignName[];
    public id: string;
    public imageUrl?: string;
    public layout: "normal" | "split" | "flip" | "double-faced" | "token" | "plane" | "scheme" | "phenomenon" | "leveler" | "vanguard";
    public legalities: BlockLegality[];
    public manaCost?: string;
    public multiverseid?: number;
    public name: string;
    public names?: string[];
    public number: string;
    public originalText: string;
    public originalType: string;
    public printings: string[];
    public rarity: "Basic Land" | "Common" | "Uncommon" | "Mythic Rare" | "Timeshifted" | "Masterpiece";
    public rulings: Ruling[];
    public set: string;
    public setName: string;
    public subtypes: string[];
    public supertypes: string[];
    public text: string;
    public type: Type;
    public typeLine: string;
    public types: string[];
    public variations: number[];
    public power: number;
    public toughness: number;
    public cdas: CharacteristicDefiningAbility[];

    public constructor(card: Magic.Card) {
        _.each(card, (value: any, key: string) => {
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                this[key] = value;
            } else {
                this[key] = JSON.parse(JSON.stringify(value));
            }
        });
    }

}
