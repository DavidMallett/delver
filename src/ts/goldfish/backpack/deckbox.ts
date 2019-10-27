import { MVPPlayer } from "../index";

// deckbox.ts
export abstract class Creature {
  public id: string;
  public name: string;
  public power: number;
  public toughness: number;
  public manaCost: string;
  public cmc: number;
  public keywords: string[];
  public owner: string; // id should map to appropriate Player object
  public controller: string;
  public otherTypes?: string[]; // array of other types, if applicable (artifact, enchantment, etc)
  public types?: string[];
  public subtypes?: string[];

  constructor() {
    this.id
  }
}

export class GoblinGuide extends Creature {
  public constructor() {
    super();
    this.power = 2;
    this.toughness = 2;
    this.manaCost = "{R}";
    this.cmc = 1;
    this.keywords = ["Haste"];
    this.name = "Goblin Guide";
  }
  public onAttackTrigger(): void {
    
  }
}

export class MonasterySwiftspear extends Creature {
  public constructor() {
    super();
    this.power = 1;
    this.toughness = 2;
    this.manaCost = "{R}";
    this.cmc = 1;
    this.keywords = ["Haste", "Prowess"];
    this.name = "Monastery Swiftspear";
  }
}

export class EidolonGreatRevel extends Creature {
  public constructor() {
    super();
    this.power = 2;
    this.toughness = 2;
    this.manaCost = "{R}{R}";
    this.cmc = 2;
    this.keywords = [];
    this.otherTypes = ["Enchantment"];
    this.name = "Eidolon of the Great Revel";
  }
  public onCastCmc3orLessSpell(): void {

  }
}
