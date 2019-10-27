// An application to take a 60-card Modern Burn maindeck and calculate
// its goldfish percentages compared to variants of itself
import * as mtg from "mtgsdk-ts";

import { Exile, Graveyard, Hand } from "./private-zones";
import { Type } from "../objects/card-interface";

// an abstract class describing the properties and methods of a Card object in MVP
export abstract class MVPCard {
  public id?: string;
  public name: string;
  public names?: string[]; // DFC, Aftermath, Split cards, etc
  public type: Type;
  public types: string[]; // array of enumerated types
  public cmc: number;
  public colors?: string[];
  public legalInModern?: boolean;
  public text: string;
}

export abstract class MVPPlayer {
  public name: string;
  public deck: Deck;
  public opponentName?: string; // string to prevent circular references
  public life: number;

  // possibly move these to whatever class implements this one:
}

export abstract class MVPGame {
  public player1: MVPPlayer;
  public player2: MVPPlayer; // after MVP, will be Player[] array
  public battlefield: MtgObject; // soon will be a (public) zone
  public exile: Exile; // yeah should probably just use this static instance of exile
}

export class CardFinder {
  public static async byName(name: string): Promise<MVPCard> {
    let results: MVPCard[] = [];
    const searchResult: mtg.MagicEmitter<mtg.Card> = mtg.Cards.all({ name });
    searchResult.on("data", (card: mtg.Card) => {
      const result: MVPCard = {
        cmc: card.cmc,
        name: card.name,
        types: card.types,
        type: {
          subtypes: card.subtypes,
          supertypes: card.supertypes,
          types: card.types,
          typeLine: card.supertypes.join(" ") + card.types.join(" ") + " - " + card.subtypes.join(" ")
        }, 
        colors: card.colors,
        text: card.originalText
      };
      results.push(result);
    });
    if (results.length === 1) {
      return Promise.resolve(results[0]);
    } else {
      throw new Error("found multiple cards ")
    }
  }
}

export interface ZoneTree {
  yards: Graveyard[];
  exile: Exile;
  hands: Hand[];
}

export interface DecklistEntry {
  cardName: string;
  quantity: number;
}

export class Decklist {
  public maindeck: DecklistEntry[];
  public sideboard?: DecklistEntry[]; // not used for MVP, probably
}

export class Deck {
  public cards: MVPCard[];
}

/** A class which shall define common methods/properties that all in-game objects have
 * In general, most if not all of these actions should be able to be performed on everything
 */
export abstract class MtgObject {

  public exile(): void {

  }

  // returns own type
  public copy(): any {

  }

  public etb?(): void {

  }

  public sacrifice(): void {

  }

  public destroy(): void {

  }

}
