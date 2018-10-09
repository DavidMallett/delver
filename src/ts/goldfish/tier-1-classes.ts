import * as mtg from "mtgsdk-ts";
import * as _ from "lodash";

import { MVPCard } from "./index";
import { CharacteristicDefiningAbility } from "../layers/cda.class";

const SUPERTYPES: string[] = ["Legendary", "World", "Basic", "Snow"]
const TYPES: string[] = ["Creature", "Artifact", "Enchantment", "Land", "Instant", "Sorcery", "Planeswalker", "Tribal"];
const ATTRIBUTES: string[] = ["permanent", "token", "emblem", ]

export class CreatureCard extends MVPCard {
  
  public power: number;
  public toughness: number;
  public cdas?: CharacteristicDefiningAbility[];
  public manaCost: string;

  public constructor(name?: string, card?: mtg.Card) {
    super();
    if ((!name) && (!card)) { throw new Error("CreatureCard constructor needs input!"); }
    if (card) {
      this.name = card.name;
      this.type.typeLine = card.type;
      const tmp: string[] = card.type.split(" ");
      _.each(tmp, (val, index) => {

      })
    }
  }

}
