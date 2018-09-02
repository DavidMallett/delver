import * as _ from "Lodash";
import * as Magic from "mtgsdk-ts";

import { ForeignName, ICard, Ruling } from "./card-interface";
import { CharacteristicDefiningAbility } from "../layers/cda.class";

import { Color, ColorIdentity, Rarity, Layout, Legality, BlockLegality } from "../../../node_modules/mtgsdk-ts/out/IMagic";

export interface ICreatureCard extends ICard {
    // creature card specific properties:
    power: number;
    toughness: number;
    cdas: CharacteristicDefiningAbility[]; // see {add markdown summary of layer system to project root}

    // public constructor(exactName: string) {
    //     Magic.Cards.where({
    //         name: '"' + exactName + '"'
    //     }).then((result: Magic.Card[]) => {
    //         _.assign(this, result[0]);
    //     });
    // }
}

export interface IPlaneswalkerCard extends ICard {
    loyalty: number;
}

export interface ISorceryCard extends ICard {
    cast (): void;
}

export interface IInstantCard extends ICard {
    cast (): void;
}