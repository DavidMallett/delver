# "Delver"

This is the latest project in which I try out various node-based frameworks and tools. Most recently, I successfully figured out how to chain pipes together in gulp using the "pump" module. To demo this, (after installing dependencies - run `npm install` first), run `gulp`, then `gulp compress`, and look at the diff between _dist and _compressed

Essentially, I am interested in creating an application that has a computer AI play Magic: the Gathering against me, or more specifically against itself. The idea is that eventually, using machine-learning techniques, automated testing and deployment, and an engine to strictly enforce the rules of magic (which I am building from scratch, as you can see), I can, for example, find the optimal deck for a given metagame by setting up a seeded tournament with the same players/decks and running the simulation a few thousand times.

I don't have enough time to commit to practicing Magic at the level necessary to regularly top8 Grand Prix and SCG Opens - most of which is spent trying to find the optimal deck (or optimal build of a deck) for a given metagame. This application, when complete, will take care of that for me, and hopefully I'll be able to start playing competitive Magic again __and__ not scrub out of every tournament I play in :D


## Goldfish

How hard can it be to make an app that takes different Burn decks (60-card maindeck only in MVP) and calculates their average turn win / determine which one has percentage points over the others? Let's find out!

To do: figure out priority order of which spells to cast in Burn and when. My opponent played a creature!!! Do I lightning bolt the creature or my opponent?
