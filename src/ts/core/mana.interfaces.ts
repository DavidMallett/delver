import * as _ from "lodash";

export const SYMBOLS: string = "WURBGC";
export const PHYREXIAN_SYMBOLS: string[] = [ "W/P", "U/P", "B/P", "R/P", "G/P" ];

const W: string = "{W}";
const U: string = "{U}";
const B: string = "{B}";
const R: string = "{R}";
const G: string = "{G}";
const C: string = "{C}";
const phyrexian: string = "/P";
const phyrexianW: string = "{W/P}";
const phyrexianU: string = "{U/P}";
const phyrexianB: string = "{B/P}";
const phyrexianR: string = "{R/P}";
const phyrexianG: string = "{G/P}";

const example1: string = "{3}{W}{W}";
const example2: string = "{0}";
const example3: string = "{15}";
const example4: string = "{G/B}{R/G}";
const example5: string = "{1}{B/P}{B/P}";

export interface SplitCost {
    top: Mana; //  {W}/     {B}/
    bottom: Mana; // {2}      {P}
}

export interface IManaCost {
    manaCost?: string; // has to be optional thanks to Ancestral Vision :P
    cmc?: number;
    colorlessCost?: number;
    genericCost?: number;
    whiteCost?: number;
    blueCost?: number;
    blackCost?: number;
    redCost?: number;
    greenCost?: number;
    lifeCost?: number; // in case of phyrexian mana
    isAlternate?: boolean;
    alternateCosts?: IManaCost[] | Mana[];
}

export interface IMultiManaCost {
    mainCost: Mana;
    alternateCosts?: Mana[];
}

// todo: add snowCost to interface (then begin the tedious task of implementing Snow Mana)

export class Mana implements IManaCost {
    
    public static async arrayOfSymbols(input: string): Promise<string[]> {
        const replacer1: string = input.replace(/}{/g, " "); // actually, just get rid of the brackets, too        
        const replacer2: string = replacer1.replace(/{/g, "");
        const intermediate: string = replacer2.replace(/}/g, "");
        const intermediateArray: string[] = intermediate.split(" ");
        return Promise.resolve(intermediateArray);
    }

    /**
     *  Asynchronous constructor, if necessary
     */
    public static async asyncConstructor(): Promise<Mana> {
        const m: Mana = new Mana();
        return Promise.resolve(m);
    }

