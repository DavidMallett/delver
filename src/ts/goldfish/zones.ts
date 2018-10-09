/**
 * 400.1. A zone is a place where objects can be during a game. There are normally seven zones: library,
hand, battlefield, graveyard, stack, exile, and command. Some older cards also use the ante zone.
Each player has their own library, hand, and graveyard. The other zones are shared by all players.

400.2. Public zones are zones in which all players can see the cards’ faces, except for those cards that
some rule or effect specifically allow to be face down. Graveyard, battlefield, stack, exile, ante, and
command are public zones. Hidden zones are zones in which not all players can be expected to see
the cards’ faces. Library and hand are hidden zones, even if all the cards in one such zone happen to
be revealed

400.3. If an object would go to any library, graveyard, or hand other than its owner’s, it goes to its
owner’s corresponding zone.

400.4. Cards with certain card types can’t enter certain zones.
  400.4a If an instant or sorcery card would enter the battlefield, it remains in its previous zone.
  400.4b If a conspiracy, phenomenon, plane, scheme, or vanguard card would leave the command
zone, it remains in the command zone.

400.5. The order of objects in a library, in a graveyard, or on the stack can’t be changed except when
effects or rules allow it. The same is true for objects arranged in face-down piles in other zones.
Other objects in other zones can be arranged however their owners wish, although who controls
those objects, whether they’re tapped or flipped, and what other objects are attached to them must
remain clear to all players.

400.6. If an object would move from one zone to another, determine what event is moving the object. If
the object is moving to a public zone and its owner will be able to look at it in that zone, its owner
looks at it to see if it has any abilities that would affect the move. If the object is moving to the
battlefield, each other player who will be able to look at it in that zone does so. Then any
appropriate replacement effects, whether they come from that object or from elsewhere, are applied
to that event. If any effects or rules try to do two or more contradictory or mutually exclusive things
to a particular object, that object’s controller—or its owner if it has no controller—chooses which
effect to apply, and what that effect does. (Note that multiple instances of the same thing may be
mutually exclusive; for example, two simultaneous “destroy” effects.) Then the event moves the
object.
    Example: Exquisite Archangel has an ability which reads “If you would lose the game,
    instead exile Exquisite Archangel and your life total becomes equal to your starting life
    total.” A spell deals 5 damage to a player with 5 life and 5 damage to an Exquisite
    Archangel under that player’s control. As state-based actions are performed, that player’s
    life total becomes equal to their starting life total, and that player chooses whether Exquisite
    Archangel moves to its owner’s graveyard or to exile.

400.7. An object that moves from one zone to another becomes a new object with no memory of, or
relation to, its previous existence. There are nine exceptions to this rule:
  400.7a Effects from spells, activated abilities, and triggered abilities that change the characteristics
  of a permanent spell on the stack continue to apply to the permanent that spell becomes.
  400.7b Prevention effects that apply to damage from a permanent spell on the stack continue to
  apply to damage from the permanent that spell becomes.
  400.7c If an ability of a permanent requires information about choices made as that permanent was
  cast as a spell, including what mana was spent to cast that spell, it uses information about the
  spell that became that permanent as it resolved.
  400.7d Abilities that trigger when an object moves from one zone to another (for example, “When
  Rancor is put into a graveyard from the battlefield”) can find the new object that it became in
  the zone it moved to when the ability triggered, if that zone is a public zone.
  400.7e Abilities of Auras that trigger when the enchanted permanent leaves the battlefield can find
  the new object that Aura became in its owner’s graveyard if it was put into that graveyard at the
  same time the enchanted permanent left the battlefield. It can also find the new object that Aura
  became in its owner’s graveyard as a result of being put there as a state-based action for not
  being attached to a permanent. (See rule 704.5m.)
  400.7f If an effect grants a nonland card an ability that allows it to be cast, that ability will continue
  to apply to the new object that card became after it moved to the stack as a result of being cast
  this way.
  400.7g If an effect allows a nonland card to be cast, other parts of that effect can find the new object
  that card becomes after it moves to the stack as a result of being cast this way.
  400.7h If an effect causes an object to move to a public zone, other parts of that effect can find that
  object. If the cost of a spell or ability causes an object to move to a public zone, that spell or
  ability’s effects can find that object.
  400.7i After resolving a madness triggered ability (see rule 702.34), if the exiled card wasn’t cast
  and was moved to a public zone, effects referencing the discarded card can find that object.

400.8. If an object in the exile zone is exiled, it doesn’t change zones, but it becomes a new object that
has just been exiled.

400.9. If a face-up object in the command zone is turned face down, it becomes a new object.

400.10. An object is outside the game if it isn’t in any of the game’s zones. Outside the game is not a
zone.
  400.10a Cards in a player’s sideboard are outside the game. See rule 100.4.
  400.10b Some effects bring cards into a game from outside of it. Those cards remain in the game
  until it ends.
  400.10c Cards outside the game can’t be affected by spells or abilities, except for characteristicdefining
  abilities printed on them (see rule 604.3) and spells and abilities that allow those cards
  to be brought into the game.

400.11. Some effects instruct a player to do something to a zone (such as “Shuffle your hand into your
library”). That action is performed on all cards in that zone. The zone itself is not affected.

 */

export enum ZoneType {
  public = "public",
  hidden = "hidden"
}

const ZONES: string[] = ["library", "hand", "graveyard", "battlefield", "stack", "exile", "command"];

export abstract class Zone {
  public name: string;
  public zt: ZoneType;
  
  public constructor(name: string) {
    if (ZONES.indexOf(name) < 0) {
      throw new Error("That is not a zone");
    } else {
      this.name = name;
    }
  }
}

