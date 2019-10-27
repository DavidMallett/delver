import { Card, Cards } from "mtgsdk-ts";
import { expect } from "chai";

it("should get all the data needed for a card", async function() {
  const result: Card[] = await Cards.where({ name: "Thalia, Guardian of Thraben" });
  for (const prop in result[0]) {
    console.log(prop + ": " + result[0][prop]);
  }
});