    /** This method takes a string of symbols and outputs a Mana object or array of Mana objects
     * @param {string} cost - a string containing all the symbols to be parsed
     */
    public static async parse(cost: string): Promise<Mana> {
        let multipleCosts: boolean = false; // set to true if the "/" char appears in a symbol
        // ^^ because we'll end up with an array of potential costs rather than a single object
        let result: Mana = new Mana();
        result.manaCost = cost; // should this be in constructor?
        let alternates: Mana[] = []; // only needed for cards that have alternate costs
        const intermediateArray: string[] = await Mana.arrayOfSymbols(cost);
        // debug vv
        console.log("[mana.parse] input of " + cost + " converted to array:\n" + JSON.stringify(intermediateArray));

        /** At this point, we have turned this: "{2}{W}{U}{G}"
         *  into this: [ "2", "W", "U", "G" ]
         * And this: {1}{B/P}{B/P}
         * into this: [ "1", "B/P", "B/P" ]
         * EDIT: but should also be able to handle input "{1} +4life" => [1, {lifeCost: 2}, {lifeCost: 2}];
         */

        // IMPORTANT: I just discovered that you can't `await` inside a lodash _.each loop
        // vv this should of a "for of", right? "for in" just iterates over the indices of the array
        for (const value of intermediateArray) {
            if (!isNaN(parseInt(value)) || value.length === 1) {
                // case: value is a number representing generic cost
                const i: number = parseInt(value);
                await result.add(await Mana.fromInterface({ genericCost: i }));
            } else if (_.includes(value, "life")) {
                // case: value is in form "+Xlife"
                const sub: string = value.substring(1, value.length - 4); // "+2life" => { lifeCost: 2 }
                const subInt: number = parseInt(sub);
                await result.add(await Mana.fromInterface({ lifeCost: subInt }));
            // } else if (value.length === 1 && SYMBOLS.indexOf(value) > -1) {
            //     // case: value is either W, U, B, R, G, or C
            //     const tmp: Mana = await Mana.evaluateSingleCharSymbol(value);
            //     await result.add(tmp);
            } else if (PHYREXIAN_SYMBOLS.indexOf(value) > -1) {
                // case: value is a phyrexian mana symbol (passed value will be in "W/P" etc format
                const tmp: IMultiManaCost = await Mana.evaluatePhyrexianSymbol(value);
                // ^^ "B/P" should return { mainCost: B, alternateCosts: [{2 life}] }

                // vv case: first instance of split mana symbol in string to parse
                if (!multipleCosts) {
                    alternates.push(await Mana.combine(result, tmp.alternateCosts[0]));
                    await result.add(tmp.mainCost);
                    multipleCosts = true;
                } else {
                    // case: multipleCosts === true, more than 1 split symbol in string
                    for (let i: number = 0; i < alternates.length; i++) {
                        await alternates[i].add(tmp.alternateCosts[0]);
                    }
                    alternates.push(await Mana.combine(result, tmp.alternateCosts[0]));
                    await result.add(tmp.mainCost);
                }
            // case: value is not a number, single symbol, or phyrexian symbol. Do we assume length > 1?
            } else if (value.length === 3 && value.charAt(1) === "/") {
                // case: value is a non-phyrexian split symbol (like U/B or W/2)
                const top: Mana = await Mana.evaluateSingleCharSymbol(value.charAt(0));
                const bottom: Mana = await Mana.evaluateSingleCharSymbol(value.charAt(2));
                // ^ bottom will have higher CMC since it === 2 sometimes while top is always in WURBG
                /**   Example case: {R/W}{R/W}{R/W} (Hearthfire Hobgoblin)
                 *  value === R/W
                 *  top === R, bottom === W
                 *  after first pass:
                 * result.toString() === "W", alternates = ["R"]
                 *  after second pass:
                 * alternates[0].add(R) = RR
                 * alternates.push(await Mana.combine(W, R)) => alternates === ["RR", "WR"]
                 * result === "WW"
                 * third pass: (top === R and bottom === W still)
                 * alternates[0].add(R) = RRR
                 * alternates[1].add(R) = WRR
                 * Mana.combine(WW, R) == WWR => alternates = ["RRR", "WRR", "WWR"]
                 * && result = "WWW"
                 *  sweet!
                 * /** Case: "{W/2}{W/2}{W/2}"
                 * => ["W/2", "W/2", "W/2"]
                 * => top = W, bottom = 2 => result.add({2}), alts.push(combine(result, {W}))
                 * ===> multipleCosts === true; alts[0].add(W); alts.push(combine(result, {W})); result.add(2)
                 * ====> result = {4}; alts = [WW, W2]; top = W; bottom = 2;
                 * ====> alts[0].add(W); alts[1].add(W); alts.push(combine(result, W)); result.add(2)
                 *  hooray!
                 */
                if (!multipleCosts) {
                    alternates.push(await Mana.combine(result, top));
                    await result.add(bottom);
                    multipleCosts = true;
                } else {
                    for (let i: number = 0; i < alternates.length; i++) {
                        await alternates[i].add(top);
                    }
                    alternates.push(await Mana.combine(result, top));
                    await result.add(bottom);
                }
            } else {
                throw new Error("Somehow, you managed to pass an unparseable value. Please pass something like this: {2}{W}");
            } // outside of else (switch)
        } // outside of `for const value in intermediateArray`
        /** Almost done! Now we have these variables: 
         * result: a Mana object representing the printed mana cost of the string
         * (optional) alternates: an array of Mana objects representing other configurations of Mana that satisfy the cost
         * (optional) multipleCosts: if true, 
         */
        if (alternates.length === 0) {
            // case: only one way to pay the cost
            await result.updateProps();
            return Promise.resolve(result);
        } else {
            result.addAlternates(alternates);
            await result.updateProps();
            return Promise.resolve(result);
        }
    } // outside of Mana.parse

    public static async evaluatePhyrexianSymbol(value: string): Promise<IMultiManaCost> {
        if (PHYREXIAN_SYMBOLS.indexOf(value) < 0) {
            throw new Error("not a recognized Phyrexian symbol")
        } else {
            let manaCost: Mana = new Mana();
            let lifeCost: Mana = new Mana();
            lifeCost.isAlternate = true;
            switch (value) {
                case "W/P":
                    await manaCost.add(await Mana.fromInterface({ whiteCost: 1 }));
                    await lifeCost.add(await Mana.fromInterface({ lifeCost: 2 }));
                    break;
                case "U/P":
                    await manaCost.add(await Mana.fromInterface({ blueCost: 1 }));
                    await lifeCost.add(await Mana.fromInterface({ lifeCost: 2 }));
                    break;
                case "B/P":
                    await manaCost.add(await Mana.fromInterface({ blackCost: 1 }));
                    await lifeCost.add(await Mana.fromInterface({ lifeCost: 2 }));
                    break;
                case "R/P":
                    await manaCost.add(await Mana.fromInterface({ redCost: 1 }));
                    await lifeCost.add(await Mana.fromInterface({ lifeCost: 2 }));
                    break;
                case "G/P":
                    await manaCost.add(await Mana.fromInterface({ greenCost: 1 }));
                    await lifeCost.add(await Mana.fromInterface({ lifeCost: 2 }));
                    break;
                default:
                    console.log("did not recognize Phyrexian symbol. Returning...");
                    return Promise.resolve({ mainCost: new Mana(), alternateCosts: [] });
            }
            await manaCost.updateProps();
            await lifeCost.updateProps();
            const result: IMultiManaCost = { mainCost: manaCost, alternateCosts: [lifeCost] };
            return Promise.resolve(result);
        }
    }

