import { IManaCost, IMultiManaCost, Mana } from "./mana.interfaces";

// A class which can represent more than one way to pay a mana cost (split symbols)
export class MultiMana implements IMultiManaCost {



  public mainCost: Mana;
  public alternateCosts: Mana[];

  /**
   * @param {Mana} primary - this should always be the cost with the highest CMC or cost that represents CMC on the stack
   * @param {Mana[]} alternates - any number of additional costs
   */
  public constructor(primary: Mana, ...alternates: Mana[]) {
    this.mainCost = primary;
    this.alternateCosts = alternates || [];
  }

}
