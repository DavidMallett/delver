import { MVPPlayer } from "../index";

// deckbox.ts
export abstract class Creature {
  public power: number;
  public toughness: number;
  public manaCost: string;
  public cmc: number;
  public keywords: string[];
  public owner: string; // id should map to appropriate Player object
  public controller: string;
}

export class GoblinGuide extends Creature {
  public constructor() {
    super();
    this.power = 2;
    this.toughness = 2;
    this.manaCost = "{R}";
    this.cmc = 1;
    this.keywords = ["Haste"];
  }
  public onAttackTrigger(): void {
    
  }
}
