const isSubset = function(list1,list2){
  let result =list2.every(function(element){
    return list1.includes(element);
  });
return result;
};

const Game = function(){
  this.count =0;
  this.won = false;
  this.player = 1;
  this.symbols={ 1 : "O", 2 : "X" };
  this.allMoves = [];
  this.playersMoves = { 1 : [ ] , 2 : [ ] };
  this.winningConditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];
};

Game.prototype = {
  winningCondition : function(playerno){
    list=this.playersMoves[playerno];
    isSubset1=isSubset.bind(null,list);
    return this.winningConditions.some(isSubset1);
  },
  changePlayer : function(){
    let players = { "0" :1, "1" :2};
    let remainder = this.count%2;
    this.player = players[remainder];
  },
  disableAllMoves:function(){
    for (let i = 1; i < 10; i++) {
      document.getElementById(i).disabled = true;
    }
  },
  decideSymbol : function(){
    let symbol = this.symbols[this.player];
    this.count++;
    this.changePlayer();
    let nextSymbol = this.symbols[this.player];
    document.getElementById("status").innerText = `${nextSymbol} is `+
                                              `planning its move...`;
    return symbol;
  },

drawSymbol : function(id){
  this.playersMoves[this.player].push(id);
  document.getElementById(id).innerText=this.decideSymbol();
  document.getElementById(id).disabled=true;
  this.alertIfWon(1);
  this.alertIfWon(2);
  if(this.count==9 && !this.won){
    document.getElementById("status").innerText = `Hard Luck!! Match Draw`;
  }
},

 alertIfWon : function(playerno){
  if(this.winningCondition(playerno)){
    document.getElementById("status").innerText = `Player ${playerno} Won`;
    this.disableAllMoves();
    this.won=true;
  }
}
};

const game = new Game();
