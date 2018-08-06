import { Layer } from "../layers/layer.class";
import { Timestamp } from "../layers/interfaces";
import { Util } from "../util/util.class";
import * as _ from "lodash";

const MAX_LAYERS: number = 7;

export class Game {

    public id: string;
    public players: any[]; // todo: write "Player" class
    public layers: Layer[];
    // public battlefield: _.Dictionary<any>; // probably wrong type
    public currentTimestamp: Timestamp;

    public constructor() {
        this.id = Util.createUuid(32);
        this.players = [];
        this.layers = this.regenerateLayers();
        this.currentTimestamp = {
            stamp: 0,
            turn: 0
        }
    }

    // public async applyStaticEffects(): Promise<void> {
    //     _.each(this.layers, (theLayer: Layer, index: number) => {
            
    //     })
    // }

    public regenerateLayers(): Layer[] {
        const result: Layer[] = [];
        for(let i:number = 0; i<MAX_LAYERS; i++) {
            result.push(new Layer(i))
        }
        return result;
    }

    public startNewGame(): void {
        this.currentTimestamp.stamp++;
        this.currentTimestamp.turn++;
        this.layers = this.regenerateLayers();
    }
}
