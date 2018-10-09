// mana-parser.spec.ts

import { Mana } from "./mana.interfaces";

import { expect } from "chai";

const test0: string = "{1}{C}";
const test1: string = "{2}{W}{W}";
const test2: string = "{11}";
const test3: string = "{1}{B/P}{B/P}";
const test4: string = "{W}{U}{G}{R}";
const test5: string = "{W}{W}{U}{U}{G}{G}{R}{R}{B}{B}";
const test6: string = "{2}{U}{B/W}";
const test7: string = "{W/2}{W/2}{W/2}";

describe("a suite of unit tests to ensure the Mana.parse() function works", function() {

  it("should parse some regular costs (single)", async function() {
    console.log("parsing " + test0 + " ...:\n");
    const parsed: Mana = await Mana.parse(test0);
    console.log("parsed:\n" + JSON.stringify(parsed));
    expect(parsed.colorlessCost).to.equal(1);
    expect(parsed.genericCost).to.equal(1);
    expect(parsed.cmc).to.equal(2);
  });

  it("should parse some regular costs (double)", async function() {
    console.log("parsing " + test1 + " ...:\n");
    const parsed: Mana = await Mana.parse(test1);
    console.log("parsed:\n" + JSON.stringify(parsed));
    expect(parsed.whiteCost).to.equal(2);
    expect(parsed.genericCost).to.equal(2);
    expect(parsed.cmc).to.equal(4);
  });

  it("should parse some regular costs [[Darksteel Colossus]]", async function() {
    console.log("parsing " + test2 + " ...:\n");
    const parsed: Mana = await Mana.parse(test2);
    console.log("parsed:\n" + JSON.stringify(parsed));
    expect(parsed.genericCost).to.equal(11);
    expect(parsed.cmc).to.equal(11);
  });

  // it("should parse some regular costs [[Dismember]]", async function() {
  //   console.log("parsing " + test3 + " ...:\n");
  //   const parsed: Mana = await Mana.parse(test3);
  //   console.log("parsed:\n" + JSON.stringify(parsed));
  //   expect(parsed.alternateCosts.length).to.equal(2);
  //   expect(parsed.blackCost).to.equal(2);
  //   expect(parsed.cmc).to.equal(3);
  // });

  it("should parse some regular costs [[Kynaios and Tiru]]", async function() {
    console.log("parsing " + test4 + " ...:\n");
    const parsed: Mana = await Mana.parse(test4);
    console.log("parsed:\n" + JSON.stringify(parsed));
    expect(parsed.blueCost).to.equal(1);
    expect(parsed.whiteCost).to.equal(1);
    expect(parsed.redCost).to.equal(1);
    expect(parsed.greenCost).to.equal(1);
    expect(parsed.cmc).to.equal(4);
    expect(parsed.genericCost).to.equal(0);
  });

  it("should parse some regular costs [[Progenitus]]", async function() {
    console.log("parsing " + test5 + " ...:\n");
    const parsed: Mana = await Mana.parse(test5);
    console.log("parsed:\n" + JSON.stringify(parsed));
    expect(parsed.blueCost).to.equal(2);
    expect(parsed.whiteCost).to.equal(2);
    expect(parsed.redCost).to.equal(2);
    expect(parsed.greenCost).to.equal(2);
    expect(parsed.blackCost).to.equal(2);
    expect(parsed.cmc).to.equal(10);
    expect(parsed.genericCost).to.equal(0);
  });

  // it("should parse some split costs [[alara block uncommon]]", async function() {
  //   console.log("parsing " + test6 + " ...:\n");
  //   const parsed: Mana = await Mana.parse(test6);
  //   console.log("parsed:\n" + JSON.stringify(parsed));
  //   expect(parsed.blueCost).to.equal(1);
  //   expect(parsed.alternateCosts.length).to.equal(1);
  //   expect(parsed.cmc).to.equal(4);
  //   expect(parsed.genericCost).to.equal(2);
  // });

  // it("should parse some split costs with different CMC [[Spectral Procession]]", async function() {
  //   console.log("parsing " + test7 + " ...:\n");
  //   const parsed: Mana = await Mana.parse(test7);
  //   console.log("parsed:\n" + JSON.stringify(parsed));
  //   expect(parsed.whiteCost).to.equal(0);
  //   expect(parsed.alternateCosts.length).to.equal(3);
  //   expect(parsed.cmc).to.equal(6);
  //   expect(parsed.genericCost).to.equal(6);
  // });


});

