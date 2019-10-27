import { MVPCard } from "../index";
import { Card, Cards } from "mtgsdk-ts";
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
  public type: string;
  public types: string[]; // array of enumerated types
  public cmc: number;
  public colors?: number[];
  public legalInModern: boolean;
  public text: string;
  public manaCost?: string;


  public constructor(name: string) {
    super();
    Cards.all({
      name
    }).on("data", (theCard) => {
      for (const key in theCard) {
        if (Object.keys(MagicCard.prototype).indexOf(key) >= 0) {
          try {
            this[key] = theCard[key];
          } catch (e) {
            console.log("Almost crashed!\n" + e);
          }
        }
      }
    })
  }

}
