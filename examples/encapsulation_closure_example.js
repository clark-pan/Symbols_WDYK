function Television(){
  var hasPower = false;

  this.powerButton = function(){
    if(hasPower){
      console.log("TV switched off");
    } else {
      console.log("TV switched on");
    }
    hasPower = !hasPower;
  }
}