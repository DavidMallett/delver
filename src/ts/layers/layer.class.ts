import { CharacteristicDefiningAbility } from "./cda.class";

import * as _ from "lodash";

const layerNames: string[] = ["Copy", "Control", "Text", "Type", "Color", "Abilities", "Power/Toughness"];
const zero: number = 0;
const seven: number = 7;

export class Layer {

    public layerLevel: number; // 1-7
    public sublayerLevel?: string; // "7a"-"7e"
    public cdaList: CharacteristicDefiningAbility[]; // fills up in timestamp order
    public effectList: any[];
    public effectType: string // "Copy", "Control", "Text", "Type", "Color", "Abilities", "Power/Toughness"

    public constructor(level: number, subLevel?: string) {
        (zero <= level && seven > level)
            ? this.effectType = layerNames[level]
            : new Error("0-indexed layerLevel must be >=0 and <7");

        this.layerLevel = level;
        this.sublayerLevel = subLevel || null;
        this.cdaList = [];
        this.effectList = [];
    }

    public toString(): string {
        let result: string = "LAYER: " + this.layerLevel.toString();
        result += "\n" + this.effectType;
        result += "\nCDAs:" + this.cdaList.join("\n");
        result += "\nOther effects:" + this.effectList.join("\n");
        return result += "\n---------";
    }

}
