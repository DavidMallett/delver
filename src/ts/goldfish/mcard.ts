import * as mtg from "mtgsdk-ts";

// todo: make new workspace that only relies on either mtg or sdk-ts, import and re-export
//  his typedefs in index.ts, and then we can populate our fields by grabbing the data from
//  mtgsdk.io and parsing it. Worry about json caching and opening an async/await PR post-mvp

interface MCard {
  power?: number;
  toughness?: number;

  doesDamage?: number; // for instants/sorceries

  type: string;
  id: string;
  name: string;
}

export class GoblinGuide implements MCard {
  public name: string;
  public type: string;
  public power: number;
  public toughness: number;
  public id: string;
  public constructor() {
    this.power = 2;
    this.toughness = 2;
    this.name = "GoblinGuide";
    this.type = "Creature";
  }
}
