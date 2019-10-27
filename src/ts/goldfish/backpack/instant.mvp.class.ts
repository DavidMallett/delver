import { MVPCard, MVPPlayer} from "../index";

// export abstract class Instant {
//   public name: string;
//   public owner?: string;
//   public controller?: string;
//   public types?: string;
//   public id?: string;
// }

export abstract class Spell {
  name: string;
  owner?: string; // on the stack
  controller?: string;
  types: string[];
  id?: string;
  damage?: number;
  manaCost?: string;
  cmc: number;
}

export class LightningBolt extends Spell {
  public constructor() {
    super();
    this.name = "Lightning Bolt";
    this.types = ["Instant"];
    this.damage = 3;
    this.manaCost = "{R}";
    this.cmc = 1;
  }
}

export class LavaSpike extends Spell {
  public constructor() {
    super();
    this.name = "Lava Spike";
    this.types = ["Sorcery"];
    this.damage = 3;
    this.manaCost = "{R}";
    this.cmc = 1;
  }
}

export class RiftBolt extends Spell {
  public constructor() {
    super();
    this.name = "Rift Bolt";
    this.types = ["Sorcery"];
    this.damage = 3;
    this.manaCost = "{2}{R}";
    this.cmc = 3;
  }
  public suspend(): void {
    
  }
}


/** can be copy and pasted
 * 
 */
// public constructor() {
// super();
// this.name = "";
// this.types = [];
// this.damage = 3;
    // this.manaCost = "{R}";
    // this.cmc = 1;
// }


