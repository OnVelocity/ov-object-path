
module.exports = {
	'get': function (obj, path) {
		// supports a.b, a[1] and foo[bar], etc.
		// for example: where obj is ['nope', 'yes', {a: {b: 1}, foo: 2}]
		// then [1] returns 'yes'; [2].a.b returns 1; [2].a[foo] returns 2;
		path = path.split(/[\.\[\]]/).filter(d => d);
		return path.reduce((r, p) => {
			if (r) {
				return r[p];
			}
		}, obj);
	},
	'set': function (obj, path, value) {
		// assign property creates Objects and Arrays as needed
		// removes property if typeof(value) is undefined
		path = path.split(/[\.\[\]]/).filter(d => d);
		const isRemove = typeof value === 'undefined';
		// enable look-ahead to determine if type is array or object
		const pathCopy = path.slice();
		// last item in path used to assign value on the resolved object
		const name = path.pop();
		const resolvedObj = path.reduce((r, p, i) => {
			// look-ahead to see if next path item is a number
			const index = parseInt(pathCopy[i + 1], 10);
			const isArray = !isNaN(index);
			if (typeof(r[p]) !== 'object') {
				r[p] = isArray ? [] : {}
			}
			if (isRemove && ((i + 1) === path.length)) {
				if (isArray) {
					r[p] = r[p].filter((d, i) => i !== index);
				} else {
					delete r[p][name];
				}
			}
			return r[p];
		}, obj);
		if (!isRemove) {
			resolvedObj[name] = value;
		}
	}
};