    /** This method takes a single character and outputs a Mana object
     * @param char - single character, assumed to be one of {"WUBRGC"}
     */
    public static async evaluateSingleCharSymbol(char: string): Promise<Mana> {
        // first, error check
        if (!isNaN(parseInt(char)) && SYMBOLS.indexOf(char) < 0) {
            throw new Error("Input is not a recognized mana symbol. Acceptable values: WURBGC. Input: " + char);
        } else {
            const result: Mana = new Mana();
            if (!isNaN(parseInt(char))) {
                await result.add(await Mana.fromInterface({ genericCost: parseInt(char) }));
            }
            switch (char) {
                case "W":
                    await result.addWhite();
                    // await result.add(await Mana.fromInterface({ whiteCost: 1 }));
                    break;
                case "U":
                    // await result.add(await Mana.fromInterface({ blueCost: 1 }));
                    await result.addBlue();
                    break;
                case "B":
                    // await result.add(await Mana.fromInterface({ blackCost: 1 }));
                    await result.addBlack();
                    break;
                case "R":
                    // await result.add(await Mana.fromInterface({ redCost: 1 }));
                    await result.addRed();
                    break;
                case "G":
                    // await result.add(await Mana.fromInterface({ greenCost: 1 }));
                    await result.addGreen();
                    break;
                case "C":
                    // await result.add(await Mana.fromInterface({ colorlessCost: 1 }));
                    await result.addColorless();
                    break;
                default:
                    throw new Error("[mana.processSingleChar] unhandled case: " + char);
            }
            await result.updateProps();
            return Promise.resolve(result);
        }
    }
    
    /**
     * A function to combine any number of Mana objects
     * @param {Mana | Mana[]} mana - any number of Mana objects to combine
     */
    public static async combine(...mana: Mana[]): Promise<Mana> {
        const result = new Mana();
        for (const piece of mana) {
            await result.add(piece);
        }
        return Promise.resolve(result);
    }

    public static async difference(mana1: Mana, mana2: Mana): Promise<Mana> {
        const result = new Mana();
        for (const prop in result) {
            if (typeof result[prop] === "number" && prop !== "cmc") {
                result[prop] = (mana2[prop] - mana1[prop]);
                if (result[prop] < 0) { result[prop] = 0; }
            }
        }
        await result.updateProps();
        return Promise.resolve(result);
    }

    //
    /** attempt #2. Should return Mana with the lower CMC cost in the alternateCosts array
     * @param mana1 - object representing top half of the split cost
     * @param mana2 - object representing bottom half of the split cost
     * Assumptions:
     * 1. if one of the values is phyrexian (lifeCost > 0), it is assumed that value shall be passed second (todo: add validation)
     * 2. if the values have different CMC (perhaps because it's a split like {2}/{W}), then the first param should have the higher CMC
     * ex case: [[Dismember]] input: mana1 = "{1}{B}{B}"; mana2 = "1 + 4life"
     * ex case: [[Spectral Procession]] input: mana1 = "{6}"; mana2 = "{W}{W}{W}"
     */
    // public static async topBottom(mana1: Mana, mana2: Mana): Promise<Mana> {
    //     // todo: validation
    //     if (mana2.lifeCost > 0) {
    //         // case: phyrexian cost
            
    //     }
    // }

