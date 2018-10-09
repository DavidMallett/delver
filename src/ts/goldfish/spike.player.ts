import { MtgObject, MVPPlayer } from "./index";
import { Exile, Graveyard, Hand, Library } from "./private-zones";



export class Spike extends MVPPlayer {
  public name: string;
  public controls: MtgObject[]; // will eventually be "Permanent[]" or contain an array of UUIDs
  public owns: MtgObject[];
  public yard: Graveyard;
  public exile: Exile; // cards player owns in exile
  public library: Library;
  public hand: Hand;

  public constructor(n: string) {
    super();
    this.life = 20;
    this.name = n;
    this.controls = [];
    this.owns = [];
  }

  public draw(n: number): void {
    for (let i: number = 0; i < n; i++) {
      this.hand.cards.push(this.library.cards.pop());
    }
  }

  public mill(n: number): void {
    for (let i: number = 0; i < n; i++) {
      this.yard.cards.push(this.library.cards.pop());
    }
  }

  public async shuffle(): Promise<void> {
    const times: number = Math.floor(Math.random() * 12);
    for (let i: number = 0; i < times; i++) {
      this.library.shuffle();
    }
  }

}
