// import * as Magic from "mtgsdk-ts";
// Color = Magic.

import { BlockLegality, Card, Color, ColorIdentity, Layout, Legality,
    Rarity } from "../../../node_modules/mtgsdk-ts/out/IMagic";

export interface ICard {
    artist: string;
    cmc: number;
    colorIdentity: (keyof typeof ColorIdentity)[];
    colors: (keyof typeof Color)[];
    flavor?: string; // flavor text
    foreignNames: ForeignName[];
    id: string; // SHA1 hash of setCode + cardName + cardImageName
    imageUrl?: string; // only exists if the card has a multiverseId
    layout: keyof typeof Layout;
    legalities: BlockLegality[];
    manaCost?: string; // there are a few spells that cannot be cast; lands do not have mana cost either
    multiverseid?: number;
    name: string;
    names?: string[]; // for DFCs/Flip Cards/etc
    number: string; // set number; can have a letter in it in case of DFCs
    originalText: string; // text before errata
    originalType: string; // type before type was an enum
    printings: string[]; // array of set codes
    rarity: keyof typeof Rarity;
    rulings: Ruling[];
    set: string; // 3 digit set code; could be enum as well
    setName: string;
    subtypes: string[]; // array of enumerated subtypes
    supertypes: string[]; // "Legendary", "Basic", "World", etc - make this an enum
    text: string; // Oracle rules text
    typeLine: string; // the type line on the card i.e. "Legendary Creature - Angel"
    // in mtgsdk, Card.type is a string of the typeline. To allow for easier iterating,
    // we create the Type interface and replace the original key with "typeLine"
    type: Type;
    types: string[]; // array of enumerated types
    variations: number[]; // array of multiverseIds for alternate art printings, not including the current one
}

export interface Ruling {
// judge tournament rulings in gatherer
    date: string;
    text: string;
}

export interface ForeignName {
    name: string; // will contain non-UTF-8 characters
    language: string; // maybe enum? if so, include Phyrexian lol
    multiverseId: number;
}

export interface Type {
    supertypes?: string[];
    types?: string[];
    subtypes?: string[];
}
