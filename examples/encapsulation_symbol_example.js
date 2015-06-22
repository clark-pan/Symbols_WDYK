var hasPowerKey = Symbol('hasPower');

class Television {
  constructor() {
    this[hasPowerKey] = false;
  }
  powerButton() {
    if(this[hasPowerKey]){
      console.log("TV switched off");
    } else {
      console.log("TV switched on");
    }
    this[hasPowerKey] = !this[hasPowerKey];
  }
}

