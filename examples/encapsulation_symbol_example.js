var hasPowerKey = Symbol('hasPower');

export class Television {
	constructor() {
		this[hasPowerKey] = false;
	}
	turnOn() {
		this[hasPowerKey] = true;
	}
	switchChannel() {
		if(this[hasPowerKey]){
			console.log('Channel switched');
		} else {
			console.log('Nothing happened');
		}
	}
}