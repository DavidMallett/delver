import { MagicCard } from "../goldfish/backpack/magic-card.class";
import { expect } from "chai";
import * as mtg from "mtgsdk-ts";

describe("testing magic-card.class", function() {

  it("should construct a card", async function() {
    const card: MagicCard = new MagicCard("Thalia, Guardian of Thraben");
  });

});

