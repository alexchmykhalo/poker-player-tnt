

module.exports = {

  

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {

  try {
    //console.log(rankHand(game_state));
      // var rainman = require('./rainman')(game_state);
      
      var priority = getPriority(game_state);
      var ourBet = getBet(game_state, priority);
      if(game_state.round == 0){
        if(rankHand(game_state) == 0){
          bet(ourBet);
        } else bet(0);
      }else{
        if (haveXKind(game_state,4) || haveXKind(game_state,3) || haveXKind(game_state,2) || have2Pair(game_state) || have5SameSuit(game_state)){
          bet(ourBet);
        } else bet(0);
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
  set['10']=10;
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

function getAllCards(game_state){
  var all_cards = [];
  if(game_state.round == 0){
    all_cards = game_state.players[game_state.in_action].hole_cards;
  } else {
    all_cards = all_cards.concat(game_state.players[game_state.in_action].hole_cards);
    all_cards = all_cards.concat(game_state.community_cards);
  }
  return all_cards;
}

function haveXKind(game_state, order) {
  var all_cards = getAllCards(game_state);

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

function have2Pair(game_state) {
  var all_cards = getAllCards(game_state);
  
  
  var haveCombination = false;
  
  var ranks = [];
  all_cards.forEach(function (e) {
      ranks.push(e.rank);    
  });

  ranks = ranks.sort();
  //console.log(ranks);
  var arrayLength = ranks.length;
  var pairCount = 0;
  for (var i = 0; i < arrayLength; i++) {
    if(i < arrayLength - 1){
      if(ranks[i]==ranks[i+1]){
        pairCount++;
        i++;
      }
    }
  }
  if(pairCount >= 2) haveCombination = true;

  return haveCombination;
}

function have5SameSuit(game_state) {
  var all_cards = getAllCards(game_state);
  
  
  var haveCombination = false;
  
  var suits = [];
  all_cards.forEach(function (e) {
      suits.push(e.suit);    
  });

  suits = suits.sort();
  //console.log(ranks);
  var arrayLength = suits.length;
  var pairCount = 0;
  for (var i = 0; i < arrayLength; i++) {
    if(i < arrayLength - 4){
      if(suits[i]==suits[i+1] && suits[i]==suits[i+2] && suits[i]==suits[i+3] && suits[i]==suits[i+4]){
        pairCount++;
        i++;
      }
    }
  }
  if(pairCount >= 1) haveCombination = true;

  return haveCombination;
}


function getPriority(game_state){
  var priority = 0;
  if(haveXKind(game_state,2)) priority = 1;
  if(have2Pair(game_state)) priority = 2;
  if(haveXKind(game_state,3)) priority = 3;
  //4
  if(have5SameSuit(game_state)) priority = 5;
  if(have2Pair(game_state) && haveXKind(game_state,3)) priority = 6;
  if(haveXKind(game_state,4)) priority = 7;
  //8
  return priority;
}
function getBet(game_state, priority){
  if (Math.round(Math.random())) {
    return game_state.players[game_state.in_action].bet + game_state.minimum_raise;
  } else {
    return game_state.players[game_state.in_action].bet;
  }

  //return Math.min(Math.max(game_state.minimum_raise * 2, 350),game_state.players[game_state.in_action].stack);     
}