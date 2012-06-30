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
    scanBombs:function(x, y, rec){
      if(x==-1||x==this.map[0].length||y==-1||y==this.map.length){
        return false;
      }
      var val= this.map[y][x];
      if(val=="2"||val=="1"){
        return true;
      }
      if(rec){
        return this.scanBombs(x-1,y, false)||this.scanBombs(x,y-1,false)||this.scanBombs(x+1,y,false)||this.scanBombs(x,y+1,false);  
      }
      return false;
    },
    scanFree:function(x, y){
      return this.map[y][x]=='_'||this.map[y][x]=='V'||this.map[y][x]=='P';
    },
    move:function(){
      //scan freeCell
      var freeCell=[];
      freeCell.norte=this.scanFree(this.x, this.y-1);
      freeCell.este=this.scanFree(this.x+1, this.y);
      freeCell.sur=this.scanFree(this.x, this.y+1);
      freeCell.oeste=this.scanFree(this.x-1, this.y);

      //escanear bombas cercanas
      var dangerous=[];
      dangerous.norte=this.scanBombs(this.x, this.y-1, true);
      dangerous.este=this.scanBombs(this.x+1, this.y, true);
      dangerous.sur=this.scanBombs(this.x, this.y+1, true);
      dangerous.oeste=this.scanBombs(this.x-1, this.y, true);
      if(!dangerous.norte&&dangerous.este&&dangerous.sur&&dangerous.oeste){
        return 'N';
      }else if(dangerous.norte&&!dangerous.este&&dangerous.sur&&dangerous.oeste){
        return 'E';
      }else if(dangerous.norte&&dangerous.este&&!dangerous.sur&&dangerous.oeste){
        return 'S';
      }else if(dangerous.norte&&dangerous.este&&dangerous.sur&&!dangerous.oeste){
        return 'O';
      }
      //escapando de la bomba
      if(dangerous.norte||dangerous.este||dangerous.sur||dangerous.oeste){
        dangerous.mov=true;
        while(dangerous.mov){
          var mov=Math.floor(Math.random()*4)+1;
          switch(mov){
            case 1://norte
              if(!dangerous.norte){
                if(freeCell.norte){
                  return 'N';
                }else{
                  dangerous.norte=true;
                }
              }
            break;
            case 2://oeste
              if(!dangerous.oeste){
                if(freeCell.oeste){
                  return 'O';
                }else{
                  dangerous.oeste=true;
                }
              }
            break;
            case 3://sur
              if(!dangerous.sur){
                if(freeCell.sur){
                  return 'S';
                }else{
                  dangerous.sur=true;
                }
              }
            break;
            case 4://este
              if(!dangerous.este){
                if(freeCell.este){
                  return 'E';
                }else{
                  dangerous.este=true;
                }
              }
            break;
          }
          if(dangerous.norte&&dangerous.este&&dangerous.sur&&dangerous.oeste){
            console.log("no jodas!");
            return 'P';
          }
        }
      }
      //moverse
      var mov=Math.floor(Math.random()*4)+1;
      var nextCel="";
      switch(mov){
        case 1://norte
          
          if(this.y>1){
            nextCel = this.map[this.y-2][this.x];
            if(nextCel=="L"||nextCel=="A"||nextCel=="B"||nextCel=="C"||nextCel=="D"){
              return "BN";
            }
          }
          if(freeCell.norte){
            return "N";
          }  
        break;
        case 2://oeste
          if(this.x>1){
            nextCel= this.map[this.y][this.x-2];
            if(nextCel=="L"||nextCel=="A"||nextCel=="B"||nextCel=="C"||nextCel=="D"){
              return "BO";
            }
          }
          if(freeCell.oeste){
            return "O";
          }
        break;
        case 3://sur
          if(this.y<this.map.length-2){
            nextCel=this.map[this.y+2][this.x];
            if(nextCel=="L"||nextCel=="A"||nextCel=="B"||nextCel=="C"||nextCel=="D"){
              return "BS";
            }
          }
          if(freeCell.sur){
            return "S";
          }
        break;
        case 4://este
          if(this.x<this.map.length-2){
            nextCel=this.map[this.y][this.x+2];
            if(nextCel=="L"||nextCel=="A"||nextCel=="B"||nextCel=="C"||nextCel=="D"){
              return "BE";
            }
          }
          if(freeCell.este){
            return "E";
          }
        break;
      }
      if(freeCell.norte){
        return "N";
      }else if(freeCell.oeste){
        return "O";
      }else if(freeCell.sur){
        return "S";
      }else if(freeCell.este){
        return "E";
      }
      return "P";
    }
  };
  return player;
}
