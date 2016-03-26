

module.exports = {

  

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {

  try {
    //console.log(rankHand(game_state));
      // var rainman = require('./rainman')(game_state);

      if(game_state.round == 0){
        if(rankHand(game_state) == 0)
        {
          bet(Math.min(Math.max(game_state.minimum_raise * 2, 350),game_state.players[game_state.in_action].stack));
        } 
        else bet(0);
      }else{
        if(haveXKind(game_state,4) || haveXKind(game_state,3) || haveXKind(game_state,2)){
          bet(Math.min(Math.max(game_state.minimum_raise * 2, 350),game_state.players[game_state.in_action].stack));
        }else bet(0);
      }
      // else {

      //   if (rainman.rank > 0 )
      //   {
      //     //if (rainman.rank == 1 && rainman.value > 7)
      //       bet(Math.min(Math.max(game_state.minimum_raise * 2, 350),game_state.players[game_state.in_action].stack));
      //   } else {
      //       bet(0);
      //   }
      // }
  }
  catch(err) {
    bet(0);
  }
      //console.log(game_state);
  },

  showdown: function(game_state) {

  },

  getPlayer: function(game_state){
    return game_state.players[game_state.in_action];
  },

  getMyCards: function(game_state){
    return this.getPlayer.hole_cards;
  },

  getCommunityCards: function(game_state){
    return game_state.community_cards;
  },

  getAllCards : function(game_state){
    var myCards = this.getMyCards(game_state);
    var otherCards = this.getCommunityCards(game_state);
    return myCards.concat(otherCards);
  },

};

function compare (a, b) {

  var set = [];
  set['T']=10;
  set['J']=11;
  set['Q']=12;
  set['K']=13;
  set['A']=14;

    if (isInt(a) && isInt(b))
      return a - b;

    if (isInt(a) && !isInt(b))
      return -1;

    if (isInt(b) && !isInt(a))
      return 1;

    return set[a] - set[b];

  return 0;
}

function isInt(n) {
  return n % 1 === 0;
}

function rankHand(game_state) {
    var myCards = game_state.players[game_state.in_action].hole_cards;

    var sameSuit = myCards[0].suit == myCards[1].suit;

    var a = myCards[0];
    var b = myCards[1];
  
    if (sameSuit) {
      if (compare(a.rank, '9')>0 && compare(b.rank, '9')>0) {
        console.log('same high');
        return 0;
      }
      
      
    } else {
      if (compare(a.rank, '10')>0 && compare(b.rank, '10')>0) {
        console.log('diff high');
        return 0;
      }
      if (compare(a.rank, '7')>0 && compare(b.rank, '7')>0 && a.rank == b.rank){
        console.log('diff pair');
        return 0;
      }
    }
    return 1;
  }


function haveXKind(game_state, order) {
  var all_cards;
  if(game_state.round == 0) all_cards = game_state.players[game_state.in_action];
  else {
    all_cards = game_state.players[game_state.in_action].concat(game_state.community_cards);
  }
  var haveCombination = false;

  for (var i = 0; i < all_cards.length; i++) {
      var nextRank = all_cards[i].rank;
      var nextMaxOrder = 1;
      for (var j = 0; j < all_cards.length; j++) {
          if (i !== j) {
              if (all_cards[j].rank === nextRank) {
                  nextMaxOrder = nextMaxOrder + 1;
              }
          }
      }
      if (nextMaxOrder === order) {
          haveCombination = true;
          break;
      }
  }

  return haveCombination;
}