/** Scope of initial POC: We wish to take several variants of a Modern Burn deck
  and "goldfish" them: shuffle, draw opening hand, and attempt to kill opponent,
  specifically paying attention to the % hands that are keepable, the % games won
  by or before turns 4 or 5, % chance of seeing a sideboard card in games 2 and 3
  , etc. We will use Burn for our first demo because that deck's high redundancy
  makes application of the app especially practical.
  
  There are a few ways to achieve this.
  1. give each card a "weight" so the agent can determine how to sequence their 
plays (in this case, we don't need to worry about implementation; we can simply
draw 7, keep, then just aggregate actions taken for turn 1, turn 2, etc) keeping
track of what our ideal plays would be.
  2. let the agent figure it out (machine learning approach - it "solves" game 1s
for as many realistic starting conditions (opening hands) as possible).

  I think method 2 will be fun and a good excersize for me - let's figure it out!
  NB: this shall be the main utility module, not the "world" per se

 */
import { Deck, Decklist, DecklistEntry, MVPCard, MVPPlayer } from "../index";
import * as fs from "fs";

export async function prepareDecklist(dek: Decklist): Promise<Deck> {
  for (const entry of dek.maindeck) {
    
  }
}

export async function evaluateEntry(ent: DecklistEntry): Promise<MVPCard> {
  
}

