exports.newPlayer = function(){
  var player = {
    x:-1,
    y:-1,
    letter:"Z",
    map:[], 
    updateMap:function(data){
      this.map=[];
      var rows = data.split("\n");
      for(var i=0; i<rows.length; i++){
        this.map.push(rows[i].split(","));
      }
      var pos = data.indexOf(this.letter)/2;
      this.y = Math.floor(pos/rows.length);
      this.x = pos%rows.length;
    },
    move:function(){
      var mov=Math.floor(Math.random()*4)+1
      switch(mov){
        case 1://norte
          if(this.y>1 && this.map[this.y-2][this.x]=="L"){
            return "BN";
          }else if(this.map[this.y-1][this.x]=="_"){
            return Math.floor(Math.random()*2)==1?"N":"BN";
          }
        break;
        case 2://oeste
          if(this.x>1 && this.map[this.y][this.x-2]=="L"){
            return "BO";
          }else if(this.map[this.y][this.x-1]=="_"){
            return Math.floor(Math.random()*2)==1?"O":"BO";
          }
        break;
        case 3://sur
          if(this.y<this.map.length-2 && this.map[this.y+2][this.x]=="L"){
            return "BS";
          }else if(this.map[this.y+1][this.x]=="_"){
            return Math.floor(Math.random()*2)==1?"S":"BS";
          }
        break;
        case 4://este
          if(this.x<this.map.length-2 && this.map[this.y][this.x+2]=="L"){
            return "BE";
          }else if(this.map[this.y][this.x-1]=="_"){
            return Math.floor(Math.random()*2)==1?"E":"BE";
          }
        break;
      }
      return "P";
    }
  };
  return player;
}