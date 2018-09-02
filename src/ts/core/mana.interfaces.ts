import * as _ from "lodash";
// // import * as Promise from 
// import "es6-promise"; // deprecated
// ^^ fixed by upgrading VScode's node version 
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
}

// it just hit me that Mana itself needs to be a goddamn class

export class Mana implements IManaCost {
    
    /**
     *  Asynchronous constructor, if necessary
     */
    public static async asyncConstructor(): Promise<Mana> {
        const m: Mana = new Mana();
        return Promise.resolve(m);
    }

    /** This method takes a string of symbols an outputs a Mana object or array of Mana objects
     * @param {string} cost - a string containing all the symbols to be parsed
     */
    public static async parse(cost: string): Promise<Mana[]> {
        let parsingSymbol: boolean = false;
        let multipleCosts: boolean = false; // set to true if the "/" char appears in a symbol
        // ^^ because we'll end up with an array of potential costs rather than a single object
        let result: Mana = new Mana();
        let resultArray: Mana[] = []; // only needed for cards that have alternate costs
        let intermediate: string = cost.replace("}{", " "); // actually, just get rid of the brackets, too
        intermediate = intermediate.replace("{", "");
        intermediate = intermediate.replace("}", "");
        const intermediateArray: string[] = intermediate.split(" "); // split on spaces
        // const costWithSpaces = cost.replace("}{", "} {"); // add a space between each symbol
        // const intermediate = costWithSpaces.split(" ");

        /** At this point, we have turned this: "{2}{W}{U}{G}"
         *  into this: [ "2", "W", "U", "G" ]
         * And this: {1}{B/P}{B/P}
         * into this: [ "1", "B/P", "B/P" ]
         */
        // resultArray.push(await Mana.asyncConstructor())

        // IMPORTANT: I just discovered that you can't `await` inside a lodash _.each loop
        for (const value in intermediateArray) {
        // _.each(intermediateArray, (value: string, index: number) => {
            if (!isNaN(parseInt(value))) {
                // case: value is a number representing generic cost
                const i: number = parseInt(value);
                result.add({ genericCost: i});
                // result.cmc += i;
                // _.merge(result, { genericCost: i });
            } else if (value.length === 1 && SYMBOLS.indexOf(value) > -1) {
                // case: value is either W, U, B, R, G, or C
                const tmp: Mana = await Mana.evaluateSingleCharSymbol(value);
                // const tmpResolved: Mana = Promise.resolve(tmp);
                result.add(tmp);
            } else if (PHYREXIAN_SYMBOLS.indexOf(value) > -1) {
                // case: value is a phyrexian mana symbol (passed value will be in "W/P" etc format
            }
        }

    }

    public static async evaluatePhyrexianSymbol(value: string): Promise<Mana[]> {
        const result: Mana[] = [];
        if (PHYREXIAN_SYMBOLS.indexOf(value) < 0) {
            throw new Error("not a recognized Phyrexian symbol")
        } else {
            let manaCost: Mana = new Mana();
            let lifeCost: Mana = new Mana();
            switch (value) {
                case "W/P":
                    manaCost.add({ whiteCost: 1 });
                    lifeCost.add({ lifeCost: 2 });
                    break;
                case "U/P":
                    manaCost.add({ blueCost: 1 });
                    lifeCost.add({ lifeCost: 2 });
                    break;
                case "B/P":
                    manaCost.add({ blackCost: 1 });
                    lifeCost.add({ lifeCost: 2 });
                    break;
                case "R/P":
                    manaCost.add({ redCost: 1 });
                    lifeCost.add({ lifeCost: 2 });
                    break;
                case "G/P":
                    manaCost.add({ greenCost: 1 });
                    lifeCost.add({ lifeCost: 2 });
                    break;

                default:
                    console.error("did not recognize Phyrexian symbol");
            }
        }
    }

        /** Below this line is (non-working) code I wrote before realizing I should use a
         *  switch statement on each item while iterating through the array.
         * I shall leave it here for now to document my thought process (focusing on being able
         *  to parse alternate costs) and so I know what doesn't work.
         */
        // const arrayPiecewise: any[] = [];
        // _.each(intermediateArray, (symbol: string, outerIndex: number) => {
        //     // Currently working with: {3}{U}{W} => {3 U W} => _.each([3, U, W]...
        //     let currentValue: any = {};
            
        //     if (!isNaN(parseInt((symbol)))) { // case: symbol is a generic mana cost
        //         // generic mana cost
        //         _.assign(currentValue, {
        //             cmc: parseInt(symbol),
        //             genericCost: parseInt(symbol)
        //         })
        //     } else if (symbol.length === 1) { // symbol is in { "WUBRGC" }
                
        //     }

            // below this line is code I wrote before I figured out to do String.replace("}{", " ")
            // our array would look like: [ "{W}", "{W}", "{3}" ] or so
            // let currentValue: any = {};
            // _.each(symbol, (char: string, innerIndex: number) => {
            //     switch(char) {
            //         case "{":
            //             if (!parsingSymbol) {
            //                 parsingSymbol = true
            //             } else {
            //                 // throw
            //                 console.error("encountered an open bracket while already parsing a symbol")
            //             }
            //             break;
            //         case "}":
            //             if (parsingSymbol) {
            //                 parsingSymbol = false;
            //                 _.assign(result, currentValue);
            //                 currentValue = {};
            //             } else {
            //                 // throw
            //                 console.error("encountered an unexpected closed bracket");
            //             }
            //             break;
            //         case "/":
            //             // assume we are parsing the symbol
            //             multipleCosts = true;
            //             if (symbol.charAt(innerIndex + 1) === "P") {
            //                 // phyrexian mana cost
                            
