import { Game } from "../ts/core/game.class";
import { expect } from "chai";

describe("basic suite of unit tests for the app", () => {

    it("should create a new game with 7 layers", () => {
        const game: Game = new Game();
        game.startNewGame();
        expect(game.id).to.exist; // don't actually think this exists in chai; use "to.exist"
        expect(game.currentTimestamp.stamp).to.equal(1);
        expect(game.currentTimestamp.turn).to.equal(1);
    });
    
});
