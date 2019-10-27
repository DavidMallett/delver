
import { Deck, Decklist, DecklistEntry, MVPCard, MVPPlayer } from "../index";
import { Exile, Graveyard, Hand, Library } from "../private-zones";

import * as _ from "lodash";

export class Agent extends MVPPlayer {
  
  public name: string;
  public controls: string[]; // MtgObject[]; // will eventually be "Permanent[]" or contain an array of UUIDs
  public owns: string[]; // MtgObject[];
  public yard: Graveyard;
  public cardsInExile: Exile; // cards player owns in exile
  public library: Library;
  public hand: Hand;

  public constructor(n: string) {
    super();
    this.life = 20;
    this.name = n;
    this.controls = [];
    this.owns = [];
  }

  public draw(n: number = 1): void {
    for (let i: number = 0; i < n; i++) {
      this.hand.cards.push(this.library.cards.pop());
    }
  }

  public mill(n: number): void {
    for (let i: number = 0; i < n; i++) {
      this.yard.cards.push(this.library.cards.pop());
    }
  }

  public discard(id: string): void {
    this.yard.cards.push(_.remove(this.hand.cards, (card, index) => {
      return card.id === id;
    })[0]);
  }

  public exile(objIdentifier: any): void {

  }

  public async shuffle(): Promise<void> {
    const times: number = Math.floor(Math.random() * 12);
    for (let i: number = 0; i < times; i++) {
      this.library.shuffle();
    }
  }
  
}