            //             }
            //             // symbol.charAt(innerIndex + 1) === "P"
            //             //     ? 
            //         default:
            //             // case: symbol != ("{" or "}") so we assume it is a number or letter
            //             // "0123456789".indexOf()
            //     }
            // });
        // });
    // }

    /** This method takes a single character and outputs a Mana object
     * @param char - single character, assumed to be one of {"WUBRGC"}
     */
    public static async evaluateSingleCharSymbol(char: string): Promise<Mana> {
        // first, error check
        if (char.length !== 1) {
            throw new Error("only pass a single character into the single character evaluator function!");
        } else {
            const result: Mana = new Mana();
            switch (char) {
                case "W":
                // vv todo: need separate, independent method for summing cmc
                    // result.cmc++;
                    result.manaCost += "{W}";
                    result.whiteCost++;
                    break;
                case "U":
                    // result.cmc++;
                    result.manaCost += "{U}";
                    result.blueCost++;
                    break;
                case "B":
                    // result.cmc++;
                    result.manaCost += "{B}";
                    result.blackCost++;
                    break;
                case "R":
                    // result.cmc++;
                    result.manaCost += "{R}";
                    result.redCost++;
                    break;
                case "G":
                    // result.cmc++;
                    result.manaCost += "{G}";
                    result.greenCost++;
                    break;
                case "C":
                    // result.cmc++;
                    result.manaCost += "{C}";
                    result.colorlessCost++;
                    break;
                default:
                    let generic: number = undefined;
                    isNaN(parseInt(char, 10))
                        ? console.error("unrecognized symbol")
                        : result.genericCost += parseInt(char);
                    
            }
            return Promise.resolve(result);
        }
    }

    public static async processSymbol(symbol: string): Promise<IManaCost> {
        const result: IManaCost = {
            cmc: 0,
            manaCost: ""
        }
        /**
         * Cases to consider:
         * symbol.length === 3 => if (!isNaN(parseInt(charAt(1), 10))) then cmc+=charAt(1)
         * symbol.length === 3 => if isChar(charAt(1)), cmc++ and appropriate colorCost++ 
         * symbol.length === 4 => genericCost >= 10
         * symbol.length === 5 => either phyrexian or split mana cost.
         * Note that split mana costing double colorless always makes cmc += 2 (in all zones including stack)
         */
        let intermediate: string = symbol.replace("{", "");
        intermediate = intermediate.replace("}", "");
        if (intermediate.length === 1) { // simplest case: symbol is in "WUBRG1-9"
            switch (intermediate) {
                case "W":
                    result.cmc++;
                    _.assign(result, {whiteCost: 1});
                    break;
                case "U":
                    result.cmc++;
                    _.assign(result, {blueCost: 1});
                    break;
                case "B":
                    result.cmc++;
                    _.assign(result, {blackCost: 1});
                    break;
                case "R":
                    result.cmc++;
                    _.assign(result, {redCost: 1});
                    break;
                case "G":
                    result.cmc++;
                    _.assign(result, {greenCost: 1});
                    break;
                case "C":
                    result.cmc++;
                    _.assign(result, {colorlessCost: 1});
                default: // we can safely assume it is a number
                    isNaN(parseInt(intermediate, 10))
                        ? console.error("unrecognized symbol")
                        : _.assign(result, {
                            genericCost: parseInt(intermediate), cmc: parseInt(intermediate) });
            }
        }



        return result;
        // intermediate.length === 1
        //     ? ((isNaN(parseInt(intermediate, 10)))
        //         ? )
    }

    /** This method takes an object and outputs a string
     * @param {IManaCost | Mana} mc - object to covert into a string of symbols
     */
    public static async convertToSymbol(mc: IManaCost | Mana): Promise<string> {
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
        
        if (genc > 0) {  builder += "{" + genc + "}"; }

        builder += _.repeat("{W}", wc);
        builder += _.repeat("{U}", uc);
        builder += _.repeat("{B}", bc);
        builder += _.repeat("{R}", rc);
        builder += _.repeat("{G}", gc);
        builder += _.repeat("{C}", cc);
        
        // promises.resolve(builder);
        return Promise.resolve(builder);
    }

    /** This method takes an Interface and outputs a number representing CMC of that Mana object
     * @param {IManaCost} mc 
     */
    public static convert(mc: IManaCost): number {
        const tmp: Mana = new Mana();
        tmp.add(mc);
        return tmp.convert();
    }

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

    public constructor() {
        this.manaCost = "";
        this.cmc = 0;
        this.colorlessCost = 0; 
        this.genericCost = 0;
        this.whiteCost = 0;
        this.blueCost = 0;
        this.blackCost = 0;
        this.redCost = 0;
        this.greenCost = 0;
        this.lifeCost = 0;
    }

    /** todo: make add methods for strings
     * i.e. let foo: Mana = new Mana();
     * foo.add("{B}{B}{B}");
     * instead of
    */
    public add(mc: IManaCost): void {
        this.colorlessCost += mc.colorlessCost || 0; 
        this.genericCost += mc.genericCost || 0;
        this.whiteCost += mc.whiteCost || 0;
        this.blueCost += mc.blueCost || 0;
        this.blackCost += mc.blackCost || 0;
        this.redCost += mc.redCost || 0;
        this.greenCost += mc.greenCost || 0;
        this.lifeCost += mc.lifeCost || 0;
        this.cmc = this.convert();
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

    
}
