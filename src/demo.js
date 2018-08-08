var JsonDb = require('node-json-db');
var mtg = require('mtgsdk');
var fs = require('fs');
var _ = require('lodash');

var DB_NAME= "cardDatabase";

var db = new JsonDb(DB_NAME, true);

/**e
 * The goal of the demo is to implement the following:
 * 1. Wrapper around the mtgsdk package that overrides card.find,
 *  first checking if the card is saved in our local DB.
 *      > If not, then get the card data from mtg.io and save it in the db
 *      > If so, then check the lastUpdated date for that card in the db; either
 *          pull data from the db if our info is old or pull from the db if it's not
 * 2. Wrapper around the node-json-db package that allows us to logically sort cards
 *  by set, type, etc, because we cannot maintain an index of 20000+ cards in a single
 *  JSON file
 */

mtg.card.find(3)
    .then((result) => {

        // vv this code validates that we are getting results we expect
        // console.log(result.card.toString());
        // _.each(result.card, (value, key) => {
            // console.log(key + ": " + value.toString());
        // })

        var set = result.card.set;
        
        db.push("/" + set, result.card)

    });
    
/**
 * 
 * @param {string} name 
 */
var checkDb = function(name) {

}

