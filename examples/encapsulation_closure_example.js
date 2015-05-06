function Television(){
	var hasPower = false;

	this.turnOn = function(){
		hasPower = true;
	}

	this.switchChannel = function(){
		if(hasPower){
			console.log('Channel switched');
		} else {
			console.log('Nothing happened');
		}
	}
}

var tv = new Television();
tv.switchChannel(); // Nothing happened

tv.turnOn();
tv.switchChannel(); // Channel switched