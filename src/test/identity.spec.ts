import * as util from "../ts/util/util.class";
import { expect } from "chai";

import * as _ from "lodash";

describe("a suite of tests to sanity-check ts-mocha and es5", () => {

    it("should be able to use Lodash after being compiled", () => {
        const num1: number = 8;
        const num2: number = 7;
        const result: number = _.add(num1, num2);
        expect(result).to.equal(15);
    });

    it("should be able to use a method from another class that uses Lodash after being compiled", () => {
        const testArray: number[] = [1, 0, 0, 2, 5, 0, 7, 0, 0, 13];
        const newArray: number[] = util.Util.compactArray(testArray);
        console.log(newArray.toString());
        expect(newArray).to.equal([1, 2, 5, 7, 13]);
    })

});
