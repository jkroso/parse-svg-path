
module.exports = parse

/**
 * expected argument lengths
 * @type {Object}
 */

var length = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0}

/**
 * segment pattern
 * @type {RegExp}
 */

var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

	function parse(path) {
		var data = []
	/**
	* long arc and sweep flags
	* are boolean and can be concatenated like so:
	* 00, 11 or 01
	*/
	path
	.replaceAll(" 00", " 0 0")
	.replaceAll(" 01", " 0 1")
	.replace(segment, function(_, command, args){
		var type = command.toLowerCase()
		args = parseValues(args)

		/**
		* long arc and sweep flags 
		* are boolean and can be concatenated like so:
		* 11 or 01
		*/
	        if (type === 'a' && args.length < length[type]) {
	        	let flagArr = args[3].toString().split("");
	        	args = [args[0], args[1], args[2], +flagArr[0], +flagArr[1], args[4], args[5]];
	        }

		// overloaded moveTo
		if (type == 'm' && args.length > 2) {
			data.push([command].concat(args.splice(0, 2)))
			type = 'l'
			command = command == 'm' ? 'l' : 'L'
		}

		while (true) {
			if (args.length == length[type]) {
				args.unshift(command)
				return data.push(args)
			}
			if (args.length < length[type]) throw new Error('malformed path data')
			data.push([command].concat(args.splice(0, length[type])))
		}
	})
	return data
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig

function parseValues(args) {
	var numbers = args.match(number)
	return numbers ? numbers.map(Number) : []
}
