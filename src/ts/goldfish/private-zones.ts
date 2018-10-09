import { Zone, ZoneType } from "./zones";
import { CardFinder as cf, Decklist, MVPCard } from "./index";
import * as _ from "lodash";

export class Graveyard extends Zone {
  public owner: string;
  public cards: MVPCard[];
  // possibly a private/protected array of props important to CDAs that watch the graveyard
  // such as { cardTypes: number } for Tarmogoyf or { hasDelirium: boolean } for Grim flayer, etc
  constructor() {
    super("graveyard");
    this.zt = ZoneType.hidden;
    this.cards = [];
  }
}

export class Exile extends Zone {
  // public owner?: string;
  public cards: MVPCard[]; // order not important; could be a single dictionary that contains cards from each player

  constructor() {
    super("exile");
    this.zt = ZoneType.hidden;
  }
}

export class Hand extends Zone {
  // public owner?: string; // do Hands need an owner? Probably not since they are a prop of a Player
  public cards: MVPCard[]; // order not important; could be a single dictionary that contains cards from each player

  public constructor() {
    super("hand");
    this.zt = ZoneType.hidden;
    this.cards = [];
  }
  // public discard(x: number) {
    
  // }
}

export class Library extends Zone {

  public static async create(list: Decklist): Promise<MVPCard[]> {
    const deck: MVPCard[] = [];
    for (const entry of list.maindeck) {
      for (let i: number = 0; i < entry.quantity; i++) {
        deck.push(await cf.byName(entry.cardName));
      }
    }
    return Promise.resolve(deck);
  }

  public cards: MVPCard[];

  public constructor() {
    super("library");
    this.zt = ZoneType.hidden;
    this.cards = [];
  }

  public async shuffle(): Promise<void> {
    for (let i: number = 0; i < (Math.floor(Math.random() * 12)); i++) {
      this.cards = _.shuffle(this.cards);
    }
  }

  public topCard(): MVPCard {
    return this.cards[0];
  }
}

// // not needed for MVP
// export class CommandZone extends Zone {
// 
// }

