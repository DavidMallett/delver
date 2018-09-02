/**
 * _Characteristic Defining Ability_: (CDA) is an ability that defines a characteristic
 *   of a card or token. There are 3 specific rules about CDAs:
 * 1. A CDA can only define a characteristic of the card or token it comes from
 * 2. A CDA cannot be triggered, activated, or conditional
 * 3. A CDA must define a characteristic (usually color, power/toughness, creature type, etc)
 * i.e. "Dryad Arbor is green"
 */
export class CharacteristicDefiningAbility {

    public valueBeingDefined: string; // name of the value being modified
    public objectBeingModified: any | any[]; // can be one object or many
    public effectType: string; // "Copy", "Control", "Text", "Type", "Color", "Abilities", "Power/Toughness"
    public effect?: any; // could also be json?

    public constructor(vbd: string, obm: any | any[], et: string) {
        this.valueBeingDefined = vbd;
        this.objectBeingModified = obm;
        this.effectType = et;
    }
}
