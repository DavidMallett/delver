import { MVPCard } from "../index";
import { Card } from "mtgsdk-ts";
import { Type } from "../../objects/card-interface";

export class MagicCard extends MVPCard {
  
  // public static async construct(card: Card): Promise<MagicCard> {
  //   // let names: string[] = [];
  //   // (card.layout === "double-faced" || card.layout === "flip" || card.layout === "split")
  //   //   ? names = card.
  //   // ^^ finish ternary when we have time
  //   return Promise.resolve({
  //     name: card.name,
  //     types: card.types
  //   })
  // }

  public name: string;
  public names: string[]; // DFC, Aftermath, Split cards, etc
  public type: Type;
  public types: string[]; // array of enumerated types
  public cmc: number;
  public colors?: string[];
  public legalInModern: boolean;
  public text: string;

}
