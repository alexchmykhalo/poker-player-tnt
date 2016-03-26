'use strict';
module.exports = function (game_state) {
var request = require('request');
var player = game_state.players[game_state.in_action];
var myCards = player.hole_cards;
var communityCards = game_state.community_cards;
var cards = myCards.concat(communityCards);
var rainmanResponse;
request.get('http://rainman.leanpoker.org/rank?cards=' + JSON.stringify(cards), function (err, response, body) {
if (err) {
return err;
}
rainmanResponse = JSON.parse(body);
console.log(rainmanResponse);
});
return rainmanResponse;
};