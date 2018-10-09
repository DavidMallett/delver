import { Deck, Decklist, DecklistEntry, MVPCard } from "../index";
import * as mtg from "mtgsdk-ts";

/** Friendly paste of the mtg.CardFilter interface:
 * export interface CardFilter {
    name?: string;
    layout?: string;
    cmc?: number;
    colors?: string;
    colorIdentity?: string;
    type?: string;
    supertypes?: string;
    types?: string;
    subtypes?: string;
    rarity?: string;
    set?: string;
    setName?: string;
    text?: string;
    flavor?: string;
    artist?: string;
    number?: string;
    power?: string;
    toughness?: string;
    loyalty?: number;
    foreignName?: string;
    language?: string;
    gameFormat?: string;
    legality?: keyof typeof Legality;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    random?: boolean;
    contains?: string;
}
 */

export class Library extends Deck {

  // public static async readDecklist(list: Decklist): Promise<Library> {
  //   const lib: Library = new Library();
  //   for (const entry of list.maindeck) {
  //     let card = mtg.Cards.all({ name: entry.cardName });
  //   }
  // }

  public cards: MVPCard[];
  
  public constructor(list?: Decklist) {
    super();
  }
}
