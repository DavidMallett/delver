import * as moment from "moment";
// todo: learn about default imports

export interface MtgEffect {
    keyToModify?: string;
    valueToModify?: string;
}

// An interface used for logging
export interface Timestamp {
    time?: moment.Moment;
    stamp: number; // incremented each time priority passes
    turn: number; // incremented each turn
}
