var Alexa = require('alexa-sdk');
var version = '0.0.8';

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
}

var handlers = {
	'LaunchRequest': function() {
		this.emit(':ask', script['launch']);
	},
	'AboutAppIntent': function() {
		this.emit(':tell', script['about'] );
	},
	'WhatIsThisColorIntent': function() {
		var translate;
		var say = script['novalue'];
		var color = this.event.request.intent.slots.color.value;
		if (color) {
			translate = colors[color];
			if (translate) {
				say = 'Hello! The color ' + color + ' has a hex value of ' + translate + '.';
			} else {
				say = 'Sorry, I do not know the hex value of the color ' + color + '.';
			}
		}
		this.emit(':tell', say);
	},
	'AMAZON.HelpIntent': function() {
		this.emit(':ask', script['help']);
	},
	'AMAZON.StopIntent': function() {
		this.emit(':tell', script['stop']);
	},
	'AMAZON.CancelIntent': function() {
		this.emit(':tell', script['stop']);
	},
	'SessionEndedRequest': function() {
		this.emit(':tell', script['stop']);
	}
}

var script = {
	'launch': 'Hello, Welcome to Hex Colors. I can give you the hex color value of one of the colors of the rainbow. For example, try asking me, "What is the hex value of red?" Go ahead, give it a try',
	'novalue': 'Sorry, I did not understand your color request.',
	'about': 'Hello, Welcome to Hex Colors, version '+ version +'.',
	'help': 'Hi there. I know the hex values for the colors of the rainbow. Those colors are red, orange, yellow, green, blue, indigo, and violet. I remember this as roy g biv. You can ask me for the hex colors of any of these. I hope to add more in the future. You can ask me, "What is the hex value of green?" Go ahead, give it a try.',
	'stop': 'Thank you for using Hex Colors. I hope you enjoyed my service. Have a great day!'
}

var colors = {
	'red': 'F F 0 0 0 0',
	'orange': 'F F 7 F 0 0',
	'yellow': 'F F F F 0 0',
	'green': '0 0 F F 0 0',
	'blue': '0 0 0 0 F F',
	'indigo': '4 B 0 0 8 2',
	'violet': '9 4 0 0 D 3'
}