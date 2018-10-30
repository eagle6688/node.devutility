var events = require('events');
var eventEmitter = new events.EventEmitter();

var listener1 = function listener1() {
   console.log('listener1 executing...');
};

var listener2 = function listener2() {
  console.log('listener2 executing...');
};

//Bind newListener event
eventEmitter.on('newListener', function(eventName, func){
	console.log('Listener ' + eventName + ' is binding.');
});

//Bind removeListener event
eventEmitter.on('removeListener', function(eventName, func){
	console.log('Removing listenter ' + eventName + '\'s function ' + func.name);
});

//Bind error event
eventEmitter.on('error', function(){
	console.log('error');
});

//Bind connection, event function is listener1.
eventEmitter.addListener('connection', listener1);

//Bind connection, event function is listener2.
eventEmitter.on('connection', listener2);

var listenersCount = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(listenersCount + ' listeners are listenering connection event.');

//Call connection event. 
eventEmitter.emit('connection');

//Remove listener1 function
eventEmitter.removeListener('connection', listener1);

//Call connection event.
eventEmitter.emit('connection');

listenersCount = events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(listenersCount + ' listeners are listenering connection event.');

eventEmitter.emit('error');

console.log('Finished...');