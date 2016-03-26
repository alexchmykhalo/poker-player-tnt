
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
  	var pairCount = this.pairCount(game_state);
  	var card3Count = this.has3Count(game_state);
  	var card4Count = this.has4Count(game_state);
  	var cardNumber = this.getAllCards(game_state).length;
  	var player = this.getPlayer(game_state);
  	if(cardNumber == 2 && pairCount == 1){
  		//all in
  		bet(player.stack);
  	}else if(cardNumber >= 5 && pairCount == 2){
  		//all in
  		bet(player.stack);
  	}else if(card3Count >= 1){
  		//all in
  		bet(player.stack);
  	}else if(card4Count >= 1){
  		//all in
  		bet(player.stack);
  	}else{
  		var currentBet = Math.max(game_state.minimum_raise, 350);
  		if(currentBet > player.stack) currentBet = player.stack;
	    bet(currentBet);
	    // console.log(game_state);
    }
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

	pairCount : function(game_state){
		var allCards = this.getAllCards(game_state);

		var ranks = [];
		allCards.forEach(function (e) {
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

		return pairCount;
	},

	has3Cards : function(game_state){
		var allCards = this.getAllCards(game_state);

		var ranks = [];
		allCards.forEach(function (e) {
			ranks.push(e.rank);	
		});

		ranks = ranks.sort();
		//console.log(ranks);
		var arrayLength = ranks.length;
		var card3Count = 0;
		for (var i = 0; i < arrayLength; i++) {
			if(i < arrayLength - 1){
				if(ranks[i]==ranks[i+1] && ranks[i]==ranks[i+2]){
					card3Count++;
					i += 2;
				}
			}
		}

		return card3Count;
	},

	has4Cards : function(game_state){
		var allCards = this.getAllCards(game_state);

		var ranks = [];
		allCards.forEach(function (e) {
			ranks.push(e.rank);	
		});

		ranks = ranks.sort();
		//console.log(ranks);
		var arrayLength = ranks.length;
		var card4Count = 0;
		for (var i = 0; i < arrayLength; i++) {
			if(i < arrayLength - 1){
				if(ranks[i]==ranks[i+1] && ranks[i]==ranks[i+2] && ranks[i]==ranks[i+3]){
					card4Count++;
					i += 3;
				}
			}
		}

		return card4Count;
	}

};