    public static async splitDifference(mana1: Mana, mana2: Mana): Promise<SplitCost> {
        // let top: string = "";
        // let bottom: string = "";
        // const difference: Mana = new Mana();
        const top: Mana = new Mana();
        const bottom: Mana = new Mana();

        for (const prop in top) {
            if (typeof mana1[prop] === "number" && prop !== "cmc") {
                if (mana1[prop] - mana2[prop] > 0) {
                    // top[prop] += mana1[prop];
                    await top.add(await Mana.fromInterface({ [prop]: mana1[prop] }));

                    // difference.add({ [prop]: Math.abs(mana1[prop] - mana2[prop]) });
                } else if (mana2[prop] - mana1[prop] > 0) {
                    // bottom[prop] += mana2[prop];
                    await bottom.add(await Mana.fromInterface({ [prop]: mana2[prop] }));
                }
                else if (mana1[prop] !== 0 && mana1[prop] - mana2[prop] === 0) {
                    await top.add(await Mana.fromInterface({ [prop]: mana1[prop] }));
                    await bottom.add(await Mana.fromInterface({ [prop]: mana2[prop] }));                    
                }
            }
        }
        return Promise.resolve({ top, bottom });
    }

    public static async fromInterface(input: IManaCost): Promise<Mana> {
        const result: Mana = new Mana();
        for (const key in input) {
            result[key] = input[key];
        }
        await result.updateProps();
        return Promise.resolve(result);
    }

    /** This method takes an object and outputs a string
     * @param {IManaCost | Mana} mc - object to covert into a string of symbols
     */
    public static async convertToSymbol(mc: IManaCost | Mana): Promise<string> {

        if (mc.lifeCost === 2 && mc.cmc === 1) { // case: input is `lifeCost` output from evalPhyrexSymbol
            return Promise.resolve("+2life");
        } else if (!mc.alternateCosts || mc.alternateCosts.length === 0) {
            let builder: string = "";
            /** 
             * MC converts to string via the following actions in order:
             * 1. Add generic cost
             * 2. Add colored costs (treating 'C' as a color)
             * 3. Add special costs (phyrexian, dual mana, etc)
             */
            const genc: number = mc.genericCost || 0;
            const wc: number = mc.whiteCost || 0;
            const uc: number = mc.blueCost || 0;
            const bc: number = mc.blackCost || 0;
            const rc: number = mc.redCost || 0;
            const gc: number = mc.greenCost || 0;
            const cc: number = mc.colorlessCost || 0;
            const lc: number = mc.lifeCost || 0;

            if (genc > 0) {  builder += "{" + genc.toString() + "}"; }

            
            if (wc > 0) { builder += _.repeat("{W}", wc); }
            if (uc > 0) { builder += _.repeat("{U}", uc); }
            if (bc > 0) { builder += _.repeat("{B}", bc); }
            if (rc > 0) { builder += _.repeat("{R}", rc); }
            if (gc > 0) { builder += _.repeat("{G}", gc); }
            if (cc > 0) { builder += _.repeat("{C}", cc); }

            if (lc > 0) { builder += " +" + lc.toString() + "life"; }

            if (builder === "") {
                return Promise.resolve("{0}"); // manaCost of spells like Ancestral Vision shall be null
            } else {
                return Promise.resolve(builder);
            }
        } else if (mc instanceof Mana) {
            return await Mana.splitCostToSymbol(mc);
        } else { // case: instanceof mc === IManaCost
            return await Mana.splitCostToSymbol(await Mana.fromInterface(mc))
        }
    }

    /**
     * input: { main: "WW", alts: ["WR", "RR"] }
     * @param {Mana} mc - MUST have alternateCosts.length > 0!
     */
    public static async splitCostToSymbol(mc: Mana): Promise<string> {
        // todo: validate input actually is a split cost
        if (!(mc) || !(mc.alternateCosts)) {
            throw new Error("input is null or has no alternates array");
        } else {
            if (mc.alternateCosts.length === 0) {
                throw new Error(mc.manaCost + " is not a split cost");
            } else {
                const input: Mana = _.clone<Mana>(mc);
                input.alternateCosts = [];
                
                const top: string[] = await Mana.arrayOfSymbols(await Mana.convertToSymbol(input));
                // const bottom: string[] = await Mana.arrayOfSymbols(await Mana.convertToSymbol(mc.alternateCosts[0]));
                let result: string;
                for (let i: number = 0; i < mc.alternateCosts.length; i++) {
                    let bottom: Mana = await Mana.difference(input, mc.alternateCosts[i]);
                    result += "{" + top[i] + "/" + await Mana.convertToSymbol(bottom) + "}";
                }
                
                // debug
                console.log("converted object:\n" + JSON.stringify(mc) + "\nto string: " + result);
                return Promise.resolve(result);
            }
        }
    }

    /** This method takes an Interface and outputs a number representing CMC of that Mana object
     * @param {IManaCost} mc 
     */
    // public static async convert(mc: IManaCost): Promise<number> {
    //     const tmp: Mana = new Mana();
    //     await tmp.add(mc);
    //     return tmp.convert();
    // }

