import { Deck, MVPCard, MVPPlayer } from "../index";

export class BurnAgent extends MVPPlayer {



  public name: string;
  public deck: Deck;
  public life: number;

  public constructor(name: string) {
    super();
    this.name = name;
    this.life = 20;
  }

  public async lavaSpike(target: MVPPlayer): Promise<void> {
    target.life -= 3;
  }

}