    public manaCost?: string;
    public cmc?: number;
    public colorlessCost?: number;
    public genericCost?: number;
    public whiteCost?: number;
    public blueCost?: number;
    public blackCost?: number;
    public redCost?: number;
    public greenCost?: number;
    public lifeCost?: number;

    public alternateCosts?: Mana[];
    public isAlternate?: boolean; // indicates whether the the is an alternate cost of another cost

    public constructor() {
        this.manaCost = "{0}";
        this.cmc = 0;
        this.colorlessCost = 0; 
        this.genericCost = 0;
        this.whiteCost = 0;
        this.blueCost = 0;
        this.blackCost = 0;
        this.redCost = 0;
        this.greenCost = 0;
        this.lifeCost = 0;
        this.isAlternate = false;
        this.alternateCosts = [];
    }

    /** todo: make add methods for strings
     * i.e. let foo: Mana = new Mana();
     * foo.add("{B}{B}{B}");
     * instead of foo.add(await Mana.parse("{B}{B}{B}"))' or foo.add({ blackCost: 3 });
    */
    public async add(mc: IManaCost | Mana): Promise<void> {
        // console.log("[mana.add] adding " + await Mana.convertToSymbol(mc) + " to " + this.manaCost);
        console.log("[mana.add] adding " + await Mana.convertToSymbol(mc));

        if (mc.colorlessCost) { this.colorlessCost += mc.colorlessCost; }

        // this.colorlessCost += mc.colorlessCost || 0; 
        if (mc.genericCost) { this.genericCost += mc.genericCost; }
        if (mc.whiteCost) { this.whiteCost += mc.whiteCost; }
        if (mc.blueCost) { this.blueCost += mc.blueCost; }
        if (mc.blackCost) { this.blackCost += mc.blackCost; }
        if (mc.redCost) { this.redCost += mc.redCost; }
        if (mc.greenCost) { this.greenCost += mc.greenCost; }
        if (mc.lifeCost) { this.lifeCost += mc.lifeCost; }
        await this.updateProps();
    }

    public async subtract(mc: IManaCost | Mana): Promise<void> {
        console.log("[mana.subtract] subtracting " + await Mana.convertToSymbol(mc) + " from " + this.manaCost);
        this.colorlessCost -= mc.colorlessCost || 0; 
        this.genericCost -= mc.genericCost || 0;
        this.whiteCost -= mc.whiteCost || 0;
        this.blueCost -= mc.blueCost || 0;
        this.blackCost -= mc.blackCost || 0;
        this.redCost -= mc.redCost || 0;
        this.greenCost -= mc.greenCost || 0;
        this.lifeCost -= mc.lifeCost || 0;
        // can't have a negative Mana value
        _.each(this, (value, propName) => {
            if (typeof value === "number" && value < 0) {
                this[propName] = 0;
            }
        });
        await this.updateProps();
    }

    // // Does not mutate this - returns new Object!
    // public async divideBy(mc: Mana): Promise<Mana> {

    // }

    public async updateProps(): Promise<void> {
        this.cmc = this.convert();
        this.manaCost = await Mana.convertToSymbol(this);
    }

    public async addWhite(n: number = 1): Promise<void> {
        this.whiteCost += n;
        await this.updateProps();
    }
    public async addBlue(n: number = 1): Promise<void> {
        this.blueCost += n;
        await this.updateProps();
    }
    public async addBlack(n: number = 1): Promise<void> {
        this.blackCost += n;
        await this.updateProps();
    }
    public async addRed(n: number = 1): Promise<void> {
        this.redCost += n;
        await this.updateProps();
    }
    public async addGreen(n: number = 1): Promise<void> {
        this.greenCost += n;
        await this.updateProps();
    }
    public async addColorless(n: number = 1): Promise<void> {
        this.colorlessCost += n;
        await this.updateProps();
    }

    public addAlternates(alts: Mana[]): void {
        // alternates of a cost should not have alternates themselves
        if (this.isAlternate) {
            throw new Error("Alternates themselves cannot have alternate costs, lest we run into circular refs");
        } else {
            for (const cost of alts) {
                cost.alternateCosts = null;
                cost.isAlternate = true;
                this.alternateCosts.push(cost);
            }
        }
    }

    // method to calculate the CMC
    public convert(): number {
        return _.sum([
            this.colorlessCost,
            this.genericCost,
            this.whiteCost,
            this.blueCost,
            this.blackCost,
            this.redCost,
            this.greenCost,
            (this.lifeCost / 2)
        ]);
    }

    // public isPhyrexian(): boolean {
        
    // }

    // returns cmc on the stack/in other zones if this has alternateCosts
    // public convertAll(): number {

    // }
    
}
